import { PreCompareOptions } from '../../lang/preCompare';
import { FormatOptions } from '../format';

export type CompareOptions = FormatOptions &
  PreCompareOptions & {
    /**
     * falseを優先する
     */
    preferFalse?: boolean;
  };
