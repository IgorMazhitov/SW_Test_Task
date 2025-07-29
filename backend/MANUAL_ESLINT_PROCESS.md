# Manual ESLint Process

If you prefer not to use automated scripts or PowerShell script execution, follow this simple manual process to ensure code quality.

## Pre-Commit Checklist

Before committing your changes, follow these steps:

1. Run ESLint on your changed files:
   ```
   npm run lint:changed
   ```
   Or use the batch file:
   ```
   check-eslint.bat
   ```

2. If working on specific modules, use the targeted scripts:
   ```
   npm run lint:auth    (for auth module)
   npm run lint:users   (for users module)
   npm run lint:roles   (for roles module)
   npm run lint:messages (for messages module)
   npm run lint:actions (for actions module)
   npm run lint:audit   (for audit module)
   ```

3. Fix any ESLint errors reported before committing

4. Verify that your code follows these specific rules:
   - No nested loops
   - No nested conditionals deeper than 3 levels
   - No magic numbers (use constants)
   - All variables in camelCase

## ESLint Rules Reference

Our ESLint configuration checks for:

1. **Complexity**: Maximum cyclomatic complexity of 10
2. **Nesting**: Maximum block nesting depth of 3
3. **Magic Numbers**: Numbers should be assigned to named constants
4. **Naming Convention**: Variables must use camelCase

## Common ESLint Errors and How to Fix Them

### Nested Loops
```typescript
// Bad
for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < items[i].length; j++) {
    // ...
  }
}

// Good
const processNestedItem = (subItems) => {
  for (let j = 0; j < subItems.length; j++) {
    // ...
  }
};

for (let i = 0; i < items.length; i++) {
  processNestedItem(items[i]);
}
```

### Magic Numbers
```typescript
// Bad
if (status === 200) { ... }

// Good
const HTTP_OK = 200;
if (status === HTTP_OK) { ... }
```

### Naming Conventions
```typescript
// Bad
const user_name = 'John';

// Good
const userName = 'John';
```
