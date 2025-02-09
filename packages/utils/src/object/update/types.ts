import { IsSameOptions } from '../../lang/isSame';
import { PutOptions } from '../put';

/**
 * update関数のオプション
 */
export type UpdateOptions = IsSameOptions & PutOptions;
