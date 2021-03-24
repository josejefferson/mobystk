import socket
import asyncio
import websockets
from pynput.keyboard import Key, Controller

keyboard = Controller()

PORT = 5000
async def server(websocket, path):
	print('[WEBSOCKET] Usuário conectado')
	async for msg in websocket:
		msg = msg.split(' ')
		msg[1] = msg[1].lower()

		if msg[1] == 'l': msg[1] = 'l'             # L
		elif msg[1] == 'r': msg[1] = 'r'           # R
		elif msg[1] == 'x': msg[1] = 'x'           # X
		elif msg[1] == 'circle': msg[1] = 'c'      # Circle
		elif msg[1] == 'square': msg[1] = 's'      # Square
		elif msg[1] == 'triangle': msg[1] = 't'    # Triangle
		elif msg[1] == 'start': msg[1] = 'q'       # Start
		elif msg[1] == 'select': msg[1] = 'w'      # Select
		elif msg[1] == 'up': msg[1] = Key.up       # Up
		elif msg[1] == 'down': msg[1] = Key.down   # Down
		elif msg[1] == 'left': msg[1] = Key.left   # Left
		elif msg[1] == 'right': msg[1] = Key.right # Right

		if msg[0] == 'R':
			# print('[RELEASE] ' + msg[1])
			keyboard.release(msg[1])
		else:
			# print('[ PRESS ] ' + msg[1])
			keyboard.press(msg[1])

start_server = websockets.serve(server, port=PORT)
ip = socket.gethostbyname(socket.gethostname()) + ':' + str(PORT)

print('\n[WEBSOCKET] Servidor iniciado')
print('\n# Digite este código no aplicativo:')
print('┏━━━━━━━━━━━━━━━━━━━━━━━┓')
print('┃ ' + ip.ljust(21) +  ' ┃')
print('┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')

asyncio.get_event_loop().run_until_complete(start_server)
try:
	asyncio.get_event_loop().run_forever()
except KeyboardInterrupt:
	print('[WEBSOCKET] Servidor encerrado')
	pass