import socket
import asyncio
import websockets
from pynput.keyboard import Key, Controller
keyboard = Controller()

PORT = 5000

async def server(websocket, path):
	print('[WEBSOCKET] Connected user')

	async for msg in websocket:
		try:
			msg = msg.lower().split(' ')
			msg[1] = msg[1].split(',')

			for keyName in msg[1]:
				key = keyName
				if len(keyName) > 1:
					key = Key[keyName]

				if msg[0] == 'r':
					keyboard.release(key)
					print('[RELEASE] ' + keyName)
				else:
					keyboard.press(key)
					print('[ PRESS ] ' + keyName)
		except:
			print('[ ERROR ] Invalid data!')
			pass

start_server = websockets.serve(server, port=PORT)
ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1] + ':' + str(PORT)

print('\n[WEBSOCKET] Server started')
print('\n# Enter this code on the website:')
print('┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('┃ ' + ip.ljust(21) +  ' ┃')
print('┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')

asyncio.get_event_loop().run_until_complete(start_server)
try:
	asyncio.get_event_loop().run_forever()
except KeyboardInterrupt:
	print('[WEBSOCKET] Server closed')
	pass