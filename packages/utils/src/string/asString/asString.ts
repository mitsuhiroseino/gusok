/**
 * null,undefinedの場合は空文字を返します
 * @param target 任意の値 or null or undefined
 * @returns 文字列
 */
export default function asString(target: any | null | undefined): string {
  return typeof target === 'string' ? target : target == null ? '' : String(target);
}
