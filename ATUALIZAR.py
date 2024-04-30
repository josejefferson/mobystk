#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
	from colorama import init as coloramaInit, Back as B, Fore as F, Style as S
	import datetime
	import os
	import requests
	import shutil
	import zipfile
except ModuleNotFoundError:
	print('Ops! Alguns módulos estão faltando para o funcionamento desta aplicação.')
	print('Você precisa executar os seguintes comandos no terminal para instalá-los (ou pressionar ENTER):\n')
	commands = [
		'python -m pip install requests',
		'python -m pip install colorama'
	]
	for c in commands: print(c)
	input('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' + \
	      '┃ Pressione ENTER para instalar os módulos inexistentes... ┃\n' + \
	      '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
	import os, sys
	for c in commands: os.system(c.replace('python -m', f'"{sys.executable}" -m'))
	os.system(f'{sys.executable} {os.path.abspath(__file__)}')
	quit()


coloramaInit(autoreset=True)

token = None
user = 'josejefferson'
repository = 'mobystk'
commitsURL = f'https://api.github.com/repos/{user}/{repository}/commits'
zipURL = f'https://api.github.com/repos/{user}/{repository}/zipball/main'
headers = {'Authorization': 'token ' + token if token else None}
downloadedZIPName = 'update.zip'
updateFolderName = f'{user}-{repository}-'
internalFolder = '.update'
lastUpdateFile = f'{internalFolder}/lastUpdate.txt'


class BadStatusCode(Exception):
	def __init__(self, response):
		message = f'Erro {response.status_code}: '
		try:
			message += response.json()['message']
		except Exception:
			message += response.text

		super().__init__(message)

def getLastUpdateDate(lastUpdateFile):
	try:
		with open(lastUpdateFile) as file:
			return file.read()
	except Exception:
		return None

def checkForUpdates(since):
	print(f'{F.YELLOW}Verificando por atualizações...')
	try:
		response = requests.get(commitsURL, headers=headers, params={'since': since})
		if response.status_code != 200: raise BadStatusCode(response)
		return response
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao consultar atualizações. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def getUpdateMessages(response):
	try:
		commits = response.json()
		messages = []
		for commit in commits:
			message = commit['commit']['message']
			messages.append(message)
		messages.reverse()
		return messages
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao carregar as mensagens de atualização. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(F.RED + str(err))
		print(f'{F.CYAN}Deseja atualizar mesmo assim? {F.MAGENTA}Pressione ENTER. ' + \
			'Caso contrário, feche esta janela.', end='')
		input()
		return None

def askForUpdates(messages, since):
	if messages == None: return
	if len(messages) == 0:
		print(f'{F.GREEN}{S.BRIGHT}O MobyStk já está atualizado. {S.RESET_ALL}{F.MAGENTA}' + \
			'Pressione ENTER para atualizar mesmo assim, ou feche esta janela para cancelar.', end='')
		input()
		return

	if since == None: print(f'{F.GREEN}Esta é a primeira atualização! Veja as últimas novidades:')
	else: print(f'{F.GREEN}Atualização disponível! Veja as novidades:')
	for message in messages[-10:]:
		print(f'{F.BLUE}• {F.WHITE}{message}')

	print(f'\n{F.YELLOW}{S.BRIGHT}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
	print(f'{F.YELLOW}{S.BRIGHT}┃{F.MAGENTA} Pressione ENTER para atualizar... {F.YELLOW}┃')
	print(f'{F.YELLOW}{S.BRIGHT}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛', end='')
	input()

def downloadUpdates():
	print(f'{F.YELLOW}Baixando atualizações...')
	try:
		response = requests.get(zipURL, headers=headers)
		if response.status_code != 200: raise BadStatusCode(response)
		with open(downloadedZIPName, 'wb') as file:
			file.write(response.content)
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao baixar atualizações. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def backup():
	print(f'{F.YELLOW}Fazendo backup...')
	try:
		now = datetime.datetime.now().isoformat()
		backupFolder = f'{internalFolder}/backup-{now}'
		backupFolder = backupFolder.replace(':', '_')
		ignore = shutil.ignore_patterns(internalFolder, downloadedZIPName)
		shutil.copytree('.', backupFolder, ignore=ignore)
		return backupFolder
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao realizar o backup. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def extractUpdatesFile():
	print(f'{F.YELLOW}Extraindo...')
	try:
		with zipfile.ZipFile(downloadedZIPName, 'r') as file:
			file.extractall(internalFolder)
		dirList = os.listdir(internalFolder)
		extractFolderName = [d for d in dirList if d.startswith(updateFolderName)][0]
		return extractFolderName
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao extrair os arquivos. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def removeOldVersion(backupFolder):
	print(f'{F.YELLOW}Removendo versão antiga...')
	try:
		directories = [d for d in os.listdir('.') if os.path.isdir(d) and not d == internalFolder]
		files = [d for d in os.listdir('.') if not os.path.isdir(d) and not d == 'options.json']

		for dir in directories:
			shutil.rmtree(dir)
		for file in files:
			os.remove(file)
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao remover a versão antiga. {S.BRIGHT}' + \
			f'A aplicação pode ter sido danificada.{S.NORMAL}'
			f'\nRecomenda-se restaurar o backup em "{S.BRIGHT}{backupFolder}{S.NORMAL}".' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def copyNewFiles(extractFolderName, backupFolder):
	print(f'{F.YELLOW}Copiando novos arquivos...')
	try:
		src = f'{internalFolder}/{extractFolderName}'
		for item in os.listdir(src):
			srcPath = os.path.join(src, item)
			destPath = os.path.join('.', item)
			if os.path.isdir(srcPath):
				shutil.copytree(srcPath, destPath)
			else:
				shutil.copy2(srcPath, destPath)
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao copiar os novos arquivos. {S.BRIGHT}' + \
			f'A aplicação pode ter sido danificada.{S.NORMAL}' + \
			f'\nRecomenda-se restaurar o backup em "{S.BRIGHT}{backupFolder}{S.NORMAL}".' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def cleanAndFinalize(extractFolderName):
	print(f'{F.YELLOW}Finalizando...')
	try:
		shutil.rmtree(f'{internalFolder}/{extractFolderName}')
		with open(lastUpdateFile, 'w') as file:
			file.write(datetime.datetime.now().isoformat())
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao finalizar. {S.BRIGHT}' + \
			f'Podem ocorrer problemas em uma futura atualização. {S.NORMAL}' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

def installShortcut():
	print(f'{F.YELLOW}Criando atalho, aguarde...')
	try:
		os.system(f"powershell \"$s=(New-Object -COM WScript.Shell).CreateShortcut('%userprofile%\\Desktop\\MobyStk.lnk');$s.TargetPath='{os.getcwd()}\\INICIAR.py';$s.Description='Use seu smartphone como controle de videogame para PC';$s.IconLocation='{os.getcwd()}\\public\\img\\icon.ico';$s.Save()\"")
		os.system(f"powershell \"$s=(New-Object -COM WScript.Shell).CreateShortcut('%appdata%\\Microsoft\\Windows\\Start Menu\\MobyStk.lnk');$s.TargetPath='{os.getcwd()}\\INICIAR.py';$s.IconLocation='{os.getcwd()}\\public\\img\\icon.ico';$s.Save()\"")
		print(f'{F.GREEN}O atalho para o MobyStk foi criado na área de trabalho! {S.BRIGHT}Pode fechar esta janela agora!')
		input()
	except Exception as err:
		print(f'{B.RED}{F.WHITE}Ocorreu um erro ao criar atalho. ' + \
			'Veja detalhes sobre o erro abaixo:')
		print(f'{F.RED}{err}', end='')
		input()
		quit()

print(f'{F.CYAN}{S.BRIGHT}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
print(f'{F.CYAN}{S.BRIGHT}┃{F.YELLOW} Ferramenta de atualização do MobyStk {F.CYAN}┃')
print(f'{F.CYAN}{S.BRIGHT}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n')

since = getLastUpdateDate(lastUpdateFile)
response = checkForUpdates(since)
messages = getUpdateMessages(response)
askForUpdates(messages, since)
downloadUpdates()
backupFolder = backup()
extractFolderName = extractUpdatesFile()
removeOldVersion(backupFolder)
copyNewFiles(extractFolderName, backupFolder)
cleanAndFinalize(extractFolderName)

print(f'{S.BRIGHT}\n ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
print(f'{S.BRIGHT} ┃{F.GREEN} O MobyStk foi atualizado com sucesso!   {F.RESET}┃')
print(f'{S.BRIGHT} ┃{F.MAGENTA} Você pode fechar esta janela agora!     {F.RESET}┃')
if os.name == 'nt': print(f'{S.BRIGHT} ┃{F.YELLOW} Ou pressione {F.WHITE}ENTER{F.YELLOW} para criar um atalho {F.RESET}┃')
print(f'{S.BRIGHT} ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
input()
if os.name == 'nt': installShortcut()
