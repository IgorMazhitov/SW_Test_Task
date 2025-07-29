@echo off
echo Running pre-commit checks...
npx lint-staged
if %ERRORLEVEL% NEQ 0 (
  echo Pre-commit checks failed!
  exit /b 1
)
echo Pre-commit checks passed!
exit /b 0
