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
	print('[ERRO] Alguns módulos estão faltando para o funcionamento desta aplicação.')
	print('Você precisa executar os seguintes comandos no terminal para instalá-los:\n')
	commands = [
		'python -m pip install colorama',
		'python -m pip install pynput',
		'python -m pip install pyqrcode',
		'python -m pip install websockets'
	]
	for c in commands: print(c)
	input('\nPressione Enter para instalar os módulos inexistentes...')
	import os, sys
	for c in commands: os.system(c.replace('python', sys.executable))
	os.system('{} {}'.format(sys.executable, os.path.basename(__file__)))
	quit()


coloramaInit(autoreset=True)
keyboard = Controller()
handler = http.server.SimpleHTTPRequestHandler


# Define o diretório atual e o IP
os.chdir(os.path.join(os.path.dirname(__file__), 'web'))
ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1]
httpIp = '{}:{}'.format(ip, HTTP_PORT)
wsIp = '{}:{}'.format(ip, WS_PORT)


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

	def keyCommand(key, cmd):
		commands = {
			'r': 'RELEASE',
			'p': 'PRESS',
			't': 'TAP'
		}
		if DEBUG: print('{}[{} KEY]{}{} '.format(F.CYAN, commands[cmd], S.RESET_ALL, str(key)))
		try:
			if msg[0] == 'r': keyboard.release(key)
			elif msg[0] == 'p': keyboard.press(key)
			elif msg[0] == 't':
				keyboard.press(key)
				sleep(0.05)
				keyboard.release(key)
		except Exception as err:
			if DEBUG: print('{}[WEBSOCKET]{} Erro: dados inválidos'.format(F.MAGENTA, S.RESET_ALL))
			if DEBUG: print(F.RED + str(e))

	def message(msg):
		msg = msg.lower().split(' ')
		msg[1] = msg[1].split(',')
		for keyName in msg[1]:
			key = getKey(keyName)
			keyCommand(key, msg[0])			

	try:
		if DEBUG: print('{}[WEBSOCKET]{} Usuário conectado'.format(F.YELLOW, S.RESET_ALL))
		async for msg in websocket:
			message(msg)
	except Exception as e:
		if DEBUG: print('{}[WEBSOCKET]{} Erro desconhecido'.format(F.MAGENTA ,S.RESET_ALL))
		if DEBUG: print(F.RED + str(e))


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
	return result


print('\n  Acesse:{}{} http://{}'.format(S.BRIGHT, F.GREEN, httpIp))
print('  Digite este código no site:')
print('  ┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('  ┃ {}{}{} ┃'.format(S.BRIGHT, wsIp.ljust(21), S.RESET_ALL))
print('  ┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')
print(S.BRIGHT + qrCode('http://' + httpIp))


if __name__ == "__main__":
	start_server = websockets.serve(server, port=WS_PORT)
	asyncio.get_event_loop().run_until_complete(start_server)
	httpThread = threading.Thread(target=httpServer)
	httpThread.start()
	asyncio.get_event_loop().run_forever()