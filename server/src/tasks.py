#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __main__ import __file__ as __mainfile__
import os, re
import subprocess
import importlib.util
from .helpers import clearConsole, getArch
from colorama import Back as B, Fore as F, Style as S

afterExitTasks = []


# Executa funções depois de fechar a aplicação
def runAfterExitTasks():
    clearConsole()
    for task in afterExitTasks:
        task()
    quit()


# Reabre o programa
def reloadScript(message, error=False):
    clearConsole()
    terminalSize = os.get_terminal_size()
    terminalWidth = terminalSize[0]
    terminalHeight = terminalSize[1]

    text = ""
    if message:
        color = F.RED if error else F.GREEN
        text += ((terminalWidth - len(message)) // 2) * " "
        text += S.BRIGHT + color + message + S.RESET_ALL
        text += "\n\n"

    spaces = ((terminalWidth - 36) // 2) * " "
    box = (
        spaces
        + f"┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n"
        + spaces
        + f"┃ •                              • ┃\n"
        + spaces
        + f"┃                                  ┃\n"
        + spaces
        + f"┃    Por favor, feche o MobyStk    ┃\n"
        + spaces
        + f"┃         e abra novamente         ┃\n"
        + spaces
        + f"┃                                  ┃\n"
        + spaces
        + f"┃ •                              • ┃\n"
        + spaces
        + f"┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
    )
    box = re.sub("([\\w,])", S.BRIGHT + F.CYAN + "\\1" + S.RESET_ALL, box)
    box = re.sub("([•])", S.BRIGHT + "\\1" + S.RESET_ALL, box)
    box = re.sub("([┏┛━┗┓┃])", F.YELLOW + "\\1" + S.RESET_ALL, box)
    text += box

    lines = text.split("\n")
    firstLineBreaks = (terminalHeight - len(lines)) // 2
    lastLineBreaks = terminalHeight - firstLineBreaks - len(lines) - 1

    print("\n" * firstLineBreaks, end="")
    for l in lines:
        print(l)
    print("\n" * lastLineBreaks, end="")
    try:
        input()
    except:
        pass
    quit()


# Instala o vgamepad
def installVgamepad():
    print("INSTALAR DRIVER DE CONTROLE DE XBOX")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print("Por padrão, o MobyStk simula um teclado virtual para controlar o jogo.")
    print("Se você deseja usar um controle de XBOX virtual, é necessário instalar o driver.")
    input(
        "\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n"
        + "┃ Pressione ENTER para instalar o driver de controle de XBOX... ┃\n"
        + "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n"
    )
    try:
        spec = importlib.util.find_spec("vgamepad")
        if not spec:
            raise Exception("O módulo vgamepad não está instalado")
        arch = getArch()
        vigemSetupPath = os.path.normpath(
            os.path.join(spec.origin, f"../win/vigem/install/{arch}/ViGEmBusSetup_{arch}.msi")
        )
        exitCode = subprocess.call(["msiexec", "/i", vigemSetupPath])
        if exitCode == 0:
            reloadScript("O controle virtual foi instalado!")
        else:
            raise Exception(f"Comando retornou o código de erro {exitCode}")
    except:
        reloadScript("Falha ao instalar o controle virtual!", True)
