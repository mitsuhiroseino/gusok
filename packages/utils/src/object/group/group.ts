/**
 * iterateeの返す値でキーをグループ化したオブジェクトを返します。
 * iterateeがnull,undefinedを返した要素は、戻り値から除外されます。
 * @param object
 * @param iteratee
 * @return グループ化された新しいオブジェクト
 */
export default function group(
  object: { [key: string]: unknown },
  iteratee: (key: string, item: unknown, object: { [key: string]: unknown }) => string | null | undefined,
): { [group: string]: { [key: string]: unknown } } {
  const groups: { [group: string]: { [key: string]: unknown } } = {},
    keys = Object.keys(object);

  for (const key of keys) {
    const item = object[key],
      group = iteratee(key, item, object);
    if (group != null) {
      if (!groups[group]) {
        groups[group] = {};
      }
      groups[group][key] = item;
    }
  }

  return groups;
}
