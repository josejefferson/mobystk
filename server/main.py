#!/usr/bin/env python
# -*- coding: utf-8 -*-

from src.logo import printLogo
from src.module_check import checkModules

# Mostra a tela de abertura do programa
printLogo()

# Verifica se os módulos necessários do Python estão instalados
checkModules()


from src.http import startHTTPServer
from src.websocket import startWebSocketServer

# Inicia os servidores HTTP e WebSocket
startHTTPServer()
startWebSocketServer()


from src.ui import startUI

# Inicia a interface de usuário
startUI()
