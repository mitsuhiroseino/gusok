// ビルド用の設定
/** @type {import('@babel/core').TransformOptions} */
export default {
  presets: [
    [
      // 標準のpreset
      '@babel/preset-env',
      // 一部の設定を変更する
      {
        // esmを別の形式に変換しない
        modules: false,
        // nodeの最新バージョンで実行可能な形式に変換する
        targets: { node: 'current' },
      },
    ],
    // typescript用のpreset
    '@babel/preset-typescript',
  ],
  plugins: [
    // babelのポリフィルを個々のソースコードに展開しない
    '@babel/plugin-transform-runtime',
  ],
  comments: false,
};
