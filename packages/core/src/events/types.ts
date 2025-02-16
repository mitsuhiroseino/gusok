/**
 * イベント発火時のパラメーター
 */
export type FireParams = {
  [key: string]: any;
};

/**
 * イベント発火時のオプション
 */
export type FireOptions = {
  /**
   * イベントを発火したインスタンス
   */
  target?: any;
};

/**
 * イベント情報
 */
export type EventInfo<P = FireParams> = FireOptions & {
  /**
   * イベント名
   */
  type: string;

  /**
   * イベント発火時に設定された引数
   */
  params: P;
};

/**
 * イベントオプション
 */
export type EventHandlerOptions = {
  /**
   * 一度だけ実行する
   */
  once?: boolean;

  /**
   * イベントハンドラーのオーナー
   * 関数は指定不可
   */
  owner?: any;
};

/**
 * イベントハンドラー
 */
export type EventHandler<P = FireParams> = (event: EventInfo<P>) => void | boolean;

export type EventHandlers = {
  [type: string]: EventHandler;
};

/**
 * イベントをlistenできるクラスのインターフェイス
 */
export interface Observable<H = EventHandlers> {
  /**
   * イベントハンドラーの登録
   * @param type イベント種別
   * @param handler ハンドラー
   * @param options オプション
   */
  on(type: keyof H | string, handler: EventHandler, options?: EventHandlerOptions): void;

  /**
   * イベントハンドラの削除
   * @param type イベント種別
   * @param target 削除対象のハンドラー or 削除対象のハンドラーの設定主
   */
  un(type: keyof H | string, target: EventHandler | unknown): void;

  /**
   * イベントハンドラーの一括登録
   * @param handlers イベントハンドラー
   * @param options オプション
   */
  addHandlers(handlers: { [eventName: string]: EventHandler<unknown> }, options?: EventHandlerOptions): void;

  /**
   * イベントハンドラーの一括削除
   * @param owner 削除対象のハンドラーの設定主
   */
  removeHandlers(owner: unknown): void;

  /**
   * イベントの発火
   * @param type イベント種別
   * @param params イベント発火元により設定された値
   * @param options オプション
   */
  fire(type: keyof H | string, params?: FireParams, options?: FireOptions): boolean;

  /**
   * イベントの発火を抑止
   */
  suppressEvents(): void;

  /**
   * イベントの発火抑止を解除
   */
  unsuppressEvents(): void;
}
