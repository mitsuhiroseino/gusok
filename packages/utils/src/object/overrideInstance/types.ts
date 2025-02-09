/**
 * 設定
 */
export type OverrideInstanceConfig<I extends object = object, R extends I = I> = {
  /**
   * メソッドの設定
   */
  methods?: Record<keyof R, OverrideMethod<I>>;

  /**
   * プロパティの設定
   */
  props?: Record<keyof R, OverrideProp<I>>;
};

/**
 * メソッドの設定
 */
export type OverrideMethod<I extends object = object> = (
  instance: I,
  property: string | symbol,
  receiver: any,
) => (...args: unknown[]) => unknown;

/**
 * プロパティの設定
 */
export type OverrideProp<I extends object = object> = (
  instance: I,
  property: string | symbol,
  receiver: any,
) => unknown;
