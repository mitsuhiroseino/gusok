/**
 * 先頭を大文字に変換します
 * @param str
 */
export default function capitalizeSimply(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.substring(1) : str;
}
