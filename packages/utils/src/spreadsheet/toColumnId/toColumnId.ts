/**
 * Spreadsheetなどのカラム番号を、"A"や"BC"などの文字列で表すIDに変換する
 * @param colIndex カラム番号(デフォルトは最小値1)
 * @param zeroBased カラム番号が0から始まる場合にtrue
 * @returns カラムID
 */
export default function toColumnId(colIndex: number, zeroBased?: boolean): string | null {
  const index = zeroBased ? colIndex : colIndex - 1;
  if (index < 0) {
    return null;
  }
  const charCode = (index % 26) + 65,
    colId = String.fromCharCode(charCode),
    rest = Math.floor(index / 26);
  if (rest > 0) {
    return toColumnId(rest) + colId;
  } else {
    return colId;
  }
}
