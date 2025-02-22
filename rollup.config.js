import packagejson from '@gusok/rollup-create-dist-packagejson';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import CleanCSS from 'clean-css';
import path from 'path';
import sass from 'rollup-plugin-sass';

const INPUT = './src/index.ts';
const EXTENTIONS = ['.ts', '.tsx', '.js', '.jsx'];
const EXTENTION_ESM = '.js';
const EXTENTION_CJS = '.cjs';
// node_modules配下のdependenciesはバンドルしない。下記の正規表現の指定をするためには'@rollup/plugin-node-resolve'が必要
const EXTERNAL = [/[\\/]node_modules[\\/]/, /[\\/]dist[\\/]/];
const OUTPUT = './dist';
const OUTPUT_ESM = OUTPUT;
const OUTPUT_CJS_DIR = 'cjs';
const OUTPUT_CJS = path.join(OUTPUT, OUTPUT_CJS_DIR);
const BABEL_CONFIG_PATH = path.resolve('babel.config.js');
const TSCONFIG_PATH = path.resolve('tsconfig.json');

// esmodule用とcommonjs用のソースを出力する
const options = [
  // esm、型定義、package.json
  _createOptions(INPUT, OUTPUT_ESM, 'es', EXTENTION_ESM, {
    declaration: true,
    plugins: [
      packagejson({
        content: {
          type: 'module',
          main: `${OUTPUT_CJS_DIR}/index${EXTENTION_CJS}`,
          module: `index${EXTENTION_ESM}`,
          types: 'index.d.ts',
          exports: {
            '.': {
              import: './index.js',
              require: `./${OUTPUT_CJS_DIR}/index.cjs`,
            },
            './*': {
              import: './',
              require: `./${OUTPUT_CJS_DIR}/`,
            },
          },
        },
      }),
    ],
  }),
  // cjs
  _createOptions(INPUT, OUTPUT_CJS, 'cjs', EXTENTION_CJS),
];
export default options;

/**
 * オプションを作成する
 *
 * @param input {string} 入力ディレクトリのパス
 * @param output {string} 出力ディレクトリのパス
 * @param format {'cjs' | 'es'} 出力フォーマット
 * @param extention {string} 出力ファイルの拡張子
 * @param options { { declaration?: boolean; babelConfigPath: string; plugins?: any[] } } オプション
 * @return
 */
function _createOptions(input, output, format, extention, options = {}) {
  const {
    declaration = false,
    babelConfigPath = BABEL_CONFIG_PATH,
    tsconfigPath = TSCONFIG_PATH,
    plugins = [],
  } = options;
  /**  @type {import("rollup").RollupOptions} */
  const config = {
    // エントリーポイント
    input,
    output: {
      // 出力先ディレクトリ
      dir: output,
      format,
      exports: 'auto',
      sourcemap: false,
      entryFileNames: `[name]${extention}`,
      // バンドルしない(falseだとindex.jsに纏められてしまう)
      preserveModules: true,
      interop: 'auto',
    },
    external: EXTERNAL,
    treeshake: false,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: tsconfigPath,
        declaration,
        declarationDir: declaration ? output : null,
        declarationMap: false,
        outDir: output,
        rootDir: 'src',
      }),
      commonjs(),
      babel({
        extensions: EXTENTIONS,
        babelHelpers: 'runtime',
        configFile: babelConfigPath,
      }),
      sass({
        include: ['**/*.css', '**/*.scss', '**/*.sass'],
        insert: true,
        api: 'modern',
        processor(styles) {
          return new CleanCSS().minify(styles).styles;
        },
      }),
      ...plugins,
    ],
  };
  return config;
}
