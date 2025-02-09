import toDecimalString from 'src/number/toDecimalString';

const SMALL_VALUE = '-12345678901234567890';
const HUGE_VALUE = '12345678901234567890';
const MAX_VALUE =
  '179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const MIN_VALUE =
  '0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005';

describe('toDecimalString', () => {
  describe('batch', () => {
    describe('value=null', () => {
      test('empty=default', () => {
        const result = toDecimalString(null);
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString(null, { empty: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=undefined', () => {
      test('empty=default', () => {
        const result = toDecimalString(undefined);
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString(undefined, { empty: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=""', () => {
      test('empty=default', () => {
        const result = toDecimalString('');
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString('', { empty: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value="a"', () => {
      test('nanValue=default', () => {
        const result = toDecimalString('a');
        expect(result).toBe('');
      });

      test('nanValue="0"', () => {
        const result = toDecimalString('a', { nan: '0' });
        expect(result).toBe('0');
      });
    });

    describe('isNaN(value)=true', () => {
      test('value="-"', () => {
        const result = toDecimalString('-');
        expect(result).toBe('');
      });

      test('value="."', () => {
        const result = toDecimalString('.');
        expect(result).toBe('');
      });

      test('value="1."', () => {
        const result = toDecimalString('1.');
        expect(result).toBe('');
      });

      test('value="1-"', () => {
        const result = toDecimalString('1-');
        expect(result).toBe('');
      });

      test('value="-."', () => {
        const result = toDecimalString('-.');
        expect(result).toBe('');
      });

      test('value=".-"', () => {
        const result = toDecimalString('.-');
        expect(result).toBe('');
      });

      test('value="--"', () => {
        const result = toDecimalString('--');
        expect(result).toBe('');
      });

      test('value=".."', () => {
        const result = toDecimalString('..');
        expect(result).toBe('');
      });
    });

    describe('isNaN(value)=false', () => {
      test(`value=${Number.MAX_VALUE}`, () => {
        const result = toDecimalString(Number.MAX_VALUE);
        expect(result).toBe(MAX_VALUE);
      });

      test(`value=${Number.MIN_VALUE}`, () => {
        const result = toDecimalString(Number.MIN_VALUE);
        expect(result).toBe(MIN_VALUE);
      });

      test(`value=${-Number.MAX_VALUE}`, () => {
        const result = toDecimalString(-Number.MAX_VALUE);
        expect(result).toBe('-' + MAX_VALUE);
      });

      test(`value=${-Number.MIN_VALUE}`, () => {
        const result = toDecimalString(-Number.MIN_VALUE);
        expect(result).toBe('-' + MIN_VALUE);
      });

      test(`value="${MAX_VALUE}"`, () => {
        const result = toDecimalString(MAX_VALUE);
        expect(result).toBe(MAX_VALUE);
      });

      test(`value="${MIN_VALUE}"`, () => {
        const result = toDecimalString(MIN_VALUE);
        expect(result).toBe(MIN_VALUE);
      });

      test(`value="-${MAX_VALUE}"`, () => {
        const result = toDecimalString('-' + MAX_VALUE);
        expect(result).toBe('-' + MAX_VALUE);
      });

      test(`value="-${MIN_VALUE}"`, () => {
        const result = toDecimalString('-' + MIN_VALUE);
        expect(result).toBe('-' + MIN_VALUE);
      });
    });

    describe(`value="${SMALL_VALUE}"`, () => {
      test('minValue=default', () => {
        const result = toDecimalString(SMALL_VALUE);
        expect(result).toBe(SMALL_VALUE);
      });

      test('minValue=0', () => {
        const result = toDecimalString(SMALL_VALUE, { min: 0 });
        expect(result).toBe('');
      });

      test('minValue=0&clampToMin', () => {
        const result = toDecimalString(SMALL_VALUE, { min: 0, clampToMin: true });
        expect(result).toBe('0');
      });
    });

    describe(`value="${HUGE_VALUE}"`, () => {
      test('maxValue=default', () => {
        const result = toDecimalString(HUGE_VALUE);
        expect(result).toBe(HUGE_VALUE);
      });

      test('maxValue=0', () => {
        const result = toDecimalString(HUGE_VALUE, { max: 0 });
        expect(result).toBe('');
      });

      test('maxValue=0&clampToMax=true', () => {
        const result = toDecimalString(HUGE_VALUE, { max: 0, clampToMax: true });
        expect(result).toBe('0');
      });
    });

    describe(`value="12345.67890"`, () => {
      test('precision=default', () => {
        const result = toDecimalString('12345.67890');
        expect(result).toBe('12345.6789');
      });

      test('precision=0', () => {
        const result = toDecimalString('12345.67890', { precision: 0 });
        expect(result).toBe('12345');
      });

      test('precision=2', () => {
        const result = toDecimalString('12345.67890', { precision: 2 });
        expect(result).toBe('12345.67');
      });

      test('precision=-2', () => {
        const result = toDecimalString('12345.67890', { precision: -2 });
        expect(result).toBe('12300');
      });

      test('precision=8', () => {
        const result = toDecimalString('12345.67890', { precision: 8 });
        expect(result).toBe('12345.6789');
      });

      test('precision=-8', () => {
        const result = toDecimalString('12345.67890', { precision: -8 });
        expect(result).toBe('0');
      });
    });
  });

  describe('interactive', () => {
    describe('value=null', () => {
      test('empty=default', () => {
        const result = toDecimalString(null, { interactive: true });
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString(null, { interactive: true, empty: '0' });
        expect(result).toBe('0');
      });

      test('empty=0', () => {
        const result = toDecimalString(null, { interactive: true, empty: 0 });
        expect(result).toBe('0');
      });
    });

    describe('value=undefined', () => {
      test('empty=default', () => {
        const result = toDecimalString(undefined, { interactive: true });
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString(undefined, { interactive: true, empty: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=""', () => {
      test('empty=default', () => {
        const result = toDecimalString('', { interactive: true });
        expect(result).toBe('');
      });

      test('empty="0"', () => {
        const result = toDecimalString('', { interactive: true, empty: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value="a"', () => {
      test('nanValue=default', () => {
        const result = toDecimalString('a', { interactive: true });
        expect(result).toBe('');
      });

      test('nanValue="0"', () => {
        const result = toDecimalString('a', { interactive: true, nan: '0' });
        expect(result).toBe('0');
      });

      test('nanValue=0', () => {
        const result = toDecimalString('a', { interactive: true, nan: 0 });
        expect(result).toBe('0');
      });
    });

    describe('isNaN(value)=true', () => {
      test('value="-"', () => {
        const result = toDecimalString('-', { interactive: true });
        expect(result).toBe('-');
      });

      test('value="."', () => {
        const result = toDecimalString('.', { interactive: true });
        expect(result).toBe('.');
      });

      test('value="1."', () => {
        const result = toDecimalString('1.', { interactive: true });
        expect(result).toBe('1.');
      });

      test('value="1-"', () => {
        const result = toDecimalString('1-', { interactive: true });
        expect(result).toBe('');
      });

      test('value="-."', () => {
        const result = toDecimalString('-.', { interactive: true });
        expect(result).toBe('');
      });

      test('value=".-"', () => {
        const result = toDecimalString('.-', { interactive: true });
        expect(result).toBe('');
      });

      test('value="--"', () => {
        const result = toDecimalString('--', { interactive: true });
        expect(result).toBe('');
      });

      test('value=".."', () => {
        const result = toDecimalString('..', { interactive: true });
        expect(result).toBe('');
      });
    });

    describe(`value="${SMALL_VALUE}"`, () => {
      test('minValue=default', () => {
        const result = toDecimalString(SMALL_VALUE, { interactive: true });
        expect(result).toBe(SMALL_VALUE);
      });

      test('minValue=0', () => {
        const result = toDecimalString(SMALL_VALUE, { interactive: true, min: 0 });
        expect(result).toBe('');
      });
    });

    describe(`value="${HUGE_VALUE}"`, () => {
      test('maxValue=default', () => {
        const result = toDecimalString(HUGE_VALUE, { interactive: true });
        expect(result).toBe(HUGE_VALUE);
      });

      test('maxValue=0', () => {
        const result = toDecimalString(HUGE_VALUE, { interactive: true, max: 0 });
        expect(result).toBe('');
      });
    });

    describe(`value="12345.67890"`, () => {
      test('precision=default', () => {
        const result = toDecimalString('12345.67890', { interactive: true });
        expect(result).toBe('12345.6789');
      });

      test('precision=0', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 0 });
        expect(result).toBe('12345');
      });

      test('precision=2', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 2 });
        expect(result).toBe('12345.67');
      });

      test('precision=-2', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: -2 });
        expect(result).toBe('12300');
      });

      test('precision=8', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 8 });
        expect(result).toBe('12345.6789');
      });

      test('precision=-8', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: -8 });
        expect(result).toBe('0');
      });
    });
  });
});
