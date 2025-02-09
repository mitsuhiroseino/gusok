/**
 * 配列の前方の要素を削除し末尾に追加する
 * @param array 対象の配列
 * @param size シフトする数
 * @returns 新しい配列
 */
export default function rotate<T>(array: T[], size = 1): T[] {
  const newArray = array.slice(0);
  if (0 < size) {
    if (newArray.length) {
      for (let i = 0; i < size; i++) {
        newArray.push(newArray.shift() as T);
      }
    }
  }
  return newArray;
}
