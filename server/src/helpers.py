#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys
import socket


# QR Code (bit.ly/3dpXMa9)
def qrCode(url):
    import pyqrcode

    def halfChar(a, b):
        halfMatrix = {("0", "0"): "█", ("1", "1"): " ", ("1", "0"): "▄", ("0", "1"): "▀"}
        return halfMatrix[(a, b)]

    lines = pyqrcode.create(url).text().split("\n")[3:-4]
    lines = list(map(lambda l: l[3:-3], lines))

    i = 0
    result = ""
    while i < len(lines):
        line1 = lines[i]
        i += 1
        if i == len(lines):
            result += "▀" * len(lines[0])
        else:
            line2 = lines[i]
            if line2 < line1:
                line2 += "1" * len(line1)
            i += 1
            result += "".join(map(halfChar, list(line1), list(line2))) + "\n"
    return result.strip("\n")


# Obtém os IPs do computador
def getIPs():
    # Verifica se o módulo netifaces está instalado (para obter os IPs no Linux)
    try:
        import netifaces
    except:
        pass

    ips = []

    # Se o módulo netifaces estiver instalado, obter os IPs através dele
    if "netifaces" in locals():
        for interface in netifaces.interfaces():
            ifAddresses = netifaces.ifaddresses(interface)
            if netifaces.AF_INET in ifAddresses:
                for address in ifAddresses[netifaces.AF_INET]:
                    ips.append(address["addr"])

    # Caso contrário, obter os IPs através do socket
    else:
        ips = socket.gethostbyname_ex(socket.gethostname())[-1]

    # Remove IPs desnecessários
    if "192.168.137.1" in ips:
        ips.insert(0, ips.pop(ips.index("192.168.137.1")))
    if "192.168.56.1" in ips:
        ips.remove("192.168.56.1")
    if "127.0.0.1" in ips:
        ips.remove("127.0.0.1")
    if "127.0.1.1" in ips:
        ips.remove("127.0.1.1")

    return ips


# Retorna um texto de ajuda e o QRCode
def getIPContent(ip, httpPort, wsPort, i):
    from colorama import Fore as F, Style as S

    text = ""
    if ip == "192.168.137.1":
        text += "Conecte ao Wi-Fi do seu PC e acesse no navegador"
    elif i >= 1:
        text += "Caso não funcione, tente acessar"
    else:
        text += "Entre no navegador e acesse"

    BRIGHT = S.BRIGHT if i == 0 else ""

    text += f"\n{BRIGHT}{F.GREEN}http://{ip}:{httpPort}{S.RESET_ALL}\n\n"
    text += f"Digite este código no site\n"
    text += f"{BRIGHT}{ip}:{wsPort}{S.RESET_ALL}\n\n"
    text += BRIGHT + qrCode(f"http://{ip}:{httpPort}")

    return text


# Limpa o console
def clearConsole():
    command = "clear"
    if os.name in ("nt", "dos"):
        command = "cls"
    os.system(command)


# Classe de fallback
class Fallback:
    def __getattr__(self, name):
        return None


# Obtém a arquitetura do sistema
def getArch():
    import platform

    archstr = platform.machine()
    if archstr.endswith("64"):
        arch = "x64"
    elif archstr.endswith("86"):
        arch = "x86"
    else:
        if platform.architecture()[0] == "64bit":
            arch = "x64"
        else:
            arch = "x86"

    return arch or "x86"


# Cria atalhos na área de trabalho e menu iniciar
def createShortcuts():
    import subprocess

    # Verifica se o script está sendo executado em um executável PyInstaller
    if getattr(sys, "frozen", False):
        rootDir = os.path.dirname(sys.executable)
        startExecutable = sys.executable
        iconPath = f"{sys.executable},0"
    else:
        currentDir = os.getcwd()  # Diretório atual é "dist"
        rootDir = os.path.abspath(os.path.join(currentDir, ".."))
        startExecutable = f"{rootDir}\\INICIAR.bat"
        iconPath = f"{currentDir}\\img\\icon.ico"

    desktopShortcutCommand = [
        "powershell",
        "-Command",
        (
            "$desktop = [System.Environment]::GetFolderPath('Desktop');"
            "$s = (New-Object -COM WScript.Shell).CreateShortcut($desktop + '\\MobyStk.lnk');"
            f"$s.TargetPath = '{startExecutable}';"
            f"$s.WorkingDirectory = '{rootDir}';"
            f"$s.Description = 'Use seu smartphone como controle de videogame para PC';"
            f"$s.IconLocation = '{iconPath}';"
            "$s.Save();"
        ),
    ]

    subprocess.call(desktopShortcutCommand)

    startMenuShortcutCommand = [
        "powershell",
        "-Command",
        (
            "$startMenu = [System.Environment]::GetFolderPath('StartMenu');"
            "$s = (New-Object -COM WScript.Shell).CreateShortcut($startMenu + '\\MobyStk.lnk');"
            f"$s.TargetPath = '{startExecutable}';"
            f"$s.WorkingDirectory = '{rootDir}';"
            f"$s.IconLocation = '{iconPath}';"
            "$s.Save();"
        ),
    ]

    subprocess.call(startMenuShortcutCommand)


# Obtém a versão do aplicativo
def getVersion():
    try:
        packageJson1 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../package.json"))  # Python
        packageJson2 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../package.json"))  # PyInstaller
        packageJson = packageJson1 if os.path.isfile(packageJson1) else packageJson2

        with open(packageJson, "r") as f:
            import json

            content = json.load(f)
            return content["version"]
    except:
        return "0.0.0"
