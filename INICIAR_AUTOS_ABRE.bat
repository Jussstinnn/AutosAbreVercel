@echo off
setlocal EnableExtensions
chcp 65001 >nul
title Autos Abre - Servidor local

cd /d "%~dp0"

echo ============================================================
echo             AUTOS ABRE - INICIO AUTOMATICO
echo ============================================================
echo.
echo Carpeta del proyecto:
echo %CD%
echo.

if not exist "package.json" (
    echo [ERROR] No se encontro package.json.
    echo Este archivo debe estar en la raiz del proyecto.
    echo.
    pause
    exit /b 1
)

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH.
    echo Instale Node.js LTS y vuelva a intentarlo.
    echo.
    pause
    exit /b 1
)

echo Node:
node -v
echo.

if exist "node_modules\.bin\vite.cmd" goto START_APP

echo Las dependencias todavia no estan instaladas.
echo Preparando PNPM mediante Corepack...

where corepack >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Corepack no esta disponible.
    echo Reinstale Node.js LTS desde nodejs.org.
    echo.
    pause
    exit /b 1
)

call corepack enable >nul 2>&1
call corepack prepare pnpm@10.15.1 --activate
if errorlevel 1 (
    echo.
    echo No se pudo activar PNPM 10.15.1. Intentando la version disponible...
    call corepack prepare pnpm@latest --activate
)

if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo preparar PNPM.
    echo Revise la conexion a Internet y vuelva a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

echo.
echo Instalando dependencias. La primera vez puede tardar varios minutos...
call corepack pnpm install --no-frozen-lockfile
if errorlevel 1 (
    echo.
    echo [ERROR] La instalacion no pudo completarse.
    echo Revise la conexion a Internet y vuelva a intentarlo.
    echo.
    pause
    exit /b 1
)

:START_APP
echo.
echo ============================================================
echo Proyecto listo.
echo Se abrira automaticamente en http://localhost:5173/
echo Para detenerlo, presione Ctrl + C en esta ventana.
echo ============================================================
echo.

call corepack pnpm run dev -- --host 127.0.0.1 --port 5173 --open

if errorlevel 1 (
    echo.
    echo [ERROR] El servidor no pudo iniciarse.
    echo Verifique que el puerto 5173 no este ocupado.
    echo.
    pause
    exit /b 1
)

echo.
echo El servidor se detuvo.
pause
endlocal
