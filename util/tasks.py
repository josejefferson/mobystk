#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __main__ import __file__ as __mainfile__
import os, re, sys
from util.helpers import clearConsole
from colorama import Back as B, Fore as F, Style as S

afterExitTasks = []

# Executa funções depois de fechar a aplicação
def runAfterExitTasks():
	clearConsole()
	for task in afterExitTasks:
		task()
	quit()

# Reabre o programa
def reloadScript(message):
	clearConsole()
	terminalSize = os.get_terminal_size()
	terminalWidth = terminalSize[0]
	terminalHeight = terminalSize[1]

	text = ''
	if message:
		text += ((terminalWidth - len(message)) // 2) * ' '
		text += (S.BRIGHT + F.GREEN + message + S.RESET_ALL)
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
	print('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
				'┃ Instalando o "vgamepad", aguarde... ┃\n' + \
				'┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	command = 'python -m pip install vgamepad'
	os.system(command.replace('python -m', f'"{sys.executable}" -m'))
	reloadScript('O vgamepad foi instalado!')