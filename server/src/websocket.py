from .common import DEBUG, WS_PORT
import threading
import json
from colorama import Fore as F, Style as S
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
from .options import options
from .common import gamepads


# Verifica se é necessário senha para conectar
needPassword = options.getOption("password") != None


class WebSocketServer(SimpleWebSocketServer):
    clients = []  # Lista de clientes conectados

    def __init__(self):
        super().__init__("0.0.0.0", WS_PORT, WebSocketServer.Client)

    def start(self):
        """
        Inicia o servidor WebSocket
        """
        self.serveforever()

    class Client(WebSocket):
        authenticated = False  # Usuário foi autenticado e tem permissão para enviar comandos
        gamepad = None  # Gamepad associado ao cliente

        def handleMessage(self):
            """
            Trata as mensagens recebidas
            """
            try:
                # Decodifica a mensagem no formato de array em JSON
                command, data = json.loads(self.data)

                if command == "handshake":
                    self.handleHandshake(data)
                if command == "ping":
                    self.sendCommand("pong", {"id": data.get("id")})
                if command == "key":
                    self.gamepad.handleKey(data.get("key"), data.get("action"), data.get("x"), data.get("y"))
            except Exception as err:
                if DEBUG:
                    print(f"{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro desconhecido")
                if DEBUG:
                    print(F.RED + str(err) + S.RESET_ALL)

        def handleHandshake(self, data: dict):
            """
            Handshake

            :param data: Dados do handshake
            """

            # Verifica se a senha está correta
            if needPassword:
                if not options.checkPassword(data.get("password")):
                    self.sendCommand("handshakeFailed", {"passwordIncorrect": True})
                    return

            # Define que o cliente está autenticado e pode enviar comandos
            self.authenticated = True

            # Adiciona o WebSocket ao gamepad
            gamepad = gamepads[data.get("player")]
            gamepad.addWebSocket(self)

            # Definição do cliente para usar o teclado ao invés do gamepad
            if data.get("useKeyboard"):
                gamepad.useKeyboard = True

            # Envia o handshake de OK para o cliente com as informações necessárias
            self.sendCommand(
                "handshakeOK",
                {
                    "useKeyboard": gamepad.useKeyboard,
                    "vGamepadDisabled": options.getOption("disableVgamepad"),
                    "vGamepadError": gamepad.vgamepadError,
                    "otherPlayerConnected": len(gamepad.webSockets) > 1,
                },
            )

        def handleConnected(self):
            """
            Cliente conectado
            """
            WebSocketServer.clients.append(self)
            self.sendCommand("welcome", {"needPassword": needPassword})
            if DEBUG:
                print(f"{F.YELLOW}[WEBSOCKET]{S.RESET_ALL} Usuário conectado {self.address}")

        def handleClose(self):
            """
            Cliente desconectado
            """
            self.gamepad.removeWebSocket(self)
            WebSocketServer.clients.remove(self)
            if DEBUG:
                print(f"{F.YELLOW}[WEBSOCKET]{S.RESET_ALL} Usuário desconectado {self.address}")

        def sendCommand(self, name: str, data):
            """
            Formata e envia um comando para o cliente

            :param name: Nome do comando
            :param data: Dict com o conteúdo do comando
            """
            message = [name, data]
            jsonEncodedMessage = json.dumps(message)
            self.sendMessage(jsonEncodedMessage)


# Inicia o servidor WebSocket
def startWebSocketServer():
    wsServer = WebSocketServer()
    wsThread = threading.Thread(target=wsServer.start)
    wsThread.daemon = True
    wsThread.start()
