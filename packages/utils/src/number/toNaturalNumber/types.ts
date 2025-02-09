import { ToPositiveNumberOptions } from '../toPositiveNumber';

export type ToNaturalNumberOptions = ToPositiveNumberOptions & {
  /**
   * 値が0だった場合に返す値
   * 未指定の場合はnullを返す
   */
  zeroValue?: number | null | undefined;
};
