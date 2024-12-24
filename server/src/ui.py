import threading
from sys import exit
from time import sleep
from colorama import init as coloramaInit, Style as S
from .logo import getTitle
from .tasks import runAfterExitTasks
from .dialogs import optionsDialog
from .helpers import getIPs, getIPContent
from .common import HTTP_PORT, WS_PORT, DEBUG
from prompt_toolkit import ANSI
from prompt_toolkit.application import Application
from prompt_toolkit.application.current import get_app
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.key_binding.bindings.focus import focus_next, focus_previous
from prompt_toolkit.layout import FloatContainer
from prompt_toolkit.layout.containers import Window, HSplit, VSplit, WindowAlign
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.layout.dimension import D
from prompt_toolkit.layout.layout import Layout
from prompt_toolkit.widgets import Button, Label


# Inicializa o colorama
coloramaInit(autoreset=True)


# Endereços IP
ips = []


# Detalhes dos endereços IP e instruções na tela
ipDetails = VSplit([], height=D())


# Aplicação
rootContainer = HSplit(
    [
        Label(text=getTitle(), align=WindowAlign.CENTER),
        ipDetails,
        VSplit(
            [
                Window(content=FormattedTextControl(" Desenvolvido por Jefferson Dantas \n")),
                Button(text="Opções", handler=lambda: optionsDialog(rootContainer)),
                Button(text="Sair", handler=exit),
            ],
            padding=2,
        ),
    ]
)


# Renderiza os detalhes dos endereços IP
def renderIPDetails():
    global ips

    # Verifica se os endereços IP mudaram
    updatedIPs = getIPs()
    if updatedIPs == ips:
        return
    ips = updatedIPs.copy()

    # Prepara as informações de IP e QRCode na interface
    infos = []
    if len(ips) <= 0:
        text = "O seu computador não está conectado a nenhuma rede, por favor conecte-o para utilizar o MobyStk"
        infos.append(Window(content=FormattedTextControl(text), align=WindowAlign.CENTER, wrap_lines=True))
    if len(ips) >= 1:
        infos.append(
            Window(
                content=FormattedTextControl(ANSI(getIPContent(ips[0], HTTP_PORT, WS_PORT, 0))),
                align=WindowAlign.CENTER,
                ignore_content_width=True,
                wrap_lines=True,
            )
        )
    if len(ips) >= 2:
        infos.append(Window(width=1, char="│"))
        infos.append(
            Window(
                content=FormattedTextControl(ANSI(getIPContent(ips[1], HTTP_PORT, WS_PORT, 1))),
                align=WindowAlign.CENTER,
                ignore_content_width=True,
                wrap_lines=True,
            )
        )
    if len(ips) >= 3:
        infos.append(Window(width=1, char="│"))
        infos.append(
            Window(
                content=FormattedTextControl(ANSI(getIPContent(ips[2], HTTP_PORT, WS_PORT, 2))),
                align=WindowAlign.CENTER,
                ignore_content_width=True,
                wrap_lines=True,
            )
        )

    # Atualiza a tela
    ipDetails.children = infos
    if not DEBUG:
        get_app()._on_resize()


renderIPDetails()


# Loop de renderização dos detalhes dos endereços IP
def renderIPDetailsLoop():
    while True:
        sleep(5)
        renderIPDetails()


# Thread de atualização dos detalhes dos endereços IP
renderIPDetailsThread = threading.Thread(target=renderIPDetailsLoop)
renderIPDetailsThread.daemon = True


# Teclas de atalho
kb = KeyBindings()


# Função de saída da aplicação
@kb.add("c-c")
@kb.add("c-w")
@kb.add("c-q")
@kb.add("escape", "f4")
def exit(event):
    get_app().exit()


# Define as teclas de navegação
kb.add("tab")(focus_next)
kb.add("down")(focus_next)
kb.add("right")(focus_next)
kb.add("s-tab")(focus_previous)
kb.add("up")(focus_previous)
kb.add("left")(focus_previous)


def startUI():
    global rootContainer

    # Inicia a aplicação
    if not DEBUG:
        # Aplicação
        renderIPDetailsThread.start()
        rootContainer = FloatContainer(content=rootContainer, floats=[])
        layout = Layout(rootContainer)
        app = Application(layout=layout, key_bindings=kb, mouse_support=True, full_screen=True)
        app.output.show_cursor = lambda: None
        app.run()
        runAfterExitTasks()
    else:
        # Modo Debug
        print(f"{S.BRIGHT}----- Modo DEBUG ativado -----\n")
        for i in range(len(ips)):
            print(getIPContent(ips[i], HTTP_PORT, WS_PORT, i), "\n")
        try:
            while True:
                sleep(1000)
        except KeyboardInterrupt:
            pass
