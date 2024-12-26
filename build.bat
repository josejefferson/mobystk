@echo off

:: Verifica se está dentro de um ambiente virtual
python -c "import sys; print(hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix))" | findstr "True" >nul
if %errorlevel% == 0 (
  goto build
)

:: Verifica se a pasta 'venv' existe
if not exist "venv" (
  :: Cria o ambiente virtual
  python -m venv venv
  
  :: Ativa o ambiente virtual
  call venv\Scripts\activate
  
  :: Instala as dependências
  pip install -r requirements.txt
) else (
  :: Ativa o ambiente virtual
  call venv\Scripts\activate
)

:: Executa o build do PyInstaller
:build
pyinstaller ^
  server/main.py ^
  --onefile ^
  --add-data "dist:dist" ^
  --add-data "package.json:." ^
  --add-binary="venv/Lib/site-packages/vgamepad/win/vigem/client/x64/ViGEmClient.dll:." ^
  --add-binary="venv/Lib/site-packages/vgamepad/win/vigem/install/x64/ViGEmBusSetup_x64.msi:." ^
  --icon=dist/img/icon.ico ^
  --distpath bin ^
  --name "MobyStk"
