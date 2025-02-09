export type GetIdFn<I> = (item: I) => unknown;
export type GetDepsFn<I> = (item: I) => I | I[];

export type SortDependenciesOptions<I> = {
  /**
   * IDにあたるプロパティ
   * 未指定の場合は0
   */
  idProp?: string | number | GetIdFn<I>;

  /**
   * 依存先の情報を持ったプロパティ
   * 未指定の場合は1
   */
  depsProp?: string | number | GetDepsFn<I>;

  /**
   * 依存先のIDにあたるプロパティ
   * 未指定の場合はidPropと同じ設定になる
   */
  depsIdProp?: string | number | GetIdFn<I>;

  /**
   * 与えるデータがツリー構造の場合はtrue
   */
  isTree?: boolean;

  /**
   * 実体がない依存先は処理対象外とする
   */
  ignoreNoSubstance?: boolean;

  /**
   * ソート順
   * - false: 末端 -> ルート
   * - true: ルート -> 末端
   */
  desc?: boolean;
};
