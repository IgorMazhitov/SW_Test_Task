module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Complexity rules
    'complexity': ['error', { 'max': 10 }], // Limits cyclomatic complexity
    'max-depth': ['error', { 'max': 3 }], // Prevents deeply nested blocks (including loops and ifs)
    'max-nested-callbacks': ['error', { 'max': 3 }], // Prevents deeply nested callbacks
    'max-statements-per-line': ['error', { 'max': 1 }],
    
    // No magic numbers
    'no-magic-numbers': ['error', { 
      'ignore': [-1, 0, 1], // Common values that aren't "magic"
      'ignoreArrayIndexes': true,
      'enforceConst': true,
      'detectObjects': false
    }],
    
    // Variable naming conventions
    'camelcase': ['error', { 'properties': 'always' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': 'function',
        'format': ['camelCase']
      },
      {
        'selector': 'class',
        'format': ['PascalCase']
      },
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I']
      }
    ],
  },
};
