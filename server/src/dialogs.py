#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import webbrowser
from .helpers import createShortcuts, allowFirewall
from .options import options
from .tasks import afterExitTasks, installVgamepad, reloadScript
from .check_updates import getLatestVersion
from prompt_toolkit.application.current import get_app
from prompt_toolkit.layout.containers import Float, HSplit
from prompt_toolkit.layout.dimension import D
from prompt_toolkit.widgets import Button, Dialog, Label, TextArea


# Instala o controle virtual
def addTaskInstallVgamepad():
    afterExitTasks.append(installVgamepad)
    get_app().exit()


def toggleVgamepad():
    state = options.getOption("disableVgamepad")
    options.setOption("disableVgamepad", not state)
    afterExitTasks.append(lambda: reloadScript("O status do controle virtual foi alterado"))
    get_app().exit()


def setPassword(ok=False, value=None):
    if ok:
        if value == "":
            value = None
        options.setOption("password", value, True)
        afterExitTasks.append(lambda: reloadScript("A senha foi alterada"))
        get_app().exit()


# Diálogo para definir a senha de acesso do MobyStk
def setPasswordDialog(container, callback=lambda: None):
    # Fecha o diálogo
    def _close(ok=False, value=None):
        setPassword(ok, value)
        container.floats.remove(float)
        callback()

    # Caixa de texto onde digita a senha
    password = TextArea(multiline=False, width=D(preferred=50))

    # Caixa de diálogo
    dialog = Dialog(
        title="Definir uma senha de acesso",
        body=HSplit([Label(text="Digite a senha (deixe em branco para desativar)"), password]),
        buttons=[
            Button(text="OK", handler=lambda: _close(True, password.text)),
            Button(text="Cancelar", handler=lambda: _close(False)),
        ],
    )

    float = Float(content=dialog)
    container.floats.append(float)
    get_app().layout.focus(dialog)


# Diálogo de opções do MobyStk
def optionsDialog(container, callback=lambda: None):
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
            left_symbol="*",
            right_symbol="",
            width=50,
            text="Criar/alterar senha de acesso",
            handler=lambda: setPasswordDialog(container, passwordCallback),
        )
    ]

    if os.name == "nt":
        try:
            import vgamepad

            vgamepadError = False
        except:
            vgamepadError = True

        if vgamepadError:
            optionButtons.append(
                Button(
                    left_symbol="*",
                    right_symbol="",
                    width=50,
                    text="Instalar driver de Controle de XBOX",
                    handler=addTaskInstallVgamepad,
                )
            )
        else:
            optionButtons.append(
                Button(
                    left_symbol="*",
                    right_symbol="",
                    width=50,
                    text=(
                        "Ativar Controle de XBOX"
                        if options.getOption("disableVgamepad")
                        else "Desativar Controle de XBOX"
                    ),
                    handler=toggleVgamepad,
                )
            )

        optionButtons.append(
            Button(
                left_symbol="*",
                right_symbol="",
                width=50,
                text=("Criar atalhos"),
                handler=createShortcuts,
            )
        )

        optionButtons.append(
            Button(
                left_symbol="*",
                right_symbol="",
                width=50,
                text=("Liberar o MobyStk no Firewall do Windows"),
                handler=allowFirewall,
            )
        )

    optionButtons.append(
        Button(
            left_symbol="*",
            right_symbol="",
            width=50,
            text=("GitHub do projeto"),
            handler=lambda: webbrowser.open("https://github.com/josejefferson/mobystk"),
        )
    )

    latestVersion, hasUpdate, updateURL = getLatestVersion()
    if hasUpdate:
        optionButtons.insert(
            0,
            Button(
                left_symbol="*",
                right_symbol="",
                width=50,
                text=(f"ATUALIZAR MOBYSTK ({latestVersion})"),
                handler=lambda: webbrowser.open(updateURL),
            ),
        )

    # Caixa de diálogo
    dialog = Dialog(
        title="Opções do MobyStk",
        body=HSplit(optionButtons),
        buttons=[
            Button(text="OK", handler=lambda: _close()),
        ],
    )

    float = Float(content=dialog)
    container.floats.append(float)
    get_app().layout.focus(dialog)
