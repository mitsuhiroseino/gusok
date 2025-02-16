import { Configurable, ConfigurableConfigBase } from './types';

/**
 * configを持つクラスの基底クラス
 */
export default abstract class ConfigurableBase<C extends ConfigurableConfigBase = ConfigurableConfigBase>
  implements Configurable<C>
{
  /**
   * コンフィグ
   */
  private _config: C;

  get config(): C {
    return this._config;
  }

  /**
   * コンストラクター
   * @param config コンフィグ
   */
  constructor(config?: C) {
    this._config = { ...config } as C;
  }

  /**
   * コンフィグへ反映
   * @param config
   */
  protected _assginConfig(config: Partial<C>): void {
    Object.assign(this._config, config);
  }

  /**
   * optionsとコンフィグをマージした新しいコンフィグを作成する
   * @param options オプション
   * @returns
   */
  protected _withConfig(options: any): C {
    return { ...this.config, ...options };
  }

  updateConfig(config: Partial<C>): void {
    this._assginConfig(config);
  }
}
