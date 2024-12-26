import subprocess
import sys
import importlib
from .helpers import clearConsole

modules = (
    ("colorama", "0.4.6"),
    ("prompt_toolkit", "3.0.48"),
    ("pyqrcode", "1.2.1"),
    ("pynput", "1.7.7"),
    ("requests", "2.32.3"),
    ("semver", "3.0.2"),
    ("SimpleWebSocketServer", "0.1.2"),
    ("vgamepad", "0.1.0"),
)

optionalModules = "vgamepad"


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
            if "--debug" not in sys.argv and module in optionalModules:
                continue
            print(f"(!) Erro ao importar o módulo {module}: {err}")

    if len(missingModules) > 0:
        askInstallModules(missingModules)


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


# Instala os módulos ausentes
def installMissingModules(missingModules):
    errors = []

    for module, version in missingModules:
        try:
            print(f'\nInstalando o módulo "{module}"...')
            print(f"$ python -m pip install {module}=={version}\n")
            exitCode = subprocess.call([sys.executable, "-m", "pip", "install", f"{module}=={version}"])
            if exitCode != 0:
                raise Exception(f"O comando retornou o código de saída {exitCode}")
        except Exception as err:
            errors.append(err)
            print(f'\n(!) Erro ao instalar o módulo "{module}": {err}')

    if len(errors) > 0:
        errorWhenInstallingModules()


# Exibe uma mensagem de erro ao instalar os módulos
def errorWhenInstallingModules():
    print("\n(!) A instalação de alguns módulos falhou, deseja continuar?")
    input("Pressione ENTER para continuar...")
