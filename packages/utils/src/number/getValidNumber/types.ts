import { IsValidNumberOptions } from '../isValidNumber';

export type GetValidNumberOptions = IsValidNumberOptions & {
  /**
   * 有効な数値でなかった場合に返す値
   * デフォルトは0
   */
  defaultValue?: number;
};
