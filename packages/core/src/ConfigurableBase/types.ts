/**
 * コンフィグ
 */
export type ConfigurableConfigBase = Record<string, unknown>;

/**
 * インターフェイス
 */
export interface Configurable<C extends ConfigurableConfigBase = ConfigurableConfigBase> {
  /**
   * コンフィグ
   */
  readonly config: C;

  /**
   * コンフィグの更新
   * @param config
   */
  updateConfig(config: Partial<C>): void;
}
