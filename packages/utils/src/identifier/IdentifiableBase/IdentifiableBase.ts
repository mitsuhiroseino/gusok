import { Identifiable, IdentifiableConfig } from '../../types';
import assignIdentifier from '../assignIdentifier';

/**
 * 識別可能なクラス
 */
export default abstract class IdentifiableBase implements Identifiable {
  /**
   * ID
   */
  readonly $id!: string;

  /**
   * 識別名
   */
  readonly $idName!: string;

  /**
   * コンストラクター
   * @param config
   */
  constructor(config: IdentifiableConfig = {}) {
    assignIdentifier(this, config);
  }
}
