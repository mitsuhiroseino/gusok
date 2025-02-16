import DestructibleBase from '../DestructibleBase';
import { EventHandler, EventHandlerOptions, FireOptions, FireParams } from '../events';
import Events, { EventsConfig } from '../events/Events';
import { EVENTED_EVENTS } from './constants';
import { Evented, EventedConfig, EventedEventHandlers } from './types';

/**
 * イベントを発火できるクラスの基底クラス
 * 実際のイベント処理はイベントシステムが行う為、当クラスでは主にその仲介を行う
 */
export default abstract class EventedBase<
    H extends EventedEventHandlers = EventedEventHandlers,
    C extends EventedConfig<H> = EventedConfig<H>,
  >
  extends DestructibleBase<C>
  implements Evented<H>
{
  isEvented = true;

  /**
   * イベントシステム
   */
  protected _events!: Events<H>;

  constructor(config?: C) {
    super(config);
    this._initEvented();
  }

  /**
   * 初期化処理
   * @param ev
   */
  protected _initEvented(ev?: Events<H>): void {
    const me = this,
      { events = ev || me._createEvents(), handlers } = me.config;
    this._events = events;
    if (handlers) {
      this.addHandlers(handlers as { [eventName: string]: EventHandler<unknown> });
    }
  }

  on(type: keyof H | string, handler: EventHandler, options: EventHandlerOptions = {}) {
    const { owner = this, ...opts } = options;
    this._events.on(type, handler, { owner, ...opts });
  }

  un(type: keyof H | string, target: EventHandler | unknown = this) {
    this._events.un(type, target);
  }

  addHandlers(handlers: { [eventName: string]: EventHandler<unknown> }, options: EventHandlerOptions = {}) {
    const { owner = this, ...opts } = options;
    this._events.addHandlers(handlers, { owner, ...opts });
  }

  removeHandlers(owner: any = this) {
    this._events.removeHandlers(owner);
  }

  fire(type: keyof H | string, params: FireParams = {}, options: FireOptions = {}): boolean {
    if (!options.target) {
      options.target = this;
    }
    return this._events.fire(type, params, options);
  }

  /**
   * 他のイベントシステムと同期する
   * @param events
   * @param target
   */
  synchronizeEvents(events: Events<any>, target?: any) {
    this._events.synchronize(events, target);
  }

  suppressEvents() {
    this._events.suppressEvents();
  }

  unsuppressEvents() {
    this._events.unsuppressEvents();
  }

  /**
   * イベントシステムの初期化
   * @returns
   */
  initEvents(): Events<H> {
    return this.attachEvents(this._createEvents());
  }

  /**
   * イベントシステムの設定
   * @param events
   * @returns
   */
  attachEvents(events: Events<H>): Events<H> {
    const oldEvents = this._events;
    this._events = events;
    return oldEvents;
  }

  private _createEvents() {
    return new Events(this._getEventsConfig());
  }

  /**
   * Eventsインスタンスを作成する際のコンフィグを取得する
   * @returns
   */
  protected _getEventsConfig(): EventsConfig<H> {
    return {};
  }

  destructor() {
    super.destructor();
    this.fire(EVENTED_EVENTS.DESTROY);
    this._deleteProperties(['_events']);
  }
}
