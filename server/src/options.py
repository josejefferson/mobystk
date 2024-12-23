#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import hashlib
from __main__ import __file__ as __mainfile__


class Options:
    def __init__(self, opt):
        if "password" not in opt:
            opt["password"] = None
        if "disableVgamepad" not in opt:
            opt["disableVgamepad"] = False
        self.options = opt

    def getOption(self, name):
        """
        Retorna o valor da opção

        :param name: Nome da opção
        """
        return self.options[name]

    def setOption(self, name, value, hash=False):
        """
        Define o valor da opção

        :param name: Nome da opção
        :param value: Valor da opção
        :param hash: Se True, o valor será criptografado
        """
        if hash and value:
            value = hashlib.md5(value.encode("utf8")).hexdigest()
            self.options[name] = value
        else:
            self.options[name] = value

        self.saveOptions()
        return value

    def saveOptions(self):
        """
        Salva as opções no arquivo JSON
        """
        j = json.dumps(self.options, indent=4)
        f = open("../options.json", "w")
        f.write(j)
        f.close()

    def checkPassword(self, password):
        """
        Verifica se a senha está correta

        :param password: Senha a ser verificada
        """
        password = hashlib.md5(password.encode("utf8")).hexdigest()
        return self.options["password"] == password


try:
    path = os.path.join(os.path.dirname(__mainfile__), "options.json")
    file = open(path)
    opts = json.load(file)
except Exception as err:
    opts = json.loads("{}")

options = Options(opts)
