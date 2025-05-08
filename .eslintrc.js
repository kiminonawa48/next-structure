module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'prettier', // Make sure ESLint plays nice with Prettier
  ],
  rules: {
    // 1. Flag unused variables/imports but don't auto-remove them
    'unused-imports/no-unused-imports': 'warn', // Only warn, don't auto-fix
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // 3. Check errors but don't block build
    '@typescript-eslint/no-explicit-any': 'warn', // Downgrade from error to warning
    'no-console': 'warn', // Warn about console logs but don't fail

    // Basic formatting rules
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    'react/prop-types': 'off', // Not needed when using TypeScript
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'public/', '**/*.d.ts'],
};
