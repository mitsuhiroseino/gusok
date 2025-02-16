import ConfigurableBase from '../ConfigurableBase';
import { Destructible, DestructibleConfigBase } from './types';

/**
 * destructorメソッドを持つクラスの基底クラス
 */
export default abstract class DestructibleBase<C extends DestructibleConfigBase = DestructibleConfigBase>
  extends ConfigurableBase<C>
  implements Destructible
{
  /**
   * 破棄状態か
   */
  protected _isDestroyed: boolean = false;

  get isDestroyed() {
    return this._isDestroyed;
  }

  destructor() {
    this._isDestroyed = true;
  }

  protected _deleteProperties(names: string[]) {
    for (const name of names) {
      delete this[name];
    }
  }
}
