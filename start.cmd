@echo off
rem Run the site locally and open it in the browser. Double-click or run: start.cmd
cd /d "%~dp0"
if not exist node_modules call npm install || exit /b 1
npm run dev -- --open
