import { ConfigurableConfigBase } from '../ConfigurableBase';

/**
 * コンフィグ
 */
export type DestructibleConfigBase = ConfigurableConfigBase;

/**
 * インターフェイス
 */
export interface Destructible {
  /**
   * 破棄されているか
   */
  readonly isDestroyed: boolean;

  /**
   * デストラクター
   */
  destructor(): void;
}
