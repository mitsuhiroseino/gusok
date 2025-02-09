import jsPlugin from '@eslint/js';
import prettierPlugin from 'eslint-config-prettier';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

// lintの設定
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // 対象はsrc,scripts配下のtsファイル
    files: ['src/**/*.ts', 'scripts/**/*.ts'],
    // 念のためにbuildとnode_modules配下を除外
    ignores: ['build/**', 'node_modules/**'],
    languageOptions: {
      // node,jestのグローバル変数を有効
      globals: [globals.node, globals.jest],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  // JavaScript用の設定
  jsPlugin.configs.recommended,
  // TypeScript用の設定
  ...tsPlugin.configs.recommended,
  // prettierと競合するlintを無効にする
  prettierPlugin,
  // コンフィグファイルはlintから除外
  { ignores: ['*.config.{js,mjs,ts}'] },
  {
    rules: {
      noExplicitAny: false,
    },
  },
];
