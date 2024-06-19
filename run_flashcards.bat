@echo off
cd /d %~dp0\publish
start http://localhost:5000
dotnet FlashcardsApp.dll
pause
