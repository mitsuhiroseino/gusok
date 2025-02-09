/**
 * valueがnull,undefinedの場合にdefaultValueを返します
 * @param value
 */
export default function asDefined<T>(value: T | null | undefined, defaultValue: T): T {
  return value == null ? defaultValue : value;
}
