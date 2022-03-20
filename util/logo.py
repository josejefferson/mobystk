#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from util.helpers import clearConsole

logo = """
   ▄▄▄▄███▄▄▄▄    ▄██████▄  ▀█████████▄  ▄██   ▄      ▄████████     ███        ▄█   ▄█▄ 
 ▄██▀▀▀███▀▀▀██▄ ███    ███   ███    ███ ███   ██▄   ███    ███ ▀█████████▄   ███ ▄███▀ 
 ███   ███   ███ ███    ███   ███    ███ ███▄▄▄███   ███    █▀     ▀███▀▀██   ███▐██▀   
 ███   ███   ███ ███    ███  ▄███▄▄▄██▀  ▀▀▀▀▀▀███   ███            ███   ▀  ▄█████▀    
 ███   ███   ███ ███    ███ ▀▀███▀▀▀██▄  ▄██   ███ ▀███████████     ███     ▀▀█████▄    
 ███   ███   ███ ███    ███   ███    ██▄ ███   ███          ███     ███       ███▐██▄   
 ███   ███   ███ ███    ███   ███    ███ ███   ███    ▄█    ███     ███       ███ ▀███▄ 
  ▀█   ███   █▀   ▀██████▀  ▄█████████▀   ▀█████▀   ▄████████▀     ▄████▀     ███   ▀█▀ 
                                                                              ▀         
Iniciando...""".strip('\n')

terminalSize = os.get_terminal_size()
terminalWidth = terminalSize[0] - 1
terminalHeight = terminalSize[1]

lines = logo.split('\n')

if terminalWidth < len(max(lines, key=len)):
	lines = list(map(lambda l: l[0:terminalWidth], lines))

lines = list(map(lambda l: l.center(terminalWidth), lines))
firstLineBreaks = (terminalHeight - len(lines)) // 2
lastLineBreaks = terminalHeight - firstLineBreaks - len(lines) - 1

clearConsole()
print('\n' * firstLineBreaks, end='')

for l in lines:
	print(l)

print('\n' * lastLineBreaks, end='')