/**
 * インスタンス作成時に非同期の初期化処理が必要なシングルトンインスタンスを管理するクラス
 */
export default class SingletonManager<I = any> {
  /**
   * インスタンス作成関数
   */
  private _create: (...args: unknown[]) => Promise<I>;

  /**
   * インスタンス作成関数の引数
   */
  private _args: unknown[];

  /**
   * シングルトンインスタンス
   */
  private _singletonInstance: I;

  /**
   * インスタンス作成中プロミス
   */
  private _creationPromise: Promise<I>;

  /**
   *
   * @param _create シングルトンインスタンスを作成するための関数
   */
  constructor(create: (...args: unknown[]) => Promise<I>, args?: unknown[]) {
    this._create = create;
    this._args = args;
  }

  get(): Promise<I> {
    const me = this;
    if (!me._singletonInstance && !me._creationPromise) {
      // まだインスタンスが無く、インスタンス作成中でない場合のみ実行
      me._creationPromise = me._create.apply(null, me._args).then((instance) => {
        me._singletonInstance = instance;
        me._creationPromise = null;
        return instance;
      });
    }
    // インスタンス作成処理が実行中の場合はそのプロミスを返し、
    // そうでない場合は作成済みのインスタンスを返すプロミスを返す
    return me._creationPromise ? me._creationPromise : Promise.resolve(me._singletonInstance);
  }
}
