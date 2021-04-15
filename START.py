HTTP_PORT = 8877
WS_PORT = 5000

import time
import threading
import http.server
import socketserver
import socket
import asyncio
import websockets
import pyqrcode
from pynput.keyboard import Key, Controller

keyboard = Controller()
handler = http.server.SimpleHTTPRequestHandler
ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1]
httpIp = '{}:{}'.format(ip, HTTP_PORT)
wsIp = '{}:{}'.format(ip, WS_PORT)

# QR Code (https://gist.github.com/eduardomazolini/2466eda91ff8cff379ad83031c334e58)
def half_char(u, d):
	half_matrix = {
		('0', '0'):'\U00002588',
		('1', '1'):' ',
		('1', '0'):'\U00002584',
		('0', '1'):'\U00002580'
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
		if (l2 < l1):
			l2 += '1'*len(l1)
		i += 1
		r += ''.join(map(half_char,list(l1),list(l2)))+'\n'
	print(r)

# HTTP Server
class NoCacheHandler(handler):
	def end_headers(self):
		self.send_my_headers()
		handler.end_headers(self)

	def send_my_headers(self):
		self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
		self.send_header('Pragma', 'no-cache')
		self.send_header('Expires', '0')

def httpServer():
	with socketserver.TCPServer(('', HTTP_PORT), NoCacheHandler) as httpd:
		print('# Enter this address in your browser: http://' + httpIp + '\n')
		qrcode = pyqrcode.create('http://' + httpIp)
		qr_half(qrcode.text())
		httpd.serve_forever()

# WS Server
async def server(websocket, path):
	print('[WEBSOCKET] Connected user')

	async for msg in websocket:
		try:
			msg = msg.lower().split(' ')
			msg[1] = msg[1].split(',')

			for keyName in msg[1]:
				key = keyName
				if len(keyName) > 1: key = Key[keyName]

				if msg[0] == 'r': keyboard.release(key)
				elif msg[0] == 'p': keyboard.press(key)
				elif msg[0] == 't':
					keyboard.press(key)
					time.sleep(0.05)
					keyboard.release(key)
		except:
			print('[ ERROR ] Invalid data!')
			pass

print('\n# Enter this code on the website:')
print('┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('┃ ' +wsIp.ljust(21) + ' ┃')
print('┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')

start_server = websockets.serve(server, port=WS_PORT)
asyncio.get_event_loop().run_until_complete(start_server)

if __name__ == "__main__":
	httpThread = threading.Thread(target=httpServer)
	httpThread.start()
	asyncio.get_event_loop().run_forever()