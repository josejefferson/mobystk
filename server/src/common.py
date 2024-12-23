import sys

DEBUG = "--debug" in sys.argv  # Se True, mostrará logs
HTTP_PORT = 8877  # Porta do servidor HTTP
WS_PORT = 5000  # Porta do servidor WebSocket

from pynput.keyboard import Controller

# Inicializa o teclado
keyboard = Controller()


from .gamepad import Gamepad

# Inicializa os gamepads virtuais
gamepads = [
    Gamepad(0),
    Gamepad(1),
    Gamepad(2),
    Gamepad(3),
]
