@echo off
start cmd /c "python appu.py"
 /t 5 /nobreak > NUL
start http://127.0.0.1:5000