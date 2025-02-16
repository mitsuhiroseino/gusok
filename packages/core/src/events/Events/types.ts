import { ConfigurableConfigBase } from '../../ConfigurableBase';
import { EventHandlers } from '../types';
import Events from './Events';

export type EventTransformationConfig<T = any> = {
  /**
   * 移譲先のイベント名
   */
  type: string;

  /**
   * イベントパラメーターの変換関数
   * @param params
   * @returns
   */
  convertParams?: (params: any) => any;

  /**
   * 元のイベントを発火しない
   */
  omitOriginal?: boolean;

  /**
   * ターゲットも置き換える場合は指定する
   */
  target?: T;
};

/**
 * イベントの変換設定
 * オリジナルのイベントを別のイベント名で発火しなおすための設定
 *
 * Entityの`update`イベントをCollectionの`entityupdate`イベントとして発火しなおしたい場合に、
 * EntityのEventsへ渡すEventTransformationConfigsの例
 *
 *     {
 *         update: {
 *             type: 'entityupdate',
 *             // イベントハンドラーに渡すパラメーターの加工
 *             convertParams: (params: any) => {
 *                 // entityは配列に入れentitiesとしてparamsに設定
 *                 const { entity, ...rest } = params;
 *                 return { entities: [entity], ...rest  };
 *             },
 *             // updateイベントは発火しない
 *             omitOriginal: true,
 *             // eventに設定されるtargetはCollectionのインスタンス
 *             target: this,
 *         }
 *     }
 *
 */
export type EventTransformationConfigs = {
  [orgType: string]: EventTransformationConfig;
};

/**
 * イベントの同期設定
 * 同期元で発火したイベントは同期先でも発火する
 * domのイベントのbubblingみたいなもの
 */
export type EventSynchronousConfig = {
  /**
   * 同期先のイベントシステム
   */
  events: Events<any>;

  /**
   * 発火時のeventに設定するターゲットを差し替える場合に指定
   */
  target?: any;
};

/**
 * Eventsのコンフィグ
 */
export type EventsConfig<H = EventHandlers> = ConfigurableConfigBase & {
  /**
   * インスタンス作成時に設定するイベントハンドラー
   */
  handlers?: H;

  /**
   * イベントを別のイベントとして発火しなおす場合の設定
   */
  eventTransformation?: EventTransformationConfigs;

  /**
   * 同じイベントを別のイベントシステムでも発火したい場合に設定する
   */
  synchronizedEvents?: EventSynchronousConfig | EventSynchronousConfig[];
};
