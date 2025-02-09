import isFunction from 'lodash/isFunction';
import { DistinctArrayOptions } from './types';

/**
 * 重複した要素を持たない配列
 */
export default class DistinctArray<I> {
  /**
   * 追加された要素
   */
  private _items: Map<unknown, I>;

  /**
   * IDを取得するための関数
   */
  private _getId: (item: I) => unknown;

  /**
   * 要素を追加するための関数
   */
  private _add: (item: I, id: unknown) => boolean;

  get length(): number {
    return this._items.size;
  }

  constructor(options: DistinctArrayOptions<I> = {}) {
    const me = this;
    const { idProp, overwrite, items } = options;
    // IDを取得する関数
    me._getId = isFunction(idProp) ? idProp : (item: I) => item[idProp];
    // 要素を追加する関数
    me._add = overwrite
      ? (item: I, id: unknown) => {
          // 後勝ちの場合
          me._items.set(id, item);
          return true;
        }
      : (item: I, id: unknown) => {
          // 先勝ちの場合
          if (!me._items.has(id)) {
            me._items.set(id, item);
            return true;
          }
          return false;
        };
    // Mapの初期化
    if (items) {
      me._items = new Map(items.map((item) => [me._getId(item), item]));
    } else {
      me._items = new Map();
    }
  }

  add(item: I) {
    const id = this._getId(item);
    return this._add(item, id);
  }

  addAll(items: I[]) {
    for (const item of items) {
      this.add(item);
    }
  }

  has(id: unknown) {
    return this._items.has(id);
  }

  delete(id: unknown) {
    if (this.has(id)) {
      this._items.delete(id);
      return true;
    }
    return false;
  }

  clear() {
    this._items.clear();
  }

  toArray(): I[] {
    return new Array(...this._items.values());
  }

  forEach(callback) {
    this._items.forEach(callback);
  }

  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }
}
