module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-refresh', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    quotes: ['warn', 'single', 'double'],
    semi: ['warn', 'always'],
    'no-console': 1,
  },
};

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2020: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//     'plugin:@typescript-eslint/recommended', // Add TypeScript plugin
//     'plugin:@typescript-eslint/recommended-requiring-type-checking', // Enable rules requiring type information
//     'prettier', // Add prettier for code formatting (optional)
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser', // Specify the parser for TypeScript
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//     tsconfigRootDir: __dirname, // Point to the root directory
//     project: ['./tsconfig.json'], // Specify the TypeScript project file
//   },
//   settings: {
//     react: {
//       version: '18.2',
//     },
//   },
//   plugins: [
//     'react',
//     'react-refresh',
//     'react-hooks',
//     '@typescript-eslint', // Add the TypeScript plugin
//   ],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//     'react/prop-types': 'off',
//     'no-unused-vars': 'warn',
//     'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
//     'react/react-in-jsx-scope': 'off',
//     '@typescript-eslint/no-unused-vars': 'warn',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off', // Adjust as needed
//     quotes: ['warn', 'single', { avoidEscape: true }],
//     semi: ['warn', 'always'],
//     'no-console': 1,
//   },
// };
