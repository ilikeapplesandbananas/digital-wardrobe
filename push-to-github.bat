@echo off
echo Pushing Clothes-O-Matic '95 to GitHub...
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Clothes-O-Matic '95 pushed to GitHub successfully!
) else (
    echo.
    echo [INFO] If repository was not found, create an empty repository named 'digital-wardrobe' at https://github.com/new, then run this file again!
)
pause
