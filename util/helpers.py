#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import pyqrcode
from colorama import Back as B, Fore as F, Style as S

# QR Code (bit.ly/3dpXMa9)
def qrCode(url):
	def halfChar(a, b):
		halfMatrix = {
			('0', '0'): '█',
			('1', '1'): ' ',
			('1', '0'): '▄',
			('0', '1'): '▀'
		}
		return halfMatrix[(a, b)]

	lines = pyqrcode.create(url).text().split('\n')[3:-4]
	lines = list(map(lambda l: l[3:-3], lines))

	i = 0
	result = ''
	while i < len(lines):
		line1 = lines[i]
		i += 1
		if i == len(lines):
			result += '▀' * len(lines[0])
		else:
			line2 = lines[i]
			if (line2 < line1):
				line2 += '1' * len(line1)
			i += 1
			result += ''.join(map(halfChar, list(line1), list(line2))) + '\n'
	return result.strip('\n')


# Retorna um texto de ajuda e o QRCode
def getIPContent(ip, httpPort, wsPort, i):
	text = ''
	if ip == '192.168.137.1': text += 'Conecte ao Wi-Fi do seu PC e acesse no navegador'
	elif i >= 1: text += 'Caso não funcione, tente acessar'
	else: text += 'Entre no navegador e acesse'

	BRIGHT = S.BRIGHT if i == 0 else ''
	
	text += f'\n{BRIGHT}{F.GREEN}http://{ip}:{httpPort}{S.RESET_ALL}\n\n'
	text += f'Digite este código no site\n'
	text += f'{BRIGHT}{ip}:{wsPort}{S.RESET_ALL}\n\n'
	text += BRIGHT + qrCode(f'http://{ip}:{httpPort}')

	return text


# Limpa o console
def clearConsole():
	command = 'clear'
	if os.name in ('nt', 'dos'):
		command = 'cls'
		os.system(command)