from time import sleep
from .keymap import KEYMAP, GLOBAL_KEYMAP
from .options import options
from .common import keyboard, DEBUG


class Gamepad:
    def __init__(self, player: int):
        """
        Inicializa o Gamepad virtual ou o teclado

        :param player: ID do player (0 a 3)
        """

        self.connected = True  # Gamepad virtual está conectado
        self.useKeyboard = False  # Utiliza o teclado ao invés do Gamepad virtual
        self.vgamepad = None  # Instância do Gamepad virtual
        self.vgamepadError = False  # Indica erro ao inicializar o Gamepad virtual
        self.webSockets = []  # Lista de WebSockets conectados a este Gamepad
        self.player = player
        self.useKeyboard = False

        # Verifica se o Gamepad virtual está desativado
        if options.getOption("disableVgamepad"):
            self.useKeyboard = True
            return

        # Tenta inicializar o Gamepad virtual, caso não consiga, utiliza o teclado
        try:
            from vgamepad import VX360Gamepad

            self.vgamepad = VX360Gamepad()
            self.disconnect()
            if hasattr(self.vgamepad, "register_notification"):
                self.vgamepad.register_notification(callback_function=self.gamepadNotification)
        except Exception as err:
            self.vgamepadError = True
            self.useKeyboard = True
            if DEBUG:
                print("Erro ao inicializar o Gamepad virtual:", err)

    def disconnect(self):
        """
        Desconecta o Gamepad virtual
        """
        if self.vgamepad != None:
            # self.vgamepad.__del__()
            self.connected = False

    def connect(self):
        """
        Conecta o Gamepad virtual
        """
        if self.vgamepad != None:
            # self.vgamepad.__init__()
            self.connected = True

    def addWebSocket(self, ws):
        """
        Adiciona um WebSocket ao Gamepad virtual e conecta

        :param ws: WebSocket a ser adicionado
        """
        self.webSockets.append(ws)
        ws.gamepad = self
        if not self.connected:
            self.connect()

    def removeWebSocket(self, ws):
        """
        Remove um WebSocket do Gamepad virtual e desconecta

        :param ws: WebSocket a ser removido
        """
        self.webSockets.remove(ws)
        ws.gamepad = None
        if len(self.webSockets) == 0:
            self.disconnect()

    def handleKey(self, keyName: str, action: str, x: float = 0, y: float = 0):
        """
        Executa uma ação no Gamepad virtual ou no teclado

        :param keyName: ID da tecla no mapeamento
        :param action: Ação a ser executada (press ou release)
        :param x: Valor do eixo X do joystick (-1 a 1) (somente se keyName for JOYSTICK_1 ou JOYSTICK_2)
        :param y: Valor do eixo Y do joystick (-1 a 1) (somente se keyName for JOYSTICK_1 ou JOYSTICK_2)
        """

        # Utiliza teclado independente do player e do Gamepad virtual estar ativo
        if keyName in GLOBAL_KEYMAP:
            self.keyboard_action(GLOBAL_KEYMAP.get(keyName), action)
            return

        # Utiliza o teclado no mapeamento do player
        if self.useKeyboard:
            keymap = KEYMAP.get(keyName)
            if keymap != None:
                self.keyboard_action(keymap[self.player], action)
            return

        # Utiliza os triggers do Gamepad virtual (L2 e R2)
        if keyName in ["L2", "R2"]:
            self.trigger_action(keyName, action)
            return

        # Utiliza os joysticks do Gamepad virtual
        if keyName in ["JOYSTICK_1", "JOYSTICK_2"]:
            self.joystick_action(keyName, x, y)
            return

        # Utiliza os botões do Gamepad virtual
        self.gamepad_action(keyName, action)

    def keyboard_action(self, button, action: str):
        """
        Pressiona ou solta uma tecla do teclado

        :param button: Tecla a ser pressionada ou solta
        :param action: Ação a ser executada (press ou release)
        """
        if action == "press":
            keyboard.press(button)
        if action == "release":
            keyboard.release(button)

    def trigger_action(self, keyName: str, action: str):
        """
        Ativa ou desativa os triggers L2 e R2 do Gamepad virtual

        :param keyName: ID do trigger (L2 ou R2)
        :param action: Ação a ser executada (press ou release)
        """

        value = 255 if action == "press" else 0
        if keyName == "L2":
            self.vgamepad.left_trigger(value=value)
        if keyName == "R2":
            self.vgamepad.right_trigger(value=value)
        self.vgamepad.update()

    def joystick_action(self, keyName: str, x: float, y: float):
        """
        Move os joysticks do Gamepad virtual

        :param keyName: ID do joystick (JOYSTICK_1 ou JOYSTICK_2)
        :param x: Valor do eixo X (-1 a 1)
        :param y: Valor do eixo Y (-1 a 1)
        """

        if keyName == "JOYSTICK_1":
            self.vgamepad.left_joystick_float(x_value_float=x, y_value_float=y)
        if keyName == "JOYSTICK_2":
            self.vgamepad.right_joystick_float(x_value_float=x, y_value_float=y)
        self.vgamepad.update()

    def gamepad_action(self, keyName: str, action: str):
        """
        Pressiona ou solta um botão do Gamepad virtual

        :param keyName: ID do botão no mapeamento
        :param action: Ação a ser executada (press ou release)
        """
        button = KEYMAP.get(keyName)
        if button != None:
            if action == "press":
                self.vgamepad.press_button(button=button[4])
            if action == "release":
                self.vgamepad.release_button(button=button[4])
            self.vgamepad.update()

    def tap(self, keyName: str):
        """
        Pressiona e solta uma tecla rapidamente

        :param keyName: ID da tecla no mapeamento
        """

        self.action(keyName, "press")
        sleep(0.05)
        self.action(keyName, "release")

    def gamepadNotification(self, client, target, large_motor, small_motor, led_number, user_data):
        """
        Notificação para vibração do controle

        :param client: vigem bus ID
        :param target: vigem device ID
        :param large_motor: integer in [0, 255] representing the state of the large motor
        :param small_motor: integer in [0, 255] representing the state of the small motor
        :param led_number: integer in [0, 255] representing the state of the LED ring
        :param user_data: placeholder, do not use
        """

        for socket in self.webSockets:
            socket.sendCommand(
                "vibrate",
                {"largeMotor": large_motor, "smallMotor": small_motor},
            )
