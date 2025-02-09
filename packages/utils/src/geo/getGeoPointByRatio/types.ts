import { GetPointByRatioOptions, GetPointByRatioResult } from '../../coord/getPointByRatio';

/**
 * オプション
 */
export type GetGeoPointByRatioOptions = Omit<
  GetPointByRatioOptions,
  | 'getDistance'
  | 'keysX'
  | 'correctionTypeX'
  | 'defaultValueX'
  | 'loopX'
  | 'minValueX'
  | 'minValueY'
  | 'keysY'
  | 'correctionTypeY'
  | 'defaultValueY'
  | 'loopY'
  | 'minValueY'
  | 'minValueY'
>;

/**
 * 結果
 */
export type GetGeoPointByRatioResult = GetPointByRatioResult;
