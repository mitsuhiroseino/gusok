import { RELATIONAL_OPERATOR } from './constants';

export type RelationalOperator = (typeof RELATIONAL_OPERATOR)[keyof typeof RELATIONAL_OPERATOR];

export type ExamineRelationshipOptions = {
  /**
   * 検証する比較演算子
   */
  operator?: RelationalOperator;
};
