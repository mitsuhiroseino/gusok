import { CompareOptions as BooleanCompareOptions } from '../../boolean/compare';
import { CompareOptions as DateCompareOptions } from '../../date/compare';
import { PreCompareOptions } from '../../lang/preCompare';
import { CompareOptions as NumberCompareOptions } from '../../number/compare';
import { CompareOptions as StringCompareOptions } from '../../string/compare';

export type CompareOptions = PreCompareOptions & {
  /**
   * booleanの要素を比較する際のオプション
   */
  booleanOptions?: BooleanCompareOptions;

  /**
   * dateの要素を比較する際のオプション
   */
  dateOptions?: DateCompareOptions;

  /**
   * numberの要素を比較する際のオプション
   */
  numberOptions?: NumberCompareOptions;

  /**
   * stringの要素を比較する際のオプション
   */
  stringOptions?: StringCompareOptions;
};
