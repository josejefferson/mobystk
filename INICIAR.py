#!/usr/bin/env python
# -*- coding: utf-8 -*-

DEBUG = False # Se True, mostrará logs
HTTP_PORT = 8877 # Porta do servidor HTTP
WS_PORT = 5000 # Porta do servidor WebSocket

try:
	from colorama import init as coloramaInit, Back as B, Fore as F, Style as S
	from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
	from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
	from pynput.keyboard import Key, KeyCode, Controller
	from time import sleep
	import os
	import pyqrcode
	import socket
	import threading
except ModuleNotFoundError:
	print('Ops! Alguns módulos estão faltando para o funcionamento desta aplicação.')
	print('Você precisa executar os seguintes comandos no terminal para instalá-los (ou pressionar Enter):\n')
	commands = [
		'python -m pip install colorama',
		'python -m pip install pynput',
		'python -m pip install pyqrcode',
		'python -m pip install SimpleWebSocketServer'
	]
	for c in commands: print(c)
	input('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
				'┃ Pressione Enter para instalar os módulos inexistentes... ┃\n' + \
				'┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	import os, sys
	for c in commands: os.system(c.replace('python -m', f'"{sys.executable}" -m'))
	os.system(f'{sys.executable} {os.path.basename(__file__)}')
	quit()

# Importa o vgamepad se tiver sido instalado
try:
	import vgamepad as vg
	gamepad = vg.VX360Gamepad()
except ModuleNotFoundError:
	gamepad = None
	pass
except Exception as err:
	gamepad = None
	print(err)
vgamepadError = False

coloramaInit(autoreset=True)
keyboard = Controller()


# Define o diretório atual e o IP
os.chdir(os.path.join(os.path.dirname(__file__), 'web'))
ips = socket.gethostbyname_ex(socket.gethostname())[-1]
if '192.168.137.1' in ips: ips.append(ips.pop(ips.index('192.168.137.1')))
if '192.168.56.1' in ips: ips.remove('192.168.56.1')
httpIp = '{}:{}'.format(ips[-1], HTTP_PORT)
wsIp = '{}:{}'.format(ips[-1], WS_PORT)


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

def httpServer():
	httpd = CustomThreadingHTTPServer(('', 8877), NoCacheRequestHandler)
	httpd.serve_forever()


# Retorna a tecla do teclado pelo nome
def getKey(keyName):
	if len(keyName) > 1:
		if keyName.isdigit(): return KeyCode(int(keyName))
		else: return Key[keyName]
	return keyName

# Aperta/desaperta as teclas ou botões
def keyCommand(cmd, key, vpad = False):
	commands = {
		'r': 'RELEASE',
		'p': 'PRESS',
		't': 'TAP',
		'vjl': 'LEFT JOYSTICK',
		'vjr': 'RIGHT JOYSTICK'
	}
	if DEBUG: print(f'{F.CYAN}[{commands[cmd]} KEY] {S.RESET_ALL}{key} ')
	try:
		# Comandos VGamepad
		if vpad:
			# Se o VGamepad não estiver instalado
			global vgamepadError
			if not gamepad:
				if not vgamepadError:
					vgamepadError = True
					print(f'{S.BRIGHT}{F.RED}[VGAMEPAD] Erro: VGamepad não está instalado\n' +\
						'Instale-o executando o comando "python -m pip install vgamepad"')
				return

			# Pressiona um botão do gamepad
			def button(action, key):
				t = 255 if action == 'press' else 0
				if key == 'xusb_gamepad_left_trigger': gamepad.left_trigger(value=t)
				elif key == 'xusb_gamepad_right_trigger': gamepad.right_trigger(value=t)
				else: getattr(gamepad, f'{action}_button')(button=vg.XUSB_BUTTON[key.upper()])

			# Direciona um joystick do gamepad
			def joystick(side, key):
				x,y = list(map(int, key.split('|')))
				getattr(gamepad, f'{side}_joystick')(x_value=x, y_value=y)

			if cmd == 'vjl': joystick('left', key)
			elif cmd == 'vjr': joystick('right', key)
			elif cmd == 'r': button('release', key)
			elif cmd == 'p': button('press', key)
			elif cmd == 't':
				button('press', key)
				gamepad.update()
				sleep(0.05)
				button('release', key)
			gamepad.update()

		# Comandos de teclado
		elif cmd == 'r': keyboard.release(key)
		elif cmd == 'p': keyboard.press(key)
		elif cmd == 't':
			keyboard.press(key)
			sleep(0.05)
			keyboard.release(key)

	except Exception as err:
		if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro: dados inválidos')
		if DEBUG: print(F.RED + str(err))

# Lida com as mensagens do WebSocket
def message(msg):
	msg = msg.lower().split(' ')
	cmd = msg[0]
	keys = msg[1].split(',')
	for key in keys:
		if cmd.startswith('v') or key.startswith('xusb_gamepad'):
			keyCommand(cmd, key, True)
		else:
			keyCommand(cmd, getKey(key))


# WebSocket Server
wsClients = []
class WebSocketServer(WebSocket):
	def handleMessage(self):
		try: message(self.data)
		except Exception as err:
			if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro desconhecido')
			if DEBUG: print(F.RED + str(err))

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
	sendWebSocketMsg(f'V {large_motor}|{small_motor}')

gamepad.register_notification(callback_function=gamepadNotification)


# QR Code (bit.ly/3dpXMa9)
def qrCode(url):
	def halfChar(a, b):
		halfMatrix = {
			('0', '0'): '█',
			('1', '1'): ' ',
			('1', '0'): '▄',
			('0', '1'): '▀'
		}
		return halfMatrix[(a, b)]

	lines = pyqrcode.create(url).text().split('\n')
	i = 0
	result = ''
	while i < len(lines):
		line1 = lines[i]
		i += 1
		line2 = lines[i]
		if (line2 < line1):
			line2 += '1' * len(line1)
		i += 1
		result += '  ' + ''.join(map(halfChar, list(line1), list(line2))) + '\n'
	return result.strip('\n')


print(f'\n  Acesse:{S.BRIGHT}{F.GREEN} http://{httpIp}')
print(f'  Digite este código no site:')
print(f'  ┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print(f'  ┃ {S.BRIGHT}{wsIp.ljust(21)}{S.RESET_ALL} ┃')
print(f'  ┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')
print(S.BRIGHT + qrCode('http://' + httpIp))
if len(ips) > 1:
	coloredIPs = [f'{F.CYAN}http://{ip}:{HTTP_PORT}{S.RESET_ALL}' for ip in ips[:-1]]
	print(f'  Caso não funcione, tente: ')
	print(f'  {" ou ".join(coloredIPs)}')

async def wsServer():
	async with websockets.serve(server, port=WS_PORT):
		await asyncio.Future()

if __name__ == "__main__":
	httpThread = threading.Thread(target=httpServer)
	httpThread.daemon = True
	httpThread.start()
	wsServer = SimpleWebSocketServer('0.0.0.0', WS_PORT, WebSocketServer)
	try: wsServer.serveforever()
	except KeyboardInterrupt: pass