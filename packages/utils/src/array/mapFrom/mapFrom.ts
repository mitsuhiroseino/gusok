/**
 * valueが配列でない場合でも配列として扱い処理を行い、戻り値は入力に準じた形式で返します。
 * @param value
 */
export default function mapFrom<T>(value: T | T[], fn: (item: T, index: number) => any): any | any[] {
  if (Array.isArray(value)) {
    return value.map(fn);
  } else {
    return [value].map(fn)[0];
  }
}
