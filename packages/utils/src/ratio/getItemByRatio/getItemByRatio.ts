import findLastIndex from 'lodash/findLastIndex';
import { GetItemByRatioOptions, GetItemByRatioResult } from './types';

const CALC_SUM = (frame1: any, frame2: any) => frame1 + frame2,
  CALC_DIFFERENCE = (startFrame: any, endFrame: any) => endFrame - startFrame,
  CALC_PRODUCT = (frame: any, multiplier: number) => frame * multiplier;

/**
 *
 * @param value 値
 * @param ratio 現在の割合
 * @param options オプション
 * @returns
 */
export default function getItemByRatio(
  items: any[],
  ratio: number,
  options: GetItemByRatioOptions = {},
): GetItemByRatioResult {
  // 例:
  // framesが0～10の11要素、
  // ratio(x)が0.54の場合
  //
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+----+----+-x--+----+----+----+----+

  if (ratio === 0) {
    // 割合が0の時は最初の要素
    return items[0];
  } else if (ratio === 1) {
    // 最後の要素を返すのは割合が1の場合のみ
    return items[items.length - 1];
  } else {
    if (!options.interpolation) {
      // 補間しない場合
      return getFrameWithIndex(items, ratio);
    } else {
      // 補間する場合
      return interpolateFrameWithIndex(items, ratio, options);
    }
  }
}

/**
 * 指定の割合以下のフレームを取得する
 * @param frames
 * @param ratio
 * @returns
 */
export function getFrameWithIndex(frames: any[], ratio: number): GetItemByRatioResult {
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                        ^                        1
  //                            ratio=0.54を下回るこの要素を取得
  const maxIndex = frames.length - 1,
    index = findLastIndex(frames, (frame, i) => i / maxIndex <= ratio);
  return [frames[index], index];
}

/**
 * 指定の割合のフレームを補間する
 * @param frames
 * @param ratio
 * @param options
 * @returns
 */
export function interpolateFrameWithIndex(
  frames: any[],
  ratio: number,
  options: GetItemByRatioOptions,
): GetItemByRatioResult {
  const { calcSum = CALC_SUM, calcDifference = CALC_DIFFERENCE, calcProduct = CALC_PRODUCT } = options;
  const maxIndex = frames.length - 1;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                        ^                        1
  //                            ratio=0.54を下回るこの要素を取得
  const startIndex = findLastIndex(frames, (frame, index) => index / maxIndex <= ratio);
  const startFrame = frames[startIndex];
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                        ^                        1
  //   |========================|
  //   全体に対する開始要素までの割合を算出
  const startRatio = startIndex / maxIndex;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                             ^                   1
  //   |=============================|
  //   全体に対する開始要素の次の要素までの割合を算出
  const endIndex = startIndex + 1;
  const endRatio = endIndex / maxIndex;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                        ^    ^                   1
  //                            |====|
  //                            開始要素から次の要素までの割合の差を算出
  const ratioDiff = endRatio - startRatio;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                        ^                        1
  //   |==========================!======================|
  //                            |=|
  //                              開始要素から全体の対する現在のratioの割合(totalRatio)の差を算出
  const ratioOver = ratio - startRatio;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //                            0    1
  //                            |====| これを1とした場合の
  //                            |=| この長さの割合を算出
  //
  const ratioRatio = ratioOver / ratioDiff;
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //                            |----|
  //                            実際の要素のこの差を算出
  const endFrame = frames[endIndex];
  const diffFrame = calcDifference(startFrame, endFrame);
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //                            |-|
  //                            割合を基に実際の要素のこの差を算出
  const deltaFrame = calcProduct(diffFrame, ratioRatio);
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //                              ^
  //                              この位置に当たる要素を算出して返す
  const frame = calcSum(startFrame, deltaFrame);

  return [frame, endIndex];
}
