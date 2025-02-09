import { RebuildOptions } from '../rebuild/types';

/**
 * clean関数のオプション
 */
export type CleanOptions = RebuildOptions & {
  /**
   * nullも削除対象とする
   */
  removeNull?: boolean;
};
