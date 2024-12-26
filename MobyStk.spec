# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['server\\main.py'],
    pathex=[],
    binaries=[('venv/Lib/site-packages/vgamepad/win/vigem/client/x64/ViGEmClient.dll', '.'), ('venv/Lib/site-packages/vgamepad/win/vigem/install/x64/ViGEmBusSetup_x64.msi', '.')],
    datas=[('dist', 'dist'), ('package.json', '.')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='MobyStk',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['dist\\img\\icon.ico'],
)
