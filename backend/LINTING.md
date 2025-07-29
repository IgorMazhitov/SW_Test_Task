# ESLint Pre-commit Hooks

This project uses ESLint to enforce code quality standards and Husky + lint-staged to run these checks automatically on each commit.

## ESLint Configuration

The ESLint configuration in `.eslintrc.js` includes:

- Complexity checks (limits on cyclomatic complexity and nesting depth)
- Prevention of magic numbers
- Strict naming conventions (camelCase for variables and functions)
- Standard TypeScript best practices

## Pre-commit Hook

On each commit, the following will happen automatically:

1. Only staged files with `.js` or `.ts` extensions will be checked
2. ESLint will run on these files with the `--fix` flag to automatically fix minor issues
3. If ESLint reports errors that can't be automatically fixed, the commit will be rejected

## How to Skip the Pre-commit Hook

In rare cases, you may need to skip the hook:

```bash
git commit -m "Your message" --no-verify
```

However, this is discouraged as it bypasses the quality checks.

## Manual Linting

You can run the linting process manually:

```bash
npm run lint
```

This will check and fix all files in the project.

## Note on Magic Numbers

"Magic numbers" are numeric literals that appear in code without explanation. For example:

```typescript
// Bad: Magic number
if (status === 200) { ... }

// Good: Use named constant
const HTTP_OK = 200;
if (status === HTTP_OK) { ... }
```

The ESLint configuration will flag these as errors to encourage more readable code.
