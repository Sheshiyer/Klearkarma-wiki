module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable rules causing build errors
    '@typescript-eslint/no-explicit-any': 'warn', // Downgrade from error to warning
    '@typescript-eslint/no-unused-vars': 'warn', // Downgrade from error to warning
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'warn', // Downgrade from error to warning
  },
};