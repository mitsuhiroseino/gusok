/**
 * 先頭を子文字に変換します
 * @param str
 */
export default function uncapitalizeSimply(str: string): string {
  return str ? str.charAt(0).toLowerCase() + str.substring(1) : str;
}
