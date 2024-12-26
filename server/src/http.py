from .common import HTTP_PORT
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import threading


class HTTPServer(ThreadingHTTPServer):
    def __init__(self):
        super().__init__(("", HTTP_PORT), HTTPServer.RequestHandler)

    def start(self):
        """
        Inicia o servidor HTTP
        """
        self.serve_forever()

    def handle_error(self, request, client_address):
        """
        Ignora os erros do servidor HTTP
        """
        return

    class RequestHandler(SimpleHTTPRequestHandler):
        """
        RequestHandler para o servidor HTTP com cache e logs desativados
        """

        def end_headers(self):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            SimpleHTTPRequestHandler.end_headers(self)

        def log_message(self, format, *args):
            return


# Inicia o servidor HTTP
def startHTTPServer():
    # Define o diretório onde estão localizados os arquivos que serão servidos
    dist1 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../dist")) # Python
    dist2 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../dist")) # PyInstaller
    dist = dist1 if os.path.isdir(dist1) else dist2
    os.chdir(dist)

    # Inicia o servidor HTTP
    httpServer = HTTPServer()
    httpThread = threading.Thread(target=httpServer.start)
    httpThread.daemon = True
    httpThread.start()
