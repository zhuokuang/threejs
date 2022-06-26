module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  globals: {
    THREE: true,
  },
  rules: {
    'eol-last': 'warn',
    quotes: ['warn', 'single'],
    indent: ['warn', 2],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'prefer-const': 'warn',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'no-var': 'warn',
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'max-params': ['error', 3],
    'no-trailing-spaces': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'max-len': ['error', { code: 120 }],
  },
};
