#!/usr/bin/env pwsh
# NOTE: If you encounter PowerShell execution policy errors, you may need to run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "Running pre-commit checks..." -ForegroundColor Cyan
try {
    # Try to run with npx.cmd first
    & npx.cmd lint-staged
} catch {
    # If that fails, try running the eslint command directly
    Write-Host "Falling back to direct eslint command..." -ForegroundColor Yellow
    & eslint "{src,apps,libs,test}/**/*.ts" --fix
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "Pre-commit checks failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Pre-commit checks passed!" -ForegroundColor Green
exit 0
