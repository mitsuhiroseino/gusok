import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';
import { GetRollupConfigOptions } from './types';

/**
 * Rollup.jsの設定を取得する
 * @param input
 * @param output
 * @param options
 * @returns
 */
const getRollupConfig = (input: string, output: string, options: GetRollupConfigOptions = {}) => {
  const {
    format = 'es',
    extentions = ['.ts', '.js'],
    exclude = [],
    declaration = false,
    sourceMap = false,
    outputExtention = 'js',
    treeshake = false,
    babelConfigPath = path.resolve('babel.config.js'),
    tsConfigPath = path.resolve('tsconfig.json'),
  } = options;
  return {
    // エントリーポイント
    input,
    output: {
      // 出力先ディレクトリ
      dir: output,
      format,
      exports: 'named',
      sourcemap: sourceMap,
      entryFileNames: `[name].${outputExtention}`,
      // バンドルしない(falseだとindexに纏められてしまう)
      preserveModules: true,
    },
    external: [/node_modules/],
    treeshake,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: tsConfigPath,
        exclude: [/.+\.test\..+/, /.+__test__.+/, ...exclude],
        outDir: output,
        declarationDir: output,
        sourceMap,
        ...(declaration
          ? { declaration: true, declarationMap: sourceMap }
          : { declaration: false, declarationMap: sourceMap }),
      }),
      babel({
        extensions: extentions,
        babelHelpers: 'runtime',
        configFile: babelConfigPath,
      }),
      commonjs(),
    ],
  };
};
export default getRollupConfig;
