#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __main__ import DEBUG, HTTP_PORT, WS_PORT

from colorama import init as coloramaInit, Back as B, Fore as F, Style as S
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
from pynput.keyboard import Key, KeyCode, Controller
from util.options import options
from time import sleep
import os
import pyqrcode
import threading

# Importa o vgamepad se tiver sido instalado
vgamepadInstalled = True
vgamepadError = False
class VgamepadDisabled(Exception): pass
try:
	if options.getOption('disableVgamepad'):
		raise VgamepadDisabled('Vgamepad desativado manualmente')

	from vgamepad import VX360Gamepad, XUSB_BUTTON
	gamepads = [
		VX360Gamepad(),
		VX360Gamepad(),
		VX360Gamepad(),
		VX360Gamepad()
	]
except ModuleNotFoundError:
	gamepads = None
	vgamepadInstalled = False
except VgamepadDisabled:
	gamepads = None
except Exception as err:
	gamepads = None
	vgamepadError = True
	if DEBUG: print(F.RED + str(err) + S.RESET_ALL)

coloramaInit(autoreset=True)
keyboard = Controller()


# Define o diretório atual
os.chdir(os.path.join(os.path.dirname(__file__), '../public'))


# Retorna a tecla do teclado pelo nome
def getKey(keyName):
	if len(keyName) > 1:
		if keyName.isdigit(): return KeyCode(int(keyName))
		else: return Key[keyName]
	return keyName

# Aperta/desaperta as teclas ou botões
def keyCommand(wsClient, cmd, key, player, vpad = False):
	commands = {
		'r': 'RELEASE KEY',
		'p': 'PRESS KEY',
		't': 'TAP KEY',
		'vjl': 'LEFT JOYSTICK',
		'vjr': 'RIGHT JOYSTICK'
	}
	if DEBUG: print(f'{F.CYAN}[PLAYER {player + 1} {commands[cmd]}] {S.RESET_ALL}{key} ')
	try:
		# Comandos vgamepad
		if vpad:
			# Se o vgamepad não estiver instalado ou ativado
			if not gamepads:
				if options.getOption('disableVgamepad'):
					wsClient.sendMessage('INFO O controle virtual está desativado no computador, ative-o nas opções do MobyStk')
				else:
					wsClient.sendMessage('INFO O controle virtual não está instalado no computador, instale-o nas opções do MobyStk')
				return

			# Pressiona um botão do gamepad
			def button(action, key):
				t = 255 if action == 'press' else 0
				if key == 'xusb_gamepad_left_trigger': gamepads[player].left_trigger(value=t)
				elif key == 'xusb_gamepad_right_trigger': gamepads[player].right_trigger(value=t)
				else: getattr(gamepads[player], f'{action}_button')(button=XUSB_BUTTON[key.upper()])

			# Direciona um joystick do gamepad
			def joystick(side, key):
				x,y = list(map(int, key.split('|')))
				getattr(gamepads[player], f'{side}_joystick')(x_value=x, y_value=y)

			if cmd == 'vjl': joystick('left', key)
			elif cmd == 'vjr': joystick('right', key)
			elif cmd == 'r': button('release', key)
			elif cmd == 'p': button('press', key)
			elif cmd == 't':
				button('press', key)
				gamepads[player].update()
				sleep(0.05)
				button('release', key)
			gamepads[player].update()

		# Comandos de teclado
		elif cmd == 'r': keyboard.release(key)
		elif cmd == 'p': keyboard.press(key)
		elif cmd == 't':
			keyboard.press(key)
			sleep(0.05)
			keyboard.release(key)

	except Exception as err:
		if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro: dados inválidos')
		if DEBUG: print(F.RED + str(err) + S.RESET_ALL)


# Verifica se o usuário está autorizado com senha
def auth(client, cmd, msg):
	if not options.getOption('password'):
		return True

	if getattr(client, 'authorized', False):
		return True

	if cmd == 'password':
		password = ' '.join(msg[1:])
		if options.checkPassword(password):
			client.authorized = True
			if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Senha correta')
			return True
		else:
			client.authorized = False
			if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Senha incorreta')
			return False


# Lida com as mensagens do WebSocket
def message(msg, client):
	msg = msg.lower().split(' ')
	cmd = msg[0]

	if not auth(client, cmd, msg):
		client.sendMessage('AUTH_FAILED')
		return
	if cmd == 'password': return

	if cmd == 'ping':
		pingID = msg[1]
		client.sendMessage(f'pong {pingID}')
		return

	keys = msg[1].split(',')
	player = int(msg[2]) if len(msg) >= 3 else 0
	for key in keys:
		if cmd.startswith('v') or key.startswith('xusb_gamepad'):
			keyCommand(client, cmd, key, player, True)
		else:
			keyCommand(client, cmd, getKey(key), player)


# HTTP Server
class NoCacheRequestHandler(SimpleHTTPRequestHandler):
	def end_headers(self):
		self.myHeaders()
		SimpleHTTPRequestHandler.end_headers(self)

	def myHeaders(self):
		self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
		self.send_header('Pragma', 'no-cache')
		self.send_header('Expires', '0')

	def log_message(self, format, *args):
		return

class CustomThreadingHTTPServer(ThreadingHTTPServer):
	def handle_error(self, request, client_address):
		return

# Inicia o servidor HTTP
def httpServer():
	httpd = CustomThreadingHTTPServer(('', HTTP_PORT), NoCacheRequestHandler)
	httpd.serve_forever()


# WebSocket Server
wsClients = []
class WebSocketServer(WebSocket):
	def handleMessage(self):
		try: message(self.data, self)
		except Exception as err:
			if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro desconhecido')
			if DEBUG: print(F.RED + str(err) + S.RESET_ALL)

	def handleConnected(self):
		wsClients.append(self)
		if DEBUG: print(f'{F.YELLOW}[WEBSOCKET]{S.RESET_ALL} Usuário conectado ({self.address})')

	def handleClose(self):
		wsClients.remove(self)
		if DEBUG: print(f'{F.YELLOW}[WEBSOCKET]{S.RESET_ALL} Usuário desconectado ({self.address})')

# Envia uma mensagem para todos os clientes WebSocket
def sendWebSocketMsg(msg):
	for client in wsClients:
		client.sendMessage(msg)

# Notificação para vibração do controle
def gamepadNotification(client, target, large_motor, small_motor, led_number, user_data):
	gamepadIndex = next((x for x, item in enumerate(gamepads) if item._devicep == target), -1)
	if gamepadIndex >= 0: sendWebSocketMsg(f'V {large_motor}|{small_motor} {gamepadIndex}')

# Observa as notificações de vibração do controle
if gamepads:
	for i in range(len(gamepads)):
		gamepads[i].register_notification(callback_function=gamepadNotification)

# Inicia o servidor WebSocket
def wsServer():
	wss = SimpleWebSocketServer('0.0.0.0', WS_PORT, WebSocketServer)
	wss.serveforever()

# Inicia as threads para os servidores HTTP e WS
httpThread = threading.Thread(target=httpServer)
httpThread.daemon = True
httpThread.start()
wsThread = threading.Thread(target=wsServer)
wsThread.daemon = True
wsThread.start()