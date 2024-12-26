import threading
import requests
from time import sleep
from semver import compare
from colorama import Fore as F, Style as S
from .helpers import getVersion
from .common import DEBUG
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.application.current import get_app
from prompt_toolkit import ANSI


latestVersion = None
hasUpdate = False
updateURL = None


def getLatestVersion():
    return latestVersion, hasUpdate, updateURL


def checkUpdates(credits):
    global latestVersion, hasUpdate, updateURL

    try:
        apiURL = "https://api.github.com/repos/josejefferson/mobystk/tags"
        response = requests.get(apiURL)
        data = response.json()
        currentVersion = getVersion()
        currentVersionIsBeta = currentVersion.endswith("-beta")

        latestVersion = data[0]["name"]  # Pode ser beta

        # Encontra a última versão estável
        if not currentVersionIsBeta:
            for release in data:
                if not release["name"].endswith("-beta"):
                    latestVersion = release["name"]
                    break

        result = compare(latestVersion[1:], getVersion())
        if result >= 1:
            updateURL = f"https://github.com/josejefferson/mobystk/releases/tag/{latestVersion}"
            hasUpdate = True
            sleep(2)
            credits.content = FormattedTextControl(
                ANSI(f"{S.BRIGHT}{F.YELLOW} (!) Atualização disponível: {F.GREEN}{latestVersion}{S.RESET_ALL}\n")
            )
            if not DEBUG:
                get_app()._on_resize()
    except:
        pass


# Inicia a thread para verificar atualizações
def startUpdateChecker(credits):
    checkUpdatesThread = threading.Thread(target=lambda: checkUpdates(credits))
    checkUpdatesThread.daemon = True
    checkUpdatesThread.start()
