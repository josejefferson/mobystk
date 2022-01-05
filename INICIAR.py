#!/usr/bin/env python
# -*- coding: utf-8 -*-

DEBUG = False # Se True, mostrará logs
HTTP_PORT = 8877 # Porta do servidor HTTP
WS_PORT = 5000 # Porta do servidor WebSocket

try:
	from colorama import init as coloramaInit, Back as B, Fore as F, Style as S
	from pynput.keyboard import Key, KeyCode, Controller
	from time import sleep
	import asyncio
	import http.server
	import os
	import pyqrcode
	import socket
	import socketserver
	import threading
	import websockets
except ModuleNotFoundError:
	print('Ops! Alguns módulos estão faltando para o funcionamento desta aplicação.')
	print('Você precisa executar os seguintes comandos no terminal para instalá-los (ou pressionar Enter):\n')
	commands = [
		'python -m pip install colorama',
		'python -m pip install pynput',
		'python -m pip install pyqrcode',
		'python -m pip install websockets'
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
	gamepad = vg.VDS4Gamepad()
except ModuleNotFoundError:
	gamepad = None
	pass
except Exception as err:
	gamepad = None
	print(err)
vgamepadError = False

coloramaInit(autoreset=True)
keyboard = Controller()
handler = http.server.SimpleHTTPRequestHandler


# Define o diretório atual e o IP
os.chdir(os.path.join(os.path.dirname(__file__), 'web'))
ips = socket.gethostbyname_ex(socket.gethostname())[-1]
if '192.168.137.1' in ips: ips.append(ips.pop(ips.index('192.168.137.1')))
if '192.168.56.1' in ips: ips.remove('192.168.56.1')
httpIp = '{}:{}'.format(ips[-1], HTTP_PORT)
wsIp = '{}:{}'.format(ips[-1], WS_PORT)


# HTTP Server
class NoCacheHandler(handler):
	def end_headers(self):
		self.myHeaders()
		handler.end_headers(self)

	def myHeaders(self):
		self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
		self.send_header('Pragma', 'no-cache')
		self.send_header('Expires', '0')

	def log_message(self, format, *args):
		return

def httpServer():
	with socketserver.TCPServer(('', HTTP_PORT), NoCacheHandler) as httpd:
		httpd.serve_forever()


# WebSocket Server
async def server(websocket, path):
	def getKey(keyName):
		if len(keyName) > 1:
			if keyName.isdigit(): return KeyCode(int(keyName))
			else: return Key[keyName]
		return keyName

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
			# Comandos vgamepad
			if vpad:
				global vgamepadError
				if not gamepad and not vgamepadError:
					vgamepadError = True
					return print(f'{S.BRIGHT}{F.RED}[VGAMEPAD] Erro: VGamepad não está instalado\n' +\
						'Instale-o executando o comando "python -m pip install vgamepad"')
				if key.startswith('ds4_button_dpad'):
					gamepad.directional_pad(direction=vg.DS4_DPAD_DIRECTIONS[key.upper()])
				elif cmd == 'r':
					if key == 'ds4_button_trigger_left': gamepad.left_trigger(value=0)
					elif key == 'ds4_button_trigger_right': gamepad.right_trigger(value=0)
					else: gamepad.release_button(button=vg.DS4_BUTTONS[key.upper()])
				elif cmd == 'p':
					if key == 'ds4_button_trigger_left': gamepad.left_trigger(value=255)
					elif key == 'ds4_button_trigger_right': gamepad.right_trigger(value=255)
					else: gamepad.press_button(button=vg.DS4_BUTTONS[key.upper()])
				elif cmd == 't':
					if key == 'ds4_button_trigger_left': gamepad.left_trigger(value=255)
					elif key == 'ds4_button_trigger_right': gamepad.right_trigger(value=255)
					else: gamepad.press_button(button=vg.DS4_BUTTONS[key.upper()])
					gamepad.update()
					sleep(0.05)
					if key == 'ds4_button_trigger_left': gamepad.left_trigger(value=0)
					elif key == 'ds4_button_trigger_right': gamepad.right_trigger(value=0)
					else: gamepad.release_button(button=vg.DS4_BUTTONS[key.upper()])
				elif cmd == 'vjl':
					x,y = list(map(int, key.split('|')))
					gamepad.left_joystick(x_value=x, y_value=y)
				elif cmd == 'vjr':
					x,y = list(map(int, key.split('|')))
					gamepad.right_joystick(x_value=x, y_value=y)
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

	def message(msg):
		msg = msg.lower().split(' ')
		cmd = msg[0]
		keys = msg[1].split(',')
		for key in keys:
			if cmd.startswith('v') or key.startswith('ds4_button'):
				keyCommand(cmd, key, True)
			else:
				keyCommand(cmd, getKey(key))

	try:
		if DEBUG: print(f'{F.YELLOW}[WEBSOCKET]{S.RESET_ALL} Usuário conectado')
		async for msg in websocket:
			message(msg)
	except Exception as err:
		if DEBUG: print(f'{F.MAGENTA}[WEBSOCKET]{S.RESET_ALL} Erro desconhecido')
		if DEBUG: print(F.RED + str(err))


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
	httpThread.start()
	asyncio.run(wsServer())