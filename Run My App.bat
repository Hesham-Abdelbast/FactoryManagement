@echo off
echo Starting Factory System...
echo.

:: Start API first
echo 1. Starting Factory API...
start "API" "D:\Publish\Factory\FactoryAPI.exe"
timeout /t 5 >nul

:: Start Angular app
echo 2. Starting Web Interface...
cd /d "D:\GithubProjects\FactoryManagement"
call ng serve --port=6543 --open

pause