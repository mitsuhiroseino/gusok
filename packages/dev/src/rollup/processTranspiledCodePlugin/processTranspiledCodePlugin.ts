import isFunction from 'lodash-es/isFunction';
import { Plugin } from 'rollup';
import { ProcessTranspiledCodePluginConfig } from './types';

/**
 * トランスパイル後のソースコードを設定に従い編集するプラグイン
 */
export default function processTranspiledCodePlugin(
  config: ProcessTranspiledCodePluginConfig,
): Plugin {
  const { replacers = [] } = config;
  return {
    name: 'process-transpiled-code',
    transform: (code, id) => {
      let modifiedCode = code;
      for (const replacer of replacers) {
        if (isFunction(replacer)) {
          modifiedCode = replacer(code, id);
        } else if (replacer.target.test(id)) {
          modifiedCode.replace(replacer.pattern, replacer.replacement);
        }
      }
      return { code: modifiedCode, map: null };
    },
  };
}
