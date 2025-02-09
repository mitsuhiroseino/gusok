import isFunction from 'lodash/isFunction';
import { CreatePaddedArrayOptions } from './types';

export default function createPaddedArray<T>(
  array: T[],
  minLength: number,
  defaultValue: T | (() => T),
  options: CreatePaddedArrayOptions = {},
): T[] {
  const { maxLength } = options;
  return new Proxy(array, {
    get(target, property, receiver) {
      if (property === 'length') {
        return minLength;
      } else if (property === Symbol.iterator) {
        return function* () {
          const length = target.length;
          for (const item of target) {
            yield item;
          }
          if (length < minLength) {
            const getItem = isFunction(defaultValue) ? defaultValue : () => defaultValue;
            for (let i = length; i < minLength; i++) {
              yield getItem();
            }
          }
        };
      }

      const index = Number(property);
      if (isNaN(index)) {
        return target[property];
      } else if (index >= 0 && index < target.length) {
        return Reflect.get(target, property, receiver);
      } else if (index < minLength) {
        if (isFunction(defaultValue)) {
          return defaultValue();
        } else {
          return defaultValue;
        }
      } else {
        return undefined;
      }
    },
  });
}
