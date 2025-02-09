/**
 * 分類するプロパティの情報
 * 分類先のグループに対応する値がnullの場合は、
 * 対象のグループに分類されなかったプロパティを返す
 *
 * @param group 分類先のグループ
 */
export type DistributeConfig = Record<string, GroupProperties | null>;

export type GroupProperties = {
  /**
   * @param property 対象のプロパティ
   * @param value 分類の有無 or 分類先でのプロパティ名
   */
  [property: PropertyKey]: boolean | PropertyKey;
};

export type DistributeOptions = {
  /**
   * object自身のプロパティのみを分類対象とする
   */
  ownProperty?: boolean;

  /**
   * 複製した値を分類する
   */
  cloneValue?: boolean;
};
