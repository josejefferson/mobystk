import http.server
import socketserver
import socket

PORT = 8877

handler = http.server.SimpleHTTPRequestHandler

class NoCacheHandler(handler):
	def end_headers(self):
		self.send_my_headers()
		handler.end_headers(self)

	def send_my_headers(self):
		self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
		self.send_header('Pragma', 'no-cache')
		self.send_header('Expires', '0')

ip = socket.gethostbyname_ex(socket.gethostname())[-1][-1] + ':' + str(PORT)
with socketserver.TCPServer(('', PORT), NoCacheHandler) as httpd:
	print('\n[HTTP] Server started')
	print('\n# Enter this address in your browser:')
	print('┏━━━━━━━━━━━━━━━━━━━━━━━┓')
	print('┃ ' + ip.ljust(21) +  ' ┃')
	print('┗━━━━━━━━━━━━━━━━━━━━━━━┛\n')
	httpd.serve_forever()