HTTP_PORT = 8877
WS_PORT = 5000

import threading
import http.server
import socketserver
import socket
import asyncio
import websockets
from pynput.keyboard import Key, Controller

keyboard = Controller()
handler = http.server.SimpleHTTPRequestHandler
ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1]
httpIp = '{}:{}'.format(ip, HTTP_PORT).ljust(21)
wsIp = '{}:{}'.format(ip, WS_PORT).ljust(21)

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
		httpd.serve_forever()


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
				elif msg[0] == 't': keyboard.tap(key)
		except:
			print('[ ERROR ] Invalid data!')
			pass

print('\n# Enter this code on the website:')
print('┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('┃ ' +     wsIp      + ' ┃')
print('┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')

start_server = websockets.serve(server, port=WS_PORT)
asyncio.get_event_loop().run_until_complete(start_server)

if __name__ == "__main__":
	httpThread = threading.Thread(target=httpServer)
	httpThread.start()
	asyncio.get_event_loop().run_forever()
