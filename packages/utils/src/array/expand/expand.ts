/**
 * 指定のサイズになるまで、引数の配列を繰り返した新しい配列を返します。
 * @param array
 * @param size
 */
export default function expand<T>(array: T[], size: number): T[] {
  if (size < 0) {
    array = array.reverse();
    size = size * -1;
  }
  const length = array.length,
    // 配列自体を何回繰り返すか
    cycle = Math.floor(size / length),
    // 余り
    remainder = size % length;
  let result: T[] = [];
  // 配列をcycle倍
  for (let i = 0; i < cycle; i++) {
    result = result.concat(array);
  }
  // 余り分を足す
  return result.concat(array.slice(0, remainder));
}
