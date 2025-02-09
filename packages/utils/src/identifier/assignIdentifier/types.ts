import { GenerateIdOptions } from '../generateId';

/**
 * assignIdentifierのオプション
 */
export type AssignIdentifierOptions = GenerateIdOptions & {
  /**
   * IDの取得元になるプロパティ
   * デフォルトは`$id`
   */
  idProperty?: string;

  /**
   * IDの設定先になるプロパティ
   * デフォルトは`$id`
   */
  targetIdProperty?: string;

  /**
   * 識別名の取得元になるプロパティ
   * デフォルトは`$idName`
   */
  targetIdNameProperty?: string;

  /**
   * 識別名の設定先になるプロパティ
   * デフォルトは`$idName`
   */
  idNameProperty?: string;
};
