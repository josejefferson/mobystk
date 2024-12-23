import os
from .helpers import clearConsole


# Mostra a tela de abertura do programa
def printLogo():
    logo = """
  ▄▄▄▄███▄▄▄▄    ▄██████▄  ▀█████████▄  ▄██   ▄      ▄████████     ███        ▄█   ▄█▄ 
▄██▀▀▀███▀▀▀██▄ ███    ███   ███    ███ ███   ██▄   ███    ███ ▀█████████▄   ███ ▄███▀ 
███   ███   ███ ███    ███   ███    ███ ███▄▄▄███   ███    █▀     ▀███▀▀██   ███▐██▀   
███   ███   ███ ███    ███  ▄███▄▄▄██▀  ▀▀▀▀▀▀███   ███            ███   ▀  ▄█████▀    
███   ███   ███ ███    ███ ▀▀███▀▀▀██▄  ▄██   ███ ▀███████████     ███     ▀▀█████▄    
███   ███   ███ ███    ███   ███    ██▄ ███   ███          ███     ███       ███▐██▄   
███   ███   ███ ███    ███   ███    ███ ███   ███    ▄█    ███     ███       ███ ▀███▄ 
  ▀█   ███   █▀   ▀██████▀  ▄█████████▀   ▀█████▀   ▄████████▀     ▄████▀     ███   ▀█▀ 
                                                                              ▀         
Iniciando...""".strip(
        "\n"
    )

    terminalSize = os.get_terminal_size()
    terminalWidth = terminalSize[0] - 1
    terminalHeight = terminalSize[1]

    lines = logo.split("\n")

    if terminalWidth < len(max(lines, key=len)):
        lines = list(map(lambda l: l[0:terminalWidth], lines))

    lines = list(map(lambda l: l.center(terminalWidth), lines))
    firstLineBreaks = (terminalHeight - len(lines)) // 2
    lastLineBreaks = terminalHeight - firstLineBreaks - len(lines) - 1

    clearConsole()
    print("\n" * firstLineBreaks, end="")

    for l in lines:
        print(l)

    print("\n" * lastLineBreaks, end="")


# Retorna o título colorido "MobyStk"
def getTitle():
    from prompt_toolkit import ANSI
    from colorama import Fore as F, Style as S

    return ANSI(
        f"""
{S.BRIGHT}{F.YELLOW}╔╦╗{F.GREEN}┌─┐{F.CYAN}┌┐ {F.WHITE}┬ ┬{F.YELLOW}╔═╗{F.GREEN}┌┬┐{F.CYAN}┬┌─{S.RESET_ALL}
{S.BRIGHT}{F.YELLOW}║║║{F.GREEN}│ │{F.CYAN}├┴┐{F.WHITE}└┬┘{F.YELLOW}╚═╗{F.GREEN} │ {F.CYAN}├┴┐{S.RESET_ALL}
{S.BRIGHT}{F.YELLOW}╩ ╩{F.GREEN}└─┘{F.CYAN}└─┘{F.WHITE} ┴ {F.YELLOW}╚═╝{F.GREEN} ┴ {F.CYAN}┴ ┴{S.RESET_ALL}
""".strip()
    )
