import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import vitest from 'eslint-plugin-vitest';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ['tests/**'],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  },
  prettier,
];
