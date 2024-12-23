#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __main__ import __file__ as __mainfile__
import os, re, sys
from .helpers import clearConsole
from colorama import Back as B, Fore as F, Style as S

afterExitTasks = []

# Executa funções depois de fechar a aplicação
def runAfterExitTasks():
	clearConsole()
	for task in afterExitTasks:
		task()
	quit()

# Reabre o programa
def reloadScript(message, error = False):
	clearConsole()
	terminalSize = os.get_terminal_size()
	terminalWidth = terminalSize[0]
	terminalHeight = terminalSize[1]

	text = ''
	if message:
		color = F.RED if error else F.GREEN
		text += ((terminalWidth - len(message)) // 2) * ' '
		text += (S.BRIGHT + color + message + S.RESET_ALL)
		text += '\n\n'

	spaces = ((terminalWidth - 36) // 2) * ' '
	box = spaces + f'┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
	      spaces + f'┃ •                              • ┃\n' + \
	      spaces + f'┃                                  ┃\n' + \
	      spaces + f'┃    Por favor, feche o MobyStk    ┃\n' + \
	      spaces + f'┃         e abra novamente         ┃\n' + \
	      spaces + f'┃                                  ┃\n' + \
	      spaces + f'┃ •                              • ┃\n' + \
	      spaces + f'┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'
	box = re.sub('([\\w,])', S.BRIGHT + F.CYAN + '\\1' + S.RESET_ALL, box)
	box = re.sub('([•])', S.BRIGHT + '\\1' + S.RESET_ALL, box)
	box = re.sub('([┏┛━┗┓┃])', F.YELLOW + '\\1' + S.RESET_ALL, box)
	text += box

	lines = text.split('\n')
	firstLineBreaks = (terminalHeight - len(lines)) // 2
	lastLineBreaks = terminalHeight - firstLineBreaks - len(lines) - 1

	print('\n' * firstLineBreaks, end='')
	for l in lines: print(l)
	print('\n' * lastLineBreaks, end='')
	try: input()
	except: pass
	quit()

# Instala o vgamepad
def installVgamepad():
	print('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
	      '┃ Instalando o controle virtual, aguarde... ┃\n' + \
	      '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	command = 'python -m pip install vgamepad'
	code = os.system(command.replace('python -m', f'"{sys.executable}" -m'))
	if code == 0: reloadScript('O controle virtual foi instalado!')
	else: reloadScript('Falha ao instalar o controle virtual!', True)

# Desinstala o vgamepad
def uninstallVgamepad():
	print('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
	      '┃ Desinstalando o controle virtual, aguarde... ┃\n' + \
	      '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	command = 'python -m pip uninstall vgamepad'
	os.system(command.replace('python -m', f'"{sys.executable}" -m'))
	reloadScript('O controle virtual foi desinstalado!')