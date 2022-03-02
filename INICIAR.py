# !/usr/bin/env python
# -*- coding: utf-8 -*-

DEBUG = False # Se True, mostrará logs
HTTP_PORT = 8877 # Porta do servidor HTTP
WS_PORT = 5000 # Porta do servidor WebSocket

try:
	import util.logo
	from util.dialogs import optionsDialog
	from util.helpers import clearConsole, getIPContent
	from util.tasks import runAfterExitTasks
	import socket
	import threading
	from time import sleep
	from colorama import init as coloramaInit, Back as B, Fore as F, Style as S
	from prompt_toolkit import ANSI
	from prompt_toolkit.application import Application
	from prompt_toolkit.application.current import get_app
	from prompt_toolkit.key_binding import KeyBindings
	from prompt_toolkit.key_binding.bindings.focus import focus_next, focus_previous
	from prompt_toolkit.layout import FloatContainer
	from prompt_toolkit.layout.containers import Window, HSplit, VSplit, WindowAlign
	from prompt_toolkit.layout.controls import FormattedTextControl
	from prompt_toolkit.layout.dimension import D
	from prompt_toolkit.layout.layout import Layout
	from prompt_toolkit.widgets import Button, Label
except ModuleNotFoundError:
	print('Ops! Alguns módulos estão faltando para o funcionamento desta aplicação.')
	print('Você precisa executar os seguintes comandos no terminal para instalá-los (ou pressionar ENTER):\n')
	commands = [
		'python -m pip install colorama',
		'python -m pip install prompt_toolkit',
		'python -m pip install pyqrcode',
		'python -m pip install pynput',
		'python -m pip install SimpleWebSocketServer'
	]
	for c in commands: print(c)
	input('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
				'┃ Pressione ENTER para instalar os módulos inexistentes... ┃\n' + \
				'┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	import os, sys
	for c in commands: os.system(c.replace('python -m', f'"{sys.executable}" -m'))
	os.system(f'{sys.executable} "{os.path.basename(__file__)}"')
	quit()

coloramaInit(autoreset = True)


# Título "MobyStk"
title = ANSI(f"""
{S.BRIGHT}{F.YELLOW}╔╦╗{F.GREEN}┌─┐{F.CYAN}┌┐ {F.WHITE}┬ ┬{F.YELLOW}╔═╗{F.GREEN}┌┬┐{F.CYAN}┬┌─{S.RESET_ALL}
{S.BRIGHT}{F.YELLOW}║║║{F.GREEN}│ │{F.CYAN}├┴┐{F.WHITE}└┬┘{F.YELLOW}╚═╗{F.GREEN} │ {F.CYAN}├┴┐{S.RESET_ALL}
{S.BRIGHT}{F.YELLOW}╩ ╩{F.GREEN}└─┘{F.CYAN}└─┘{F.WHITE} ┴ {F.YELLOW}╚═╝{F.GREEN} ┴ {F.CYAN}┴ ┴{S.RESET_ALL}
""".strip())


# Detalhes dos endereços IP e instruções na tela
ipDetails = VSplit([], height = D())
ips = []
def renderIPDetails():
	global ips
	
	# Verifica se houve mudança de IP
	_ips = socket.gethostbyname_ex(socket.gethostname())[-1]
	if '192.168.137.1' in _ips: _ips.insert(0, _ips.pop(_ips.index('192.168.137.1')))
	if '192.168.56.1' in _ips: _ips.remove('192.168.56.1')
	if ips == _ips: return
	ips = _ips.copy()

	# Prepara as informações de IP e QRCode na interface
	infos = []
	if len(_ips) <= 0:
		text = 'O seu computador não está conectado a nenhuma rede, por favor conecte-o para utilizar o MobyStk'
		infos.append(Window(
			content = FormattedTextControl(text),
			align = WindowAlign.CENTER,
			wrap_lines = True
		))
	if len(_ips) >= 1:
		infos.append(Window(
			content = FormattedTextControl(ANSI(getIPContent(_ips[0], HTTP_PORT, WS_PORT, 0))),
			align = WindowAlign.CENTER,
			ignore_content_width = True,
			wrap_lines = True
		))
	if len(_ips) >= 2:
		infos.append(Window(width = 1, char = '│'))
		infos.append(Window(
			content = FormattedTextControl(ANSI(getIPContent(_ips[1], HTTP_PORT, WS_PORT, 1))),
			align = WindowAlign.CENTER,
			ignore_content_width = True,
			wrap_lines = True
		))
	if len(_ips) >= 3:
		infos.append(Window(width = 1, char = '│'))
		infos.append(Window(
			content = FormattedTextControl(ANSI(getIPContent(_ips[2], HTTP_PORT, WS_PORT, 2))),
			align = WindowAlign.CENTER,
			ignore_content_width = True,
			wrap_lines = True
		))

	# Atualiza a tela
	ipDetails.children = infos
	if not DEBUG: get_app()._on_resize()

renderIPDetails()
def renderIPDetailsLoop():
	while True:
		sleep(5)
		renderIPDetails()

renderIPDetailsThread = threading.Thread(target=renderIPDetailsLoop)
renderIPDetailsThread.daemon = True
renderIPDetailsThread.start()


# Aplicação
rootContainer = HSplit([
	Label(text = title, align = WindowAlign.CENTER),
	ipDetails,
	VSplit([
		Window(content = FormattedTextControl(' Desenvolvido por Jefferson Dantas \n')),
		Button(text = 'Opções', handler = lambda: optionsDialog(rootContainer)),
		Button(text = 'Sair', handler = exit),
	], padding = 2)
])

# Teclas de atalho
kb = KeyBindings()

@kb.add('c-c')
@kb.add('c-w')
@kb.add('c-q')
@kb.add('escape', 'f4')
def exit(event):
	get_app().exit()

kb.add('tab')(focus_next)
kb.add('down')(focus_next)
kb.add('right')(focus_next)
kb.add('s-tab')(focus_previous)
kb.add('up')(focus_previous)
kb.add('left')(focus_previous)

if not DEBUG:
	# Aplicação
	rootContainer = FloatContainer(content = rootContainer, floats = [])
	layout = Layout(rootContainer)
	app = Application(layout = layout, key_bindings = kb, mouse_support = True, full_screen = True)
	app.output.show_cursor = lambda: None
	app.run()
	runAfterExitTasks()
else:
	# Modo Debug
	print(f'{S.BRIGHT}----- Modo DEBUG ativado -----\n')
	for i in range(len(ips)):
		print(getIPContent(ips[i], HTTP_PORT, WS_PORT, i), '\n')
		try:
			while True: sleep(1000)
		except KeyboardInterrupt: pass