import socket
import asyncio
import websockets
from pynput.keyboard import Key, Controller

keyboard = Controller()

def getKey(cmd):
	if cmd == 'L': return 'q'              # L
	elif cmd == 'R': return 'e'            # R
	elif cmd == 'ACTUP': return 'i'        # Triangle or X
	elif cmd == 'ACTRIGHT': return 'l'     # Circle   or A
	elif cmd == 'ACTLEFT': return 'j'      # Square   or Y
	elif cmd == 'ACTDOWN': return 'k'      # Cross    or B
	elif cmd == 'START': return Key.space  # Start
	elif cmd == 'SELECT': return Key.enter # Select
	elif cmd == 'UP': return Key.up        # Arrow up
	elif cmd == 'DOWN': return Key.down    # Arrow down
	elif cmd == 'LEFT': return Key.left    # Arrow left
	elif cmd == 'RIGHT': return Key.right  # Arrow right
	elif cmd == 'JOYUP': return 'w'        # Joystick up
	elif cmd == 'JOYDOWN': return 'a'      # Joystick down
	elif cmd == 'JOYLEFT': return 's'      # Joystick left
	elif cmd == 'JOYRIGHT': return 'd'     # Joystick right
	elif cmd == 'LOAD': return 'o'         # Load state
	elif cmd == 'SAVE': return 'p'         # Save state
	else: return cmd

PORT = 5000
async def server(websocket, path):
	print('[WEBSOCKET] Connected user')
	async for msg in websocket:
		msg = msg.upper()
		msg = msg.split(' ')
		msg[1] = msg[1].split(',')

		for key in msg[1]:
			if msg[0] == 'R':
				print('[RELEASE] ' + key)
				keyboard.release(getKey(key))
			else:
				print('[ PRESS ] ' + key)
				keyboard.press(getKey(key))

start_server = websockets.serve(server, port=PORT)
ip = socket.gethostbyname(socket.gethostname()) + ':' + str(PORT)

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