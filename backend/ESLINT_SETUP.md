# ESLint Setup Without Scripts

This project uses ESLint to enforce code quality. This setup guide provides options that don't require PowerShell scripts or changing security settings.

## No-Script Approach

If you prefer not to enable script execution in PowerShell (which is a reasonable security choice), you can use these alternatives:

### Option 1: NPM Scripts for Different Modules

Run ESLint on specific modules:

```bash
# Check auth module
npm run lint:auth

# Check users module
npm run lint:users

# Check roles module
npm run lint:roles

# Check messages module
npm run lint:messages

# Check actions module
npm run lint:actions

# Check audit module
npm run lint:audit
```

### Option 2: Batch Files

We've included simple batch files that don't require PowerShell script execution:

```
# Check the file you're currently working on
check-file.bat src/application/modules/auth/auth.service.ts

# Check all changed files in git
check-eslint.bat
```

### Option 3: Manual Process

For a fully manual process:

1. Run ESLint on all files:
   ```
   npm run lint
   ```

2. See the `MANUAL_ESLINT_PROCESS.md` document for a complete checklist

## ESLint Rules

Our ESLint configuration checks for:

1. **Complexity**: No nested loops, max complexity of 10
2. **Nesting**: No deeply nested if statements (max depth: 3)
3. **Magic Numbers**: All numbers should be named constants
4. **Naming**: Variables must use camelCase

## Troubleshooting

For detailed troubleshooting steps, see the [LINTING_TROUBLESHOOTING.md](./LINTING_TROUBLESHOOTING.md) file.
