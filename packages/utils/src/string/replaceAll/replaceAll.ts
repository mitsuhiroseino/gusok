export default function replaceAll(str: string, searchValue: string, replaceValue: string): string {
  if (str) {
    return str.replaceAll(searchValue, replaceValue);
  }
  return str;
}
