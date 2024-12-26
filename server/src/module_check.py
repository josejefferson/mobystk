import os
import subprocess
import sys
import importlib
from .helpers import clearConsole
from .logo import printLogo

DEBUG = "--debug" in sys.argv

# Módulos necessários para o funcionamento do MobyStk
modules = [
    ("colorama", "0.4.6"),
    ("jsonschema", "4.23.0"),
    ("prompt_toolkit", "3.0.48"),
    ("pyqrcode", "1.2.1"),
    ("pynput", "1.7.7"),
    ("requests", "2.32.3"),
    ("semver", "3.0.2"),
    ("SimpleWebSocketServer", "0.1.2"),
    ("vgamepad", "0.1.0"),
]

# Adiciona módulos específicos para o sistema operacional Linux
if os.name == "posix":
    modules.append(("netifaces", "0.11.0"))

# Módulos opcionais
optionalModules = ["vgamepad"]


# Verifica se os módulos necessários do Python estão instalados
def checkModules():

    missingModules = []

    for module, version in modules:
        try:
            importlib.import_module(module)
        except ModuleNotFoundError:
            missingModules.append((module, version))
        except Exception as err:
            # Ignora os módulos opcionais se não estiver em modo de depuração
            if not DEBUG and module in optionalModules:
                continue
            print(f"(!) Erro ao importar o módulo {module}: {err}")

    if len(missingModules) > 0:
        if DEBUG:
            askInstallModules(missingModules)
        else:
            prepareFirstRun(missingModules)


# Pergunta ao usuário se deseja instalar os módulos ausentes
def askInstallModules(missingModules):
    clearConsole()
    print("Algumas bibliotecas necessárias para executar esta aplicação estão ausentes")
    print("\nAs seguintes bibliotecas precisam ser instaladas:")
    for module, version in missingModules:
        print(f"  - {module} (v{version})")
    input(
        "\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n"
        + "┃ Pressione ENTER para instalar as bibliotecas necessárias... ┃\n"
        + "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n"
    )
    installMissingModules(missingModules)


# Instala os módulos ausentes automaticamente
def prepareFirstRun(missingModules):
    printLogo(
        "Preparando o MobyStk para o primeiro uso\n"
        + "Por favor, aguarde...\n\n"
        + "Não feche a aplicação ou desconecte a internet"
    )
    installMissingModules(missingModules)


# Instala os módulos ausentes
def installMissingModules(missingModules):
    errors = []

    for module, version in missingModules:
        try:
            if DEBUG:
                print(f'\nInstalando o módulo "{module}"...')
                print(f"$ python -m pip install {module}=={version}\n")
            exitCode = subprocess.call(
                [sys.executable, "-m", "pip", "install", f"{module}=={version}"],
                stdout=subprocess.DEVNULL if not DEBUG else None,
                stderr=subprocess.DEVNULL if not DEBUG else None,
            )
            if exitCode != 0:
                raise Exception(f"O comando retornou o código de saída {exitCode}")
        except Exception as err:
            errors.append(err)
            if DEBUG:
                print(f'\n(!) Erro ao instalar o módulo "{module}": {err}')

    if len(errors) > 0:
        errorWhenInstallingModules()

    printLogo()


# Exibe uma mensagem de erro ao instalar os módulos
def errorWhenInstallingModules():
    if DEBUG:
        print("\n(!) A instalação de alguns módulos falhou, deseja continuar?")
        input("Pressione ENTER para continuar...")
    else:
        printLogo(
            "Ocorreu um erro ao preparar o MobyStk\n"
            + "Verifique sua conexão com a internet\n\n"
            + "Pressione ENTER para continuar..."
        )
        input()
