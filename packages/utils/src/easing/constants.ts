import { EasingCreaters } from './types';

/**
 * イージング種別
 */
export const EASING_TYPE = {
  LINEAR: 'linear',
  EASE_IN_SINE: 'easeInSine',
  EASE_OUT_SINE: 'easeOutSine',
  EASE_IN_OUT_SINE: 'easeInOutSine',
  EASE_OUT_IN_SINE: 'easeOutInSine',
  EASE_IN_CIRC: 'easeInCirc',
  EASE_OUT_CIRC: 'easeOutCirc',
  EASE_IN_OUT_CIRC: 'easeInOutCirc',
  EASE_OUT_IN_CIRC: 'easeOutInCirc',
  EASE_IN_BACK: 'easeInBack',
  EASE_OUT_BACK: 'easeOutBack',
  EASE_IN_OUT_BACK: 'easeInOutBack',
  EASE_OUT_IN_BACK: 'easeOutInBack',
  EASE_IN_BOUNCE: 'easeInBounce',
  EASE_OUT_BOUNCE: 'easeOutBounce',
  EASE_IN_OUT_BOUNCE: 'easeInOutBounce',
  EASE_OUT_IN_BOUNCE: 'easeOutInBounce',
  EASE_IN_ELASTIC: 'easeInElastic',
  EASE_OUT_ELASTIC: 'easeOutElastic',
  EASE_IN_OUT_ELASTIC: 'easeInOutElastic',
  EASE_OUT_IN_ELASTIC: 'easeOutInElastic',
  EASE_IN_QUAD: 'easeInQuad',
  EASE_OUT_QUAD: 'easeOutQuad',
  EASE_IN_OUT_QUAD: 'easeInOutQuad',
  EASE_OUT_IN_QUAD: 'easeOutInQuad',
  EASE_IN_CUBIC: 'easeInCubic',
  EASE_OUT_CUBIC: 'easeOutCubic',
  EASE_IN_OUT_CUBIC: 'easeInOutCubic',
  EASE_OUT_IN_CUBIC: 'easeOutInCubic',
  EASE_IN_QUART: 'easeInQuart',
  EASE_OUT_QUART: 'easeOutQuart',
  EASE_IN_OUT_QUART: 'easeInOutQuart',
  EASE_OUT_IN_QUART: 'easeOutInQuart',
  EASE_IN_QUINT: 'easeInQuint',
  EASE_OUT_QUINT: 'easeOutQuint',
  EASE_IN_OUT_QUINT: 'easeInOutQuint',
  EASE_OUT_IN_QUINT: 'easeOutInQuint',
  EASE_IN_EXPO: 'easeInExpo',
  EASE_OUT_EXPO: 'easeOutExpo',
  EASE_IN_OUT_EXPO: 'easeInOutExpo',
  EASE_OUT_IN_EXPO: 'easeOutInExpo',
} as const;

/**
 * イージング関数
 */
const easings: Partial<EasingCreaters> = {
    linear:
      () =>
      (rate: number): number =>
        rate,
  },
  functionEasings = {
    Sine:
      () =>
      (rate: number): number =>
        1 - Math.cos((rate * Math.PI) / 2),
    Circ:
      () =>
      (rate: number): number =>
        1 - Math.sqrt(1 - rate * rate),
    Back:
      () =>
      (rate: number): number =>
        rate * rate * (3 * rate - 2),
    Bounce:
      () =>
      (rate: number): number => {
        let pow2,
          b = 4;
        while (rate < ((pow2 = Math.pow(2, --b)) - 1) / 11) {}
        return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - rate, 2);
      },
    Elastic: (amplitude: number = 1, period: number = 0.5) => {
      const a = Math.min(Math.max(amplitude, 1), 10);
      const p = Math.min(Math.max(period, 0.1), 2);
      return (rate: number): number =>
        rate === 0 || rate === 1
          ? rate
          : -a *
            Math.pow(2, 10 * (rate - 1)) *
            Math.sin(((rate - 1 - (p / (Math.PI * 2)) * Math.asin(1 / a)) * (Math.PI * 2)) / p);
    },
    Quad:
      () =>
      (rate: number): number =>
        Math.pow(rate, 2),
    Cubic:
      () =>
      (rate: number): number =>
        Math.pow(rate, 3),
    Quart:
      () =>
      (rate: number): number =>
        Math.pow(rate, 4),
    Quint:
      () =>
      (rate: number): number =>
        Math.pow(rate, 5),
    Expo:
      () =>
      (rate: number): number =>
        Math.pow(rate, 6),
  };

Object.keys(functionEasings).forEach((name) => {
  const createEaseIn = functionEasings[name];
  easings['easeIn' + name] = createEaseIn;
  easings['easeOut' + name] = (amplitude: number, period: number) => {
    const easeIn = createEaseIn(amplitude, period);
    return (rate: number): number => {
      return 1 - easeIn(1 - rate);
    };
  };
  easings['easeInOut' + name] = (amplitude: number, period: number) => {
    const easeIn = createEaseIn(amplitude, period);
    return (rate: number): number => {
      return rate < 0.5 ? easeIn(rate * 2) / 2 : 1 - easeIn(rate * -2 + 2) / 2;
    };
  };
  easings['easeOutIn' + name] = (amplitude: number, period: number) => {
    const easeIn = createEaseIn(amplitude, period);
    return (rate: number): number => {
      return rate < 0.5 ? (1 - easeIn(1 - rate * 2)) / 2 : (easeIn(rate * 2 - 1) + 1) / 2;
    };
  };
});

/**
 * イージング関数
 */
export const EASINGS: EasingCreaters = {
  ...easings,
} as any;
