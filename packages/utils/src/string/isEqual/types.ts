import { StandardizeOptions } from '../standardize';

/**
 * オプション
 */
export type IsEqualOptions = StandardizeOptions & {
  /**
   * 値1の標準化を行わない
   */
  noStandardizationForValue1?: boolean;

  /**
   * 値2の標準化を行わない
   */
  noStandardizationForValue2?: boolean;
};
