#!/usr/bin/env python
# -*- coding: utf-8 -*-

# INSTALE ESTES PACOTES ANTES DA PRIMEIRA EXECUÇÃO
# pip install websockets
# pip install pyqrcode
# pip install pynput
# pip install colorama

HTTP_PORT = 8877 # Porta do servidor HTTP
WS_PORT = 5000 # Porta do servidor WebSocket
DEBUG = False # Se True, mostrará logs

import asyncio
from colorama import init as coloramaInit, Fore, Style
import http.server
import pyqrcode
import socket
import socketserver
import threading
import time
import websockets
from pynput.keyboard import Key, KeyCode, Controller

coloramaInit()
keyboard = Controller()
handler = http.server.SimpleHTTPRequestHandler

# Retorna o IP local do computador
ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1]
httpIp = '{}:{}'.format(ip, HTTP_PORT)
wsIp = '{}:{}'.format(ip, WS_PORT)

# ========================================
# QR Code (bit.ly/3dpXMa9)
# ========================================
def half_char(u, d):
	half_matrix = {
		('0', '0'): '█',
		('1', '1'): ' ',
		('1', '0'): '▄',
		('0', '1'): '▀'
	}
	return half_matrix[(u,d)]

def qr_half(txt):
	a = txt.split('\n')
	i = 0
	r = ''
	while i < len(a):
		l1 = a[i]
		i += 1
		l2 = a[i]
		if (l2 < l1): l2 += '1' * len(l1)
		i += 1
		r += '  ' + ''.join(map(half_char, list(l1), list(l2))) + '\n'
	return r

# ========================================
# HTTP Server
# ========================================
class NoCacheHandler(handler):
	def end_headers(self):
		self.send_my_headers()
		handler.end_headers(self)

	# Desativa o cache
	def send_my_headers(self):
		self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
		self.send_header('Pragma', 'no-cache')
		self.send_header('Expires', '0')

	# Desativa o log de requisições
	def log_message(self, format, *args):
		return

def httpServer():
	with socketserver.TCPServer(('', HTTP_PORT), NoCacheHandler) as httpd:
		httpd.serve_forever()

# ========================================
# WebSocket Server
# ========================================
async def server(websocket, path):
	try:
		if DEBUG: print(Fore.YELLOW + '[WEBSOCKET]' + Style.RESET_ALL + ' Usuário conectado')
		async for msg in websocket:
			# Mensagem do WebSocket
			try:
				msg = msg.lower().split(' ')
				msg[1] = msg[1].split(',')

				# Itera sobre as teclas
				for keyName in msg[1]:
					key = keyName
					if len(keyName) > 1:
						if keyName.isdigit(): key = KeyCode(int(keyName))
						else: key = Key[keyName]

					# 'r': release (soltar tecla)
					# 'p': press (pressionar tecla)
					# 't': tap (apertar e soltar tecla)
					if msg[0] == 'r':
						if DEBUG: print(Fore.CYAN + '[RELEASE KEY] ' + Style.RESET_ALL + str(key))
						keyboard.release(key)

					elif msg[0] == 'p':
						if DEBUG: print(Fore.CYAN + '[PRESS KEY] ' + Style.RESET_ALL + str(key))
						keyboard.press(key)

					elif msg[0] == 't':
						if DEBUG: print(Fore.CYAN + '[TAP KEY] ' + Style.RESET_ALL + str(key))
						keyboard.press(key)
						time.sleep(0.05)
						keyboard.release(key)

			except Exception as e:
				if DEBUG: print(Fore.MAGENTA + '[WEBSOCKET]' + Style.RESET_ALL + ' Erro: dados inválidos')
				if DEBUG: print(Fore.RED + str(e) + Style.RESET_ALL)
				pass

	except Exception as e:
		if DEBUG: print(Fore.MAGENTA + '[WEBSOCKET]' + Style.RESET_ALL + ' Erro desconhecido')
		if DEBUG: print(Fore.RED + str(e) + Style.RESET_ALL)
		pass

# ========================================
# Textos exibidos na tela
# ========================================
print('\n  Acesse: ' + Style.BRIGHT + Fore.GREEN + 'http://' + httpIp + Style.RESET_ALL)
print('  Digite este código no site:')
print('  ┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('  ┃ ' + Style.BRIGHT + wsIp.ljust(21) + Style.RESET_ALL + ' ┃')
print('  ┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')
print(Style.BRIGHT, end='')
qrcode = pyqrcode.create('http://' + httpIp).text()
print(qr_half(qrcode), end='')
print(Style.RESET_ALL, end='')

# ========================================
# Inicia os servidores
# ========================================
if __name__ == "__main__":
	start_server = websockets.serve(server, port=WS_PORT)
	asyncio.get_event_loop().run_until_complete(start_server)
	httpThread = threading.Thread(target=httpServer)
	httpThread.start()
	asyncio.get_event_loop().run_forever()