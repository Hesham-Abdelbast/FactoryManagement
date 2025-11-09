@echo off
setlocal enabledelayedexpansion

echo Starting Factory System...
echo.

:: Set project paths
set "API_PATH=D:\GithubProjects\FactoryAPI\FactoryAPI"
set "WEB_PATH=D:\GithubProjects\FactoryManagement"

:: Check if directories exist
if not exist "%API_PATH%" (
    echo ERROR: API path not found: %API_PATH%
    pause
    exit /b 1
)

if not exist "%WEB_PATH%" (
    echo ERROR: Web path not found: %WEB_PATH%
    pause
    exit /b 1
)

:: Function to check if a port is in use
:CheckPort
set "port=%1"
netstat -an | find ":%port%" > nul
if errorlevel 1 (
    echo Port %port% is available
) else (
    echo WARNING: Port %port% is already in use!
)
exit /b 0

:: Check required ports
echo Checking required ports...
call :CheckPort 5987
call :CheckPort 6543
echo.

:: Start API in a new window
echo 1. Starting Factory API...
start "Factory API" /D "%API_PATH%" cmd /k "dotnet run --urls "http://localhost:5987""
echo API starting in new window...
timeout /t 8 /nobreak >nul

:: Wait a bit longer for API to initialize
echo Waiting for API to initialize...
timeout /t 5 /nobreak >nul

:: Start Angular app in a new window
echo 2. Starting Web Interface...
start "Factory Web Interface" /D "%WEB_PATH%" cmd /k "ng serve --port=6543 --open"
echo Web interface starting in new window...

echo.
echo ========================================
echo Factory System Startup Complete!
echo.
echo API: http://localhost:5987
echo Web Interface: http://localhost:6543
echo.
echo Both components are running in separate windows.
echo Close all windows to stop the system.
echo ========================================
echo.

:: Keep the main batch file running
echo Main batch file will close now. Components continue running...
timeout /t 3 /nobreak >nul