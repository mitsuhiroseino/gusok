import { GenerateIdOptions } from '../generateId';
import { GetIdOptions } from '../getId';

/**
 * ensureIdのオプション
 */
export type EnsureIdOptions = GetIdOptions & GenerateIdOptions;
