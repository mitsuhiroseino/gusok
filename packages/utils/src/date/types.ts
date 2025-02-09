import { FORMATS } from './constants';

export type FormatType = (typeof FORMATS)[keyof typeof FORMATS];
