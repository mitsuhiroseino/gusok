/**
 * Spreadsheetなどの"A"や"BC"といった文字列で表すカラムIDを、カラム番号(開始は1)に変換する
 * @param colId カラムID
 * @param zeroBased カラム番号が0から始まる場合にtrue
 * @returns カラム番号(デフォルトは最小値1)
 */
export default function toColumnIndex(colId: string, zeroBased?: boolean): number | null {
  if (!colId) {
    return null;
  }
  const chars = colId.split('').reverse();
  return chars.reduce(
    (colIndex, char, index) => {
      const value = char.charCodeAt(0) - 64;
      return colIndex + value * Math.pow(26, index);
    },
    zeroBased ? -1 : 0,
  );
}
