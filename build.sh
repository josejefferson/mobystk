#!/bin/bash

PYTHON_CMD=$(command -v python3 || command -v python)

# Configura o ambiente virtual
if [ ! -d "venv" ]; then
  $PYTHON_CMD -m venv venv
  if [ $? -ne 0 ]; then
    exit 1
  fi
  source venv/bin/activate
  pip install -r requirements.txt
  pip install netifaces==0.11.0
else
  source venv/bin/activate
fi

# Executa o build do PyInstaller
pyinstaller \
  server/main.py \
  --onefile \
  --add-data "dist:dist" \
  --add-data "package.json:." \
  --distpath bin \
  --name "MobyStk"
