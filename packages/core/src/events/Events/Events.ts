import asArray from '@gusok/utils/array/asArray';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import DestructibleBase from '../../DestructibleBase';
import {
  EventHandler,
  EventHandlerOptions,
  EventHandlers,
  EventInfo,
  FireOptions,
  FireParams,
  Observable,
} from '../types';
import {
  EventSynchronousConfig,
  EventTransformationConfigs,
  EventsConfig,
} from './types';

/**
 * 登録されたハンドラーの情報
 */
type RegisteredHandler = {
  handler: EventHandler;
  options: EventHandlerOptions;
};

/**
 * イベントシステム
 */
class Events<H = EventHandlers>
  extends DestructibleBase<EventsConfig<H>>
  implements Observable<H>
{
  /**
   * イベントハンドラー
   */
  private _handlers: { [type: string]: RegisteredHandler[] } = {};

  /**
   * イベントの抑止階層数
   */
  private _supress: number = 0;

  /**
   * イベントの変換設定
   */
  private _eventTransformation!: EventTransformationConfigs;

  /**
   * 同期するイベントの設定
   */
  private _synchronizedEvents!: EventSynchronousConfig[];

  constructor(config?: EventsConfig<H>) {
    super(config);
    const me = this,
      {
        handlers = {},
        eventTransformation = {},
        synchronizedEvents,
      } = me.config;
    me._eventTransformation = eventTransformation as EventTransformationConfigs;
    me._synchronizedEvents = asArray(
      synchronizedEvents,
    ) as EventSynchronousConfig[];
    me.addHandlers(handlers as { [eventName: string]: EventHandler<unknown> });
  }

  /**
   * 指定の種別のリスナー配列を取得する
   * @param type
   */
  private _getRegisteredHandlers(type: keyof H | string): RegisteredHandler[] {
    const key = (type as string).toLocaleLowerCase(),
      registeredHandlers = this._handlers[key] || [];
    this._handlers[key] = registeredHandlers;
    return registeredHandlers;
  }

  on(
    type: keyof H | string,
    handler: EventHandler,
    options?: EventHandlerOptions,
  ) {
    const me = this,
      registeredHandlers = me._getRegisteredHandlers(type),
      opts = { ...options };
    if (opts.owner == null) {
      opts.owner = me;
    } else if (isFunction(opts.owner)) {
      console.warn('Function cannot be specified for owner.');
      return;
    }
    registeredHandlers.push({ handler, options: opts });
  }

  un(type: keyof H | string, target: H[keyof H] | unknown = this) {
    const me = this,
      registeredHandlers = me._getRegisteredHandlers(type);
    if (isFunction(target)) {
      // ハンドラーを指定して削除する場合
      remove(registeredHandlers, ({ handler }) => handler === target);
    } else {
      // オーナーを指定して削除する場合
      remove(registeredHandlers, ({ options = {} }) => {
        const { owner } = options;
        return owner === target;
      });
    }
  }

  addHandlers(
    handlers: { [eventName: string]: EventHandler<unknown> },
    options?: EventHandlerOptions,
  ) {
    for (const type in handlers) {
      this.on(type as keyof H, handlers[type] as EventHandler, options);
    }
  }

  removeHandlers(owner: any = this) {
    for (const type in this._handlers) {
      this.un(type as keyof H, owner);
    }
  }

  fire(
    type: keyof H | string,
    params: FireParams = {},
    options?: FireOptions,
  ): boolean {
    const me = this,
      orgType = type as string,
      eventTransformation = me._eventTransformation[orgType],
      fireOptions = { type: orgType, params, target: me, ...options };

    // 同期するイベントシステムでイベントを発火
    for (const synchronizedEvents of me._synchronizedEvents) {
      const { events, target } = synchronizedEvents,
        fireOpts = { ...fireOptions };
      if (target) {
        fireOpts.target = target;
      }
      events._fire(orgType, fireOpts);
    }

    let toContinueProcessing = true;
    if (eventTransformation) {
      // イベントの変形あり
      const {
          type: altType,
          convertParams,
          target = me,
          omitOriginal,
        } = eventTransformation,
        altParams = convertParams ? convertParams(params) : params;
      toContinueProcessing = me._fire(altType, {
        type: altType,
        params: altParams,
        target,
        ...options,
      });
      if (omitOriginal) {
        // 元のイベントは発火しない
        return toContinueProcessing;
      }
    }

    // 変形したイベントのハンドラと正規のイベントのハンドラどちらかがfalseの場合はfalseを返す
    return (
      toContinueProcessing &&
      me._fire(type, { type: orgType, params, target: me, ...options })
    );
  }

  /**
   * イベントを発火する
   */
  protected _fire(type: keyof H | string, event: EventInfo): boolean {
    const me = this,
      registeredHandlers = me._getRegisteredHandlers(type).concat([]);
    let toContinueProcessing = true;
    if (me._canFire()) {
      toContinueProcessing = registeredHandlers.reduce(
        (result, registeredHandler) => {
          const { handler, options } = registeredHandler;
          if (handler(event) === false) {
            result = false;
          }
          if (options.once) {
            // 1回限りのイベントハンドラは実行後に削除
            me.un(type as keyof H, handler);
          }
          return result;
        },
        true,
      );
    }
    return toContinueProcessing;
  }

  suppressEvents() {
    this._supress++;
  }

  unsuppressEvents() {
    this._supress = Math.max(0, this._supress - 1);
  }

  private _canFire() {
    return !this._supress;
  }

  /**
   * 他のイベントシステムとイベントを同期する
   * @param events
   * @param target
   */
  synchronize(events: Events<any>, target?: any): void {
    this._synchronizedEvents.push({ events, target });
  }

  destructor(): void {
    this._deleteProperties([
      '_handlers',
      '_synchronizedEvents',
      '_eventTransformation',
    ]);
    super.destructor();
  }
}
export default Events;
