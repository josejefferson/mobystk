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

		if msg[1] == 'l': msg[1] = 'q'             # L
		elif msg[1] == 'r': msg[1] = 'w'           # R
		elif msg[1] == 'actup': msg[1] = 'w'       # Triangle or X
		elif msg[1] == 'actright': msg[1] = 'd'    # Circle   or A
		elif msg[1] == 'actleft': msg[1] = 'a'     # Square   or Y
		elif msg[1] == 'actdown': msg[1] = 's'     # Cross    or B
		elif msg[1] == 'start': msg[1] = Key.space # Start
		elif msg[1] == 'select': msg[1] = 'v'      # Select
		elif msg[1] == 'up': msg[1] = Key.up       # Arrow up
		elif msg[1] == 'down': msg[1] = Key.down   # Arrow down
		elif msg[1] == 'left': msg[1] = Key.left   # Arrow left
		elif msg[1] == 'right': msg[1] = Key.right # Arrow right

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