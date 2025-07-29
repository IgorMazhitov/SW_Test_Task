# ESLint & Git Hooks Troubleshooting Guide

## Checking if ESLint is Working Properly

You can manually run ESLint to check if it's working:

```bash
# Check and fix all files
npm run lint

# Check only staged files (what would run during pre-commit)
npm run lint:staged
```

## Troubleshooting Git Hooks

If pre-commit hooks aren't running, try these steps:

### 1. Check Git Hooks Path

```bash
git config --get core.hooksPath
```

It should show `.husky`. If not, set it:

```bash
git config core.hooksPath .husky
```

### 2. Ensure Hook Files are Executable

On Windows, run:

```powershell
icacls .husky\pre-commit /grant Everyone:F
```

### 3. Run Hooks Manually

```bash
# On Windows CMD
run-lint.cmd

# On PowerShell
.\run-lint.ps1
```

### 4. Verify Husky Installation

```bash
npm list husky
npm list lint-staged
```

### 5. Check for Common Errors

- Node.js version compatibility
- Path issues (spaces or special characters in file paths)
- Permission problems

## Windows-Specific Issues

On Windows, Git hooks can sometimes fail due to:

1. **Line ending issues**: Ensure your Git is configured to handle line endings correctly
2. **Path length limitations**: Try using shorter paths if you encounter issues
3. **PowerShell execution policy**: You need to set your execution policy to allow running scripts:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   Without this, you'll see errors like "cannot be loaded because running scripts is disabled"

If you continue experiencing issues, you can temporarily bypass hooks with:

```bash
git commit --no-verify -m "Your commit message"
```

But this should only be done as a last resort, as it bypasses all quality checks.
