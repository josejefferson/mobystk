#!/bin/bash

PYTHON_CMD=$(command -v python3 || command -v python)

# Função para verificar se o Python está instalado
check_python_installed() {
  echo "Verificando se o Python está instalado..."
  if [ -z "$PYTHON_CMD" ]; then
    echo "(!) O Python não está instalado no sistema."
    echo "Instale o Python e tente novamente."
    echo
    read -p "Pressione ENTER para sair..."
    exit 1
  fi
}

# Função para configurar o ambiente virtual
setup_virtualenv() {
  echo "Configurando o ambiente virtual..."
  
  # Verifica se a pasta "venv" não existe
  if [ ! -d "venv" ]; then
    echo "Criando ambiente virtual..."
    $PYTHON_CMD -m venv venv
    
    # Se houver erro ao criar o ambiente virtual
    if [ $? -ne 0 ]; then
      echo
      echo '(!) Erro ao criar ambiente virtual, verifique se o "python3-venv" está instalado'
      read -p "Pressione ENTER para sair..."
      exit 1
    fi
    activate_virtualenv
  else
    activate_virtualenv
  fi
}

# Função para ativar o ambiente virtual
activate_virtualenv() {
  echo "Ativando ambiente virtual..."
  source venv/bin/activate
  
  # Se houver erro ao ativar o ambiente virtual
  if [ $? -ne 0 ]; then
    echo
    echo '(!) Erro ao ativar o ambiente virtual. Tente apagar a pasta "venv"'
    read -p "Pressione ENTER para sair..."
    exit 1
  fi
}

# Função para executar o script Python
run_python_script() {
  echo "Iniciando o MobyStk..."
  cd server
  python main.py
  
  # Verifica se o script Python foi executado com sucesso
  if [ $? -ne 0 ]; then
    echo
    echo '(!) O MobyStk fechou de forma inesperada'
    echo 'Se houve problemas com a primeira inicialização, instale o "python3-dev"'
    read -p "Pressione ENTER para sair..."
    exit 1
  fi
}

check_python_installed
setup_virtualenv
run_python_script
