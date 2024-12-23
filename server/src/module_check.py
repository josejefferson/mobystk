from .helpers import clearConsole

modules = [
    "colorama",
    "prompt_toolkit",
    "pyqrcode",
    "pynput",
    "SimpleWebSocketServer",
    "vgamepad",
]

optionalModules = ["vgamepad"]


# Verifica se os módulos necessários do Python estão instalados
def checkModules():
    import importlib

    missingModules = []

    for module in modules:
        try:
            importlib.import_module(module)
        except ModuleNotFoundError:
            missingModules.append(module)
        except Exception as err:
            if module in optionalModules:
                continue
            print(f"(!) Erro ao importar o módulo {module}: {err}")

    if len(missingModules) > 0:
        askInstallModules(missingModules)


# Pergunta ao usuário se deseja instalar os módulos ausentes
def askInstallModules(missingModules):
    clearConsole()
    print("Algumas bibliotecas necessárias para executar esta aplicação estão ausentes")
    print("\nAs seguintes bibliotecas precisam ser instaladas:")
    for module in missingModules:
        print(f"  - {module}")
    input(
        "\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n"
        + "┃ Pressione ENTER para instalar as bibliotecas necessárias... ┃\n"
        + "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n"
    )
    installMissingModules(missingModules)


# Instala os módulos ausentes
def installMissingModules(missingModules):
    import subprocess, sys

    errors = []

    for module in missingModules:
        try:
            print(f'\nInstalando o módulo "{module}"...')
            print(f"$ python -m pip install {module}\n")
            exitCode = subprocess.call([sys.executable, '-m', 'pip', 'install', module])
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
