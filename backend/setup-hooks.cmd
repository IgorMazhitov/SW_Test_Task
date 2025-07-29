@echo off
echo Setting up ESLint Git hooks...

REM Set proper Git hooks path
git config core.hooksPath .husky

REM Make all hook files executable
icacls .husky\pre-commit /grant Everyone:F
icacls .husky\pre-commit.ps1 /grant Everyone:F
icacls .husky\pre-commit.bat /grant Everyone:F

REM Create git hooks folder if it doesn't exist
if not exist .git\hooks mkdir .git\hooks

REM Create a symbolic link to our pre-commit hook (requires admin)
mklink .git\hooks\pre-commit %CD%\.husky\pre-commit.bat 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Could not create symbolic link. Try running this script as administrator.
  copy .husky\pre-commit.bat .git\hooks\pre-commit
)

echo Setup complete!
echo.
echo If you encounter issues with PowerShell execution policy, run this command in PowerShell:
echo Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
echo.

exit /b 0
