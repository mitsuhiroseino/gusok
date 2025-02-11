import isFunction from 'lodash-es/isFunction';
import asArray from '../asArray';
import { GetDepsFn, GetIdFn, SortDependenciesOptions } from './types';

/**
 * 依存関係のソート
 * 依存関係かつ重複のあるノードのソートを行う
 * @param array 対象の配列
 * @param options オプション
 * @returns 新しい配列
 */
export default function sortDependencies<I>(
  array: I[],
  options: SortDependenciesOptions<I> = {},
): I[] {
  const {
    idProp = 0,
    depsProp = 1,
    depsIdProp = idProp,
    ignoreNoSubstance,
    isTree,
    desc,
  } = options;
  const getId: GetIdFn<I> = isFunction(idProp)
    ? idProp
    : (item: I) => item[idProp];
  const getDeps: GetDepsFn<I> = isFunction(depsProp)
    ? depsProp
    : (item: I) => item[depsProp];
  const getDepId: GetIdFn<I> = isFunction(depsIdProp)
    ? depsIdProp
    : (item: I) => item[depsIdProp];
  const itemsMap = getUniqItems(
    new Map<unknown, I>(),
    array,
    getId,
    getDeps,
    getDepId,
    isTree,
  );

  const sorted = sort(itemsMap, getId, getDeps, getDepId, ignoreNoSubstance);

  return desc ? sorted.reverse() : sorted;
}

/**
 * 依存する側、依存される側を合わせたユニークな要素の配列を作る
 * @param results
 * @param getDeps
 * @param items
 * @returns
 */
function getUniqItems<I>(
  results: Map<unknown, I>,
  items: I[],
  getId: GetIdFn<I>,
  getDeps: GetDepsFn<I>,
  getDepId: GetIdFn<I>,
  isTree: boolean,
) {
  for (const item of items) {
    const id = getId(item);
    results.set(id, item);
    if (isTree) {
      _getUniqItems(results, asArray(getDeps(item)), getDepId, getDeps);
    }
  }
  return results;
}

/**
 * ツリー構造の場合は依存先の要素の取得
 * @param results
 * @param items
 * @param getDepId
 * @param getDeps
 * @returns
 */
function _getUniqItems<I>(
  results: Map<unknown, I>,
  items: I[],
  getDepId: GetIdFn<I>,
  getDeps: GetDepsFn<I>,
) {
  for (const item of items) {
    const id = getDepId(item);
    results.set(id, item);
    _getUniqItems(results, asArray(getDeps(item)), getDepId, getDeps);
  }
  return results;
}

/**
 * 依存関係を考慮したソート
 * @param distinctArray
 * @param array
 * @param getId
 * @param getDeps
 * @returns
 */
function sort<I>(
  itemsMap: Map<unknown, I>,
  getId: GetIdFn<I>,
  getDeps: GetDepsFn<I>,
  getDepId: GetIdFn<I>,
  ignoreNoSubstance: boolean,
) {
  const distinctArray = new Array(...itemsMap.values()),
    length = distinctArray.length,
    sorted = new Array(),
    visited = {},
    dependenciesMap = makeDependenciesMap(itemsMap, getDeps, getDepId),
    reverseLookupMap = makeReverseLookupMap(distinctArray, getId),
    visit = createVisit(
      itemsMap,
      dependenciesMap,
      reverseLookupMap,
      getId,
      ignoreNoSubstance,
    );

  for (let i = 0; i < length; i++) {
    if (!visited[i]) {
      visit(distinctArray[i], i, new Set<I>(), sorted, visited);
    }
  }

  return sorted;
}

function createVisit<I>(
  itemsMap: Map<unknown, I>,
  dependenciesMap: Map<unknown, Set<unknown>>,
  reverseLookupMap: Map<unknown, number>,
  getId: GetIdFn<I>,
  ignoreNoSubstance: boolean,
) {
  return function visit(
    item: I,
    index: number,
    dependents: Set<I>,
    sorted: I[],
    visited: { [index: number]: boolean },
  ) {
    if (dependents.has(item)) {
      // 循環参照になっている場合はエラー
      throw new Error('Cyclic dependency: ' + getId(item));
    }

    if (visited[index]) {
      // 処理済みの場合は何もしない
      return;
    }
    visited[index] = true;

    // 処理対象の依存先を取得
    const dependencyIds = Array.from(dependenciesMap.get(getId(item)));

    // 現在処理中の依存関係(パス)に対象を追加
    dependents.add(item);

    // 対象の依存先を全て処理
    const length = dependencyIds.length;
    for (let i = 0; i < length; i++) {
      const dependencyId = dependencyIds[i];
      // 依存先のvisitedの更新用にdistinctArrayn内でのindexも渡す
      const distinctArrayIndex = reverseLookupMap.get(dependencyId);
      if (distinctArrayIndex != null) {
        visit(
          itemsMap.get(dependencyId),
          distinctArrayIndex,
          dependents,
          sorted,
          visited,
        );
      } else if (!ignoreNoSubstance) {
        throw new Error('No substance: ' + dependencyId);
      }
    }

    // 次の要素の依存関係には今回の対象は含まれていないかもしれないので、
    // 現在処理中の依存関係(パス)から対象を削除
    dependents.delete(item);

    // 結果に追加
    sorted.push(item);

    return sorted;
  };
}

/**
 * 要素が依存している要素を取得できるマップを作る
 * @param itemsMap
 * @param getDeps
 * @returns
 */
function makeDependenciesMap<I>(
  itemsMap: Map<unknown, I>,
  getDeps: GetDepsFn<I>,
  getDepId: GetIdFn<I>,
): Map<unknown, Set<unknown>> {
  const map = new Map<unknown, Set<unknown>>();
  itemsMap.forEach((item, id) => {
    if (!map.has(id)) {
      map.set(id, new Set<unknown>());
    }
    // 依存している要素を収集する
    const deps = asArray(getDeps(item));
    for (const depItem of deps) {
      // 対象要素に依存している要素を追加する
      map.get(id).add(getDepId(depItem));
    }
  });
  return map;
}

/**
 * 逆引き用のマップを作る
 * @param distinctArray
 * @returns
 */
function makeReverseLookupMap<I>(
  distinctArray: I[],
  getId: GetIdFn<I>,
): Map<unknown, number> {
  return distinctArray.reduce((map, item, index) => {
    map.set(getId(item), index);
    return map;
  }, new Map<unknown, number>());
}
