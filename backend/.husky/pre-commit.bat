@echo off
echo Running pre-commit hooks...
cd /d %~dp0\..

REM Try npx first
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  npx lint-staged
  goto :check_result
)

REM Try npx.cmd as fallback
where npx.cmd >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  npx.cmd lint-staged
  goto :check_result
)

REM Direct ESLint as last resort
where eslint >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  eslint "src/**/*.{js,ts}" --fix
  goto :check_result
)

echo Could not find linting tools. Please install them with: npm install
exit /b 1

:check_result
if %ERRORLEVEL% NEQ 0 (
  echo Pre-commit checks failed!
  exit /b 1
)
echo Pre-commit checks passed!
exit /b 0
