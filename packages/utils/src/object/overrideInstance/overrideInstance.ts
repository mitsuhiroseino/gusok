import { OverrideInstanceConfig } from './types';

/**
 * instanceをオーバーライドしたインスタンスを作る
 * @param instance
 * @param config
 * @returns
 */
export default function overrideInstance<I extends object = object, R extends I = I>(
  instance: I,
  config: OverrideInstanceConfig<I, R> = {},
): R {
  const { methods = {}, props = {} } = config;
  const cache: Partial<Record<keyof R, (...args: unknown[]) => unknown>> = {};
  return new Proxy(instance, {
    get: (target, property, receiver) => {
      if (property in methods) {
        // メソッドのオーバーライド
        let method = cache[property];
        if (!method) {
          method = methods[property](target, property, receiver);
          cache[property] = method;
        }
        return method;
      } else if (property in props) {
        // プロパティのオーバーライド
        return props[property](target, property, receiver);
      }
      return Reflect.get(target, property, receiver);
    },
  }) as R;
}
