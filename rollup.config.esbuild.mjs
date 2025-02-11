import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import packagejson from 'rollup-plugin-generate-package-json';

const INPUT = './src/index.ts';
const EXTENTION_CJS = 'js';
const EXTENTION_ESM = 'js';
// node_modules配下のdependenciesはバンドルしない。下記の正規表現の指定をするためには'@rollup/plugin-node-resolve'が必要
const EXTERNAL = [/node_modules/];
const OUTPUT = './build';
const OUTPUT_CJS = path.join(OUTPUT, 'cjs');
const OUTPUT_ESM = OUTPUT;
const TSCONFIG_PATH = path.resolve('tsconfig.json');

// commonjs用とesmodule用のソースを出力する
const config = [
  // esm & typeのビルド
  {
    // エントリーポイント
    input: INPUT,
    output: {
      // 出力先ディレクトリ
      dir: OUTPUT_ESM,
      format: 'es',
      exports: 'named',
      sourcemap: false,
      entryFileNames: `[name].${EXTENTION_ESM}`,
      // バンドルしない(falseだとindex.mjsに纏められてしまう)
      preserveModules: true,
    },
    external: EXTERNAL,
    treeshake: false,
    plugins: [
      nodeResolve(),
      commonjs(),
      esbuild({
        target: 'esnext',
        minify: false,
        loader: 'ts',
        treeShaking: false,
      }),
      // typesのビルド
      typescript({
        tsconfig: TSCONFIG_PATH,
        declaration: true,
        declarationDir: OUTPUT_ESM,
        outDir: OUTPUT_ESM,
      }),
      packagejson({
        baseContents: (pkgjson) => ({
          name: pkgjson.name,
          version: pkgjson.version,
          author: pkgjson.author,
          license: pkgjson.license,
          main: `cjs/index.${EXTENTION_CJS}`,
          module: `index.${EXTENTION_ESM}`,
          types: 'index.d.ts',
        }),
      }),
    ],
  },
  // cjsのビルド
  {
    // エントリーポイント
    input: INPUT,
    output: {
      // 出力先ディレクトリ
      dir: OUTPUT_CJS,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      entryFileNames: `[name].${EXTENTION_CJS}`,
      // バンドルしない(falseだとindex.cjsに纏められてしまう)
      preserveModules: true,
    },
    external: EXTERNAL,
    treeshake: false,
    plugins: [
      nodeResolve(),
      commonjs(),
      esbuild({
        target: 'esnext',
        minify: false,
        loader: 'ts',
        treeShaking: false,
      }),
    ],
  },
];
export default config;
