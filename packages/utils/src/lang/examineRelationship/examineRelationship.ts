import { RELATIONAL_OPERATOR } from './constants';
import { ExamineRelationshipOptions } from './types';

const OPERATORS = {
  [RELATIONAL_OPERATOR.EQ]: (result: number) => result === 0,
  [RELATIONAL_OPERATOR.NE]: (result: number) => result !== 0,
  [RELATIONAL_OPERATOR.GT]: (result: number) => result > 0,
  [RELATIONAL_OPERATOR.GE]: (result: number) => result >= 0,
  [RELATIONAL_OPERATOR.LT]: (result: number) => result < 0,
  [RELATIONAL_OPERATOR.LE]: (result: number) => result <= 0,
};

/**
 * compareの結果が指定の関係演算子に合致するか判定する
 * @param result compare関数の結果
 * @param options オプション
 */
export default function examineRelationship(result: number, options: ExamineRelationshipOptions = {}): boolean {
  const { operator = RELATIONAL_OPERATOR.EQ } = options;
  return OPERATORS[operator](result);
}
