import parse from 'src/number/parse';

describe('parse', () => {
  describe('default', () => {
    describe('整数', () => {
      test('123456789', () => {
        const result = parse('123456789');
        expect(result).toEqual(123456789);
      });
      test('0123456789', () => {
        const result = parse('0123456789');
        expect(result).toEqual(123456789);
      });
      test('-123456789', () => {
        const result = parse('-123456789');
        expect(result).toEqual(-123456789);
      });
      test('-0123456789', () => {
        const result = parse('-0123456789');
        expect(result).toEqual(-123456789);
      });
    });
    describe('小数', () => {
      test('0.123456789', () => {
        const result = parse('0.123456789');
        expect(result).toEqual(0.123456789);
      });
      test('0.1234567890', () => {
        const result = parse('0.123456789');
        expect(result).toEqual(0.123456789);
      });
      test('-0.1234567890', () => {
        const result = parse('-0.1234567890');
        expect(result).toEqual(-0.123456789);
      });
      test('-0.1234567890', () => {
        const result = parse('-0.1234567890');
        expect(result).toEqual(-0.123456789);
      });
    });
    describe('指数', () => {
      test('1.2345678901234567e+29', () => {
        const result = parse('1.2345678901234567e+29');
        expect(result).toEqual(1.2345678901234567e29);
      });
      test('-1.2345678901234567e+29', () => {
        const result = parse('-1.2345678901234567e+29');
        expect(result).toEqual(-1.2345678901234567e29);
      });
      test('1.2345678901234567e29', () => {
        const result = parse('1.2345678901234567e29');
        expect(result).toEqual(1.2345678901234567e29);
      });
      test('-1.2345678901234567e29', () => {
        const result = parse('-1.2345678901234567e29');
        expect(result).toEqual(-1.2345678901234567e29);
      });
      test('1.2345678901234567e-29', () => {
        const result = parse('1.2345678901234567e-29');
        expect(result).toEqual(1.2345678901234567e-29);
      });
      test('-1.2345678901234567e-29', () => {
        const result = parse('-1.2345678901234567e-29');
        expect(result).toEqual(-1.2345678901234567e-29);
      });
    });
    describe('桁区切りあり', () => {
      test('123,456,789', () => {
        const result = parse('123,456,789');
        expect(result).toEqual(123456789);
      });
      test('1,234,567,890', () => {
        const result = parse('1,234,567,890');
        expect(result).toEqual(1234567890);
      });
      test('-123,456,789', () => {
        const result = parse('-123,456,789');
        expect(result).toEqual(-123456789);
      });
      test('-1,234,567,890', () => {
        const result = parse('-1,234,567,890');
        expect(result).toEqual(-1234567890);
      });
      test('123,456,789.123456', () => {
        const result = parse('123,456,789.123456');
        expect(result).toEqual(123456789.123456);
      });
      test('1,234,567,890.123456', () => {
        const result = parse('1,234,567,890.123456');
        expect(result).toEqual(1234567890.123456);
      });
      test('-123,456,789.123456', () => {
        const result = parse('-123,456,789.123456');
        expect(result).toEqual(-123456789.123456);
      });
      test('-1,234,567,890.0123450', () => {
        const result = parse('-1,234,567,890.0123450');
        expect(result).toEqual(-1234567890.012345);
      });
    });
  });

  describe('小数点=","、桁区切り="."', () => {
    const OPTIONS = { thousandsSeparator: '.', decimalPoint: ',' };
    describe('整数', () => {
      test('123456789', () => {
        const result = parse('123456789', OPTIONS);
        expect(result).toEqual(123456789);
      });
      test('0123456789', () => {
        const result = parse('0123456789', OPTIONS);
        expect(result).toEqual(123456789);
      });
      test('-123456789', () => {
        const result = parse('-123456789', OPTIONS);
        expect(result).toEqual(-123456789);
      });
      test('-0123456789', () => {
        const result = parse('-0123456789', OPTIONS);
        expect(result).toEqual(-123456789);
      });
    });
    describe('小数', () => {
      test('0,123456789', () => {
        const result = parse('0,123456789', OPTIONS);
        expect(result).toEqual(0.123456789);
      });
      test('0,1234567890', () => {
        const result = parse('0,123456789', OPTIONS);
        expect(result).toEqual(0.123456789);
      });
      test('-0,1234567890', () => {
        const result = parse('-0,1234567890', OPTIONS);
        expect(result).toEqual(-0.123456789);
      });
      test('-0,1234567890', () => {
        const result = parse('-0,1234567890', OPTIONS);
        expect(result).toEqual(-0.123456789);
      });
    });
    describe('指数', () => {
      test('1,2345678901234567e+29', () => {
        const result = parse('1,2345678901234567e+29', OPTIONS);
        expect(result).toEqual(1.2345678901234567e29);
      });
      test('-1,2345678901234567e+29', () => {
        const result = parse('-1,2345678901234567e+29', OPTIONS);
        expect(result).toEqual(-1.2345678901234567e29);
      });
      test('1,2345678901234567e29', () => {
        const result = parse('1,2345678901234567e29', OPTIONS);
        expect(result).toEqual(1.2345678901234567e29);
      });
      test('-1,2345678901234567e29', () => {
        const result = parse('-1,2345678901234567e29', OPTIONS);
        expect(result).toEqual(-1.2345678901234567e29);
      });
      test('1,2345678901234567e-29', () => {
        const result = parse('1,2345678901234567e-29', OPTIONS);
        expect(result).toEqual(1.2345678901234567e-29);
      });
      test('-1,2345678901234567e-29', () => {
        const result = parse('-1,2345678901234567e-29', OPTIONS);
        expect(result).toEqual(-1.2345678901234567e-29);
      });
    });
    describe('桁区切りあり', () => {
      test('123.456.789', () => {
        const result = parse('123.456.789', OPTIONS);
        expect(result).toEqual(123456789);
      });
      test('1.234.567.890', () => {
        const result = parse('1.234.567.890', OPTIONS);
        expect(result).toEqual(1234567890);
      });
      test('-123.456.789', () => {
        const result = parse('-123.456.789', OPTIONS);
        expect(result).toEqual(-123456789);
      });
      test('-1.234.567.890', () => {
        const result = parse('-1.234.567.890', OPTIONS);
        expect(result).toEqual(-1234567890);
      });
      test('123.456.789,123456', () => {
        const result = parse('123.456.789,123456', OPTIONS);
        expect(result).toEqual(123456789.123456);
      });
      test('1.234.567.890,123456', () => {
        const result = parse('1.234.567.890,123456', OPTIONS);
        expect(result).toEqual(1234567890.123456);
      });
      test('-123.456.789,123456', () => {
        const result = parse('-123.456.789,123456', OPTIONS);
        expect(result).toEqual(-123456789.123456);
      });
      test('-1.234.567.890,0123450', () => {
        const result = parse('-1.234.567.890,0123450', OPTIONS);
        expect(result).toEqual(-1234567890.012345);
      });
    });
  });
});
