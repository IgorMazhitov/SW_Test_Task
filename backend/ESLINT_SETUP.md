# ESLint & Git Hooks Setup

This project uses ESLint to enforce code quality and Git hooks to automatically check code before commits.

## Installation

All dependencies are already installed in package.json. If for some reason you need to reinstall:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin husky lint-staged
```

## Configuration

The project contains several important files:

- `.eslintrc.js` - ESLint rules configuration
- `.lintstagedrc` - Defines which files to lint during commit
- `.husky/pre-commit` - Git hook that runs before each commit

## Setting up Git hooks

On Windows, run as Administrator:

```bash
setup-hooks.cmd
```

This will configure Git to use the hooks in this project.

## Manual Linting

You can manually run the linter with:

```bash
# Check all files
npm run lint

# Check only staged files
npm run lint:staged
```

## PowerShell Execution Policy

If you encounter PowerShell execution policy errors, open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Troubleshooting

For detailed troubleshooting steps, see the [LINTING_TROUBLESHOOTING.md](./LINTING_TROUBLESHOOTING.md) file.
