import isEmpty from 'lodash/isEmpty';

/**
 * 指定の位置の要素を削除する
 * indexに負の数を指定した場合は末尾から数えた位置から前方に向かって指定数削除する
 * @param array 配列
 * @param index インデックス
 * @param size 削除数
 */
export default function removeAt<T>(array: T[], index: number, size: number = 1): T[] {
  if (!isEmpty(array) && size > 0) {
    if (index < 0) {
      // 末尾から指定数分削除する場合はindexを補正
      index = array.length + index - size + 1;
    }
    if (index < 0) {
      // 補正してもマイナスの場合は削除しない
      return array;
    } else {
      return array.splice(index, size);
    }
  }
  return [];
}
