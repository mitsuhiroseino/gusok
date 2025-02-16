import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: './src/index.ts',
  output: {
    dir: './build',
    format: 'cjs',
    exports: 'named',
    sourcemap: false,
    entryFileNames: `[name].js`,
    preserveModules: true,
  },
  external: [/node_modules/],
  treeshake: false,
  plugins: [
    resolve(),
    alias({
      entries: [{ find: 'lodash-es', replacement: 'lodash' }],
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      declaration: false,
      declarationDir: null,
      declarationMap: false,
      outDir: './build',
    }),
    commonjs({
      esmExternals: true,
    }),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      babelHelpers: 'runtime',
      configFile: './babel.config.js',
    }),
  ],
};
export default config;
