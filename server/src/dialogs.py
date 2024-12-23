#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from .options import options
# from .server import vgamepadInstalled, vgamepadError
from .tasks import afterExitTasks, installVgamepad, uninstallVgamepad, reloadScript
from prompt_toolkit.application.current import get_app
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.layout.containers import Float, HSplit
from prompt_toolkit.layout.dimension import D
from prompt_toolkit.widgets import Button, Dialog, Label, TextArea
from prompt_toolkit.layout.containers import Window, WindowAlign

vgamepadInstalled = True # temp
vgamepadError = False # temp

# Instala o controle virtual
def addTaskInstallVgamepad():
	afterExitTasks.append(installVgamepad)
	get_app().exit()

# Desinstala o controle virtual
def addTaskUninstallVgamepad():
	afterExitTasks.append(uninstallVgamepad)
	get_app().exit()

def toggleVgamepad():
	state = options.getOption('disableVgamepad')
	options.setOption('disableVgamepad', not state)
	afterExitTasks.append(lambda: reloadScript('O status do controle virtual foi alterado'))
	get_app().exit()

def setPassword(ok = False, value = None):
	if ok:
		if value == '': value = None
		options.setOption('password', value, True)
		afterExitTasks.append(lambda: reloadScript('A senha foi alterada'))
		get_app().exit()


# Diálogo para definir a senha de acesso do MobyStk
def setPasswordDialog(container, callback = lambda: None):
	# Fecha o diálogo
	def _close(ok = False, value = None):
		setPassword(ok, value)
		container.floats.remove(float)
		callback()

	# Caixa de texto onde digita a senha
	password = TextArea(multiline = False, width = D(preferred = 50))

	# Caixa de diálogo
	dialog = Dialog(
		title = 'Definir uma senha de acesso',
		body = HSplit([
			Label(text = 'Digite a senha (deixe em branco para desativar)'),
			password
		]),
		buttons = [
			Button(
				text = 'OK',
				handler = lambda: _close(True, password.text)
			),
			Button(
				text = 'Cancelar',
				handler = lambda: _close(False)
			),
		]
	)

	float = Float(content = dialog)
	container.floats.append(float)
	get_app().layout.focus(dialog)


# Diálogo de opções do MobyStk
def optionsDialog(container, callback = lambda: None):
	# Fecha o diálogo
	def _close():
		container.floats.remove(float)
		get_app().layout.focus(container)
		callback()
	
	# Executa quando o diálogo de senha é fechado
	def passwordCallback():
		get_app().layout.focus(dialog)

	optionButtons = [
		Button(
			left_symbol = '*',
			right_symbol = '',
			width = 50,
			text = 'Criar/alterar senha de acesso',
			handler = lambda: setPasswordDialog(container, passwordCallback)
		)
	]

	if os.name == 'nt':
		if vgamepadError:
			optionButtons.append(Window(
				content= FormattedTextControl('\nAVISO: O controle virtual está com problemas\n'),
				align = WindowAlign.CENTER
			))

		if not vgamepadInstalled:
			optionButtons.append(Button(
				left_symbol = '*',
				right_symbol = '',
				width = 50,
				text = 'Instalar controle virtual',
				handler = addTaskInstallVgamepad
			))
		else:
			optionButtons.append(Button(
				left_symbol = '*',
				right_symbol = '',
				width = 50,
				text = 'Desinstalar controle virtual',
				handler = addTaskUninstallVgamepad
			))
			optionButtons.append(Button(
				left_symbol = '*',
				right_symbol = '',
				width = 50,
				text = 'Ativar controle virtual' if options.getOption('disableVgamepad') else 'Desativar controle virtual',
				handler = toggleVgamepad
			))

	# Caixa de diálogo
	dialog = Dialog(
		title = 'Opções do MobyStk',
		body = HSplit(optionButtons),
		buttons = [
			Button(text = 'OK', handler = lambda: _close()),
		]
	)

	float = Float(content = dialog)
	container.floats.append(float)
	get_app().layout.focus(dialog)