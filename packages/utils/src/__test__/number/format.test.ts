import format, { FormatOptions } from 'src/number/format';

describe('format', () => {
  describe('###', () => {
    const OPTIONS = { format: '###' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('12');
      expect(format(-12, OPTIONS)).toEqual('-12');
    });
    test('桁通り', () => {
      expect(format(123, OPTIONS)).toEqual('123');
      expect(format(-123, OPTIONS)).toEqual('-123');
    });
    test('桁あふれ', () => {
      expect(format(1234, OPTIONS)).toEqual('1234');
      expect(format(-1234, OPTIONS)).toEqual('-1234');
    });
  });
  describe('###.###', () => {
    const OPTIONS = { format: '###.###' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('.');
    });
    test('桁不足', () => {
      expect(format(12.34, OPTIONS)).toEqual('12.34');
      expect(format(-12.34, OPTIONS)).toEqual('-12.34');
    });
    test('桁通り', () => {
      expect(format(123.456, OPTIONS)).toEqual('123.456');
      expect(format(-123.456, OPTIONS)).toEqual('-123.456');
    });
    test('桁あふれ', () => {
      expect(format(1234.567, OPTIONS)).toEqual('1234.567');
      expect(format(-1234.567, OPTIONS)).toEqual('-1234.567');
    });
  });
  describe('##0', () => {
    const OPTIONS = { format: '##0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('12');
      expect(format(-12, OPTIONS)).toEqual('-12');
    });
    test('桁通り', () => {
      expect(format(123, OPTIONS)).toEqual('123');
      expect(format(-123, OPTIONS)).toEqual('-123');
    });
    test('桁あふれ', () => {
      expect(format(12345, OPTIONS)).toEqual('12345');
      expect(format(-12345, OPTIONS)).toEqual('-12345');
    });
  });
  describe('#,##0', () => {
    const OPTIONS = { format: '#,##0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0');
    });
    test('桁不足', () => {
      expect(format(123, OPTIONS)).toEqual('123');
      expect(format(-123, OPTIONS)).toEqual('-123');
    });
    test('桁通り', () => {
      expect(format(1234, OPTIONS)).toEqual('1,234');
      expect(format(-1234, OPTIONS)).toEqual('-1,234');
    });
    test('桁あふれ', () => {
      expect(format(12345, OPTIONS)).toEqual('12,345');
      expect(format(-12345, OPTIONS)).toEqual('-12,345');
    });
  });
  describe('#,##0.###', () => {
    const OPTIONS = { format: '#,##0.###' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0.');
    });
    test('桁不足', () => {
      expect(format(123.45, OPTIONS)).toEqual('123.45');
      expect(format(-123.45, OPTIONS)).toEqual('-123.45');
    });
    test('桁通り', () => {
      expect(format(1234.567, OPTIONS)).toEqual('1,234.567');
      expect(format(-1234.567, OPTIONS)).toEqual('-1,234.567');
    });
    test('桁あふれ', () => {
      expect(format(12345.6789, OPTIONS)).toEqual('12,345.679');
      expect(format(-12345.6789, OPTIONS)).toEqual('-12,345.679');
    });
  });
  describe('#,###.0##', () => {
    const OPTIONS = { format: '#,###.0##' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('.0');
    });
    test('桁不足', () => {
      expect(format(123.45, OPTIONS)).toEqual('123.45');
      expect(format(-123.45, OPTIONS)).toEqual('-123.45');
    });
    test('桁通り', () => {
      expect(format(1234.567, OPTIONS)).toEqual('1,234.567');
      expect(format(-1234.567, OPTIONS)).toEqual('-1,234.567');
    });
    test('桁あふれ', () => {
      expect(format(12345.6789, OPTIONS)).toEqual('12,345.679');
      expect(format(-12345.6789, OPTIONS)).toEqual('-12,345.679');
    });
  });
  describe('000', () => {
    const OPTIONS = { format: '000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('000');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('012');
      expect(format(-12, OPTIONS)).toEqual('-012');
    });
    test('桁通り', () => {
      expect(format(123, OPTIONS)).toEqual('123');
      expect(format(-123, OPTIONS)).toEqual('-123');
    });
    test('桁あふれ', () => {
      expect(format(1234, OPTIONS)).toEqual('1234');
      expect(format(-1234, OPTIONS)).toEqual('-1234');
    });
  });
  describe('000.000', () => {
    const OPTIONS = { format: '000.000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('000.000');
    });
    test('桁不足', () => {
      expect(format(12.34, OPTIONS)).toEqual('012.340');
      expect(format(-12.34, OPTIONS)).toEqual('-012.340');
    });
    test('桁通り', () => {
      expect(format(123.456, OPTIONS)).toEqual('123.456');
      expect(format(-123.456, OPTIONS)).toEqual('-123.456');
    });
    test('桁あふれ', () => {
      expect(format(1234.567, OPTIONS)).toEqual('1234.567');
      expect(format(-1234.567, OPTIONS)).toEqual('-1234.567');
    });
  });
  describe('00#', () => {
    const OPTIONS = { format: '00#' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('00');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('012');
      expect(format(-12, OPTIONS)).toEqual('-012');
    });
    test('桁通り', () => {
      expect(format(123, OPTIONS)).toEqual('123');
      expect(format(-123, OPTIONS)).toEqual('-123');
    });
    test('桁あふれ', () => {
      expect(format(12345, OPTIONS)).toEqual('12345');
      expect(format(-12345, OPTIONS)).toEqual('-12345');
    });
  });
  describe('0,000', () => {
    const OPTIONS = { format: '0,000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0,000');
    });
    test('桁不足', () => {
      expect(format(123, OPTIONS)).toEqual('0,123');
      expect(format(-123, OPTIONS)).toEqual('-0,123');
    });
    test('桁通り', () => {
      expect(format(1234, OPTIONS)).toEqual('1,234');
      expect(format(-1234, OPTIONS)).toEqual('-1,234');
    });
    test('桁あふれ', () => {
      expect(format(12345, OPTIONS)).toEqual('12,345');
      expect(format(-12345, OPTIONS)).toEqual('-12,345');
    });
  });
  describe('0,000.000', () => {
    const OPTIONS = { format: '0,000.000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0,000.000');
    });
    test('桁不足', () => {
      expect(format(123.45, OPTIONS)).toEqual('0,123.450');
      expect(format(-123.45, OPTIONS)).toEqual('-0,123.450');
    });
    test('桁通り', () => {
      expect(format(1234.567, OPTIONS)).toEqual('1,234.567');
      expect(format(-1234.567, OPTIONS)).toEqual('-1,234.567');
    });
    test('桁あふれ', () => {
      expect(format(12345.6789, OPTIONS)).toEqual('12,345.679');
      expect(format(-12345.6789, OPTIONS)).toEqual('-12,345.679');
    });
  });
  describe('0##,000.000', () => {
    const OPTIONS = { format: '0##,000.000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0000.000');
    });
    test('桁不足', () => {
      expect(format(12.34, OPTIONS)).toEqual('0012.340');
      expect(format(-12.34, OPTIONS)).toEqual('-0012.340');
    });
    test('桁通り', () => {
      expect(format(123456.789, OPTIONS)).toEqual('123,456.789');
      expect(format(-123456.789, OPTIONS)).toEqual('-123,456.789');
    });
    test('桁あふれ', () => {
      expect(format(123456789.123456, OPTIONS)).toEqual('123456,789.123');
      expect(format(-123456789.123456, OPTIONS)).toEqual('-123456,789.123');
    });
  });
  describe('00,00,00.000', () => {
    const OPTIONS = { format: '00,00,00.000' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('00,00,00.000');
    });
    test('桁不足', () => {
      expect(format(123.45, OPTIONS)).toEqual('00,01,23.450');
      expect(format(-123.45, OPTIONS)).toEqual('-00,01,23.450');
    });
    test('桁通り', () => {
      expect(format(123456.789, OPTIONS)).toEqual('12,34,56.789');
      expect(format(-123456.789, OPTIONS)).toEqual('-12,34,56.789');
    });
    test('桁あふれ', () => {
      expect(format(123456789.12345, OPTIONS)).toEqual('12345,67,89.123');
      expect(format(-123456789.12345, OPTIONS)).toEqual('-12345,67,89.123');
    });
  });
  describe('00#,#0#.##0', () => {
    const OPTIONS = { format: '00#,#0#.##0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('000.0');
    });
    test('桁不足', () => {
      expect(format(123.45, OPTIONS)).toEqual('00123.450');
      expect(format(-123.45, OPTIONS)).toEqual('-00123.450');
    });
    test('桁通り', () => {
      expect(format(123456.789, OPTIONS)).toEqual('123,456.789');
      expect(format(-123456.789, OPTIONS)).toEqual('-123,456.789');
    });
    test('桁あふれ', () => {
      expect(format(123456789.123456, OPTIONS)).toEqual('123456,789.123');
      expect(format(-123456789.123456, OPTIONS)).toEqual('-123456,789.123');
    });
  });
  describe('.0##', () => {
    const OPTIONS = { format: '.0##' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('.0');
    });
    test('桁不足', () => {
      expect(format(0.12, OPTIONS)).toEqual('.12');
      expect(format(-0.12, OPTIONS)).toEqual('-.12');
    });
    test('桁通り', () => {
      expect(format(0.123, OPTIONS)).toEqual('.123');
      expect(format(-0.123, OPTIONS)).toEqual('-.123');
    });
    test('桁あふれ', () => {
      expect(format(123.4567, OPTIONS)).toEqual('123.457');
      expect(format(-123.4567, OPTIONS)).toEqual('-123.457');
    });
  });
  describe('#,###.', () => {
    const OPTIONS = { format: '#,###.' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('.');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('12.');
      expect(format(-12, OPTIONS)).toEqual('-12.');
    });
    test('桁通り', () => {
      expect(format(1234, OPTIONS)).toEqual('1,234.');
      expect(format(-1234, OPTIONS)).toEqual('-1,234.');
    });
    test('桁あふれ', () => {
      expect(format(1234567, OPTIONS)).toEqual('1234,567.');
      expect(format(-1234567, OPTIONS)).toEqual('-1234,567.');
    });
  });
  describe('0#00#,#.#0#', () => {
    const OPTIONS = { format: '0#00#,#.#0#' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('000.0');
    });
    test('桁不足', () => {
      expect(format(123.4, OPTIONS)).toEqual('0012,3.40');
      expect(format(-123.4, OPTIONS)).toEqual('-0012,3.40');
    });
    test('桁通り', () => {
      expect(format(123456.789, OPTIONS)).toEqual('12345,6.789');
      expect(format(-123456.789, OPTIONS)).toEqual('-12345,6.789');
    });
    test('桁あふれ', () => {
      expect(format(123456789.123456, OPTIONS)).toEqual('12345678,9.123');
      expect(format(-123456789.123456, OPTIONS)).toEqual('-12345678,9.123');
    });
  });
  describe('###,"★"##0.0"☆"#', () => {
    const OPTIONS = { format: '###,"★"##0.0"☆"#' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0.0');
    });
    test('桁不足', () => {
      expect(format(12.1, OPTIONS)).toEqual('12.1');
      expect(format(-12.1, OPTIONS)).toEqual('-12.1');
    });
    test('桁通り', () => {
      expect(format(123456.78, OPTIONS)).toEqual('123,★456.7☆8');
      expect(format(-123456.78, OPTIONS)).toEqual('-123,★456.7☆8');
    });
    test('桁あふれ', () => {
      expect(format(123456789.12345, OPTIONS)).toEqual('123456,★789.1☆2');
      expect(format(-123456789.12345, OPTIONS)).toEqual('-123456,★789.1☆2');
    });
  });
  describe('"★"###,##0.0#"☆"', () => {
    const OPTIONS = { format: '"★"###,##0.0#"☆"' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('★0.0☆');
    });
    test('桁不足', () => {
      expect(format(12.1, OPTIONS)).toEqual('★12.1☆');
      expect(format(-12.1, OPTIONS)).toEqual('★-12.1☆');
    });
    test('桁通り', () => {
      expect(format(123456.78, OPTIONS)).toEqual('★123,456.78☆');
      expect(format(-123456.78, OPTIONS)).toEqual('★-123,456.78☆');
    });
    test('桁あふれ', () => {
      expect(format(123456789.12345, OPTIONS)).toEqual('★123456,789.12☆');
      expect(format(-123456789.12345, OPTIONS)).toEqual('★-123456,789.12☆');
    });
  });
  describe('000,"★"000.0"☆"0', () => {
    const OPTIONS = { format: '000,"★"000.0"☆"0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('000,★000.0☆0');
    });
    test('桁不足', () => {
      expect(format(12.1, OPTIONS)).toEqual('000,★012.1☆0');
      expect(format(-12.1, OPTIONS)).toEqual('-000,★012.1☆0');
    });
    test('桁通り', () => {
      expect(format(123456.78, OPTIONS)).toEqual('123,★456.7☆8');
      expect(format(-123456.78, OPTIONS)).toEqual('-123,★456.7☆8');
    });
    test('桁あふれ', () => {
      expect(format(123456789.12345, OPTIONS)).toEqual('123456,★789.1☆2');
      expect(format(-123456789.12345, OPTIONS)).toEqual('-123456,★789.1☆2');
    });
  });
  describe('"★"000,000.00"☆"', () => {
    const OPTIONS = { format: '"★"000,000.00"☆"' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('★000,000.00☆');
    });
    test('桁不足', () => {
      expect(format(12.1, OPTIONS)).toEqual('★000,012.10☆');
      expect(format(-12.1, OPTIONS)).toEqual('★-000,012.10☆');
    });
    test('桁通り', () => {
      expect(format(123456.78, OPTIONS)).toEqual('★123,456.78☆');
      expect(format(-123456.78, OPTIONS)).toEqual('★-123,456.78☆');
    });
    test('桁あふれ', () => {
      expect(format(123456789.12345, OPTIONS)).toEqual('★123456,789.12☆');
      expect(format(-123456789.12345, OPTIONS)).toEqual('★-123456,789.12☆');
    });
  });

  describe('###.##0,0##', () => {
    const OPTIONS: FormatOptions = { format: '###,##0.0##', thousandsSeparator: '.', decimalPoint: ',' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0,0');
    });
    test('桁不足', () => {
      expect(format(12.34, OPTIONS)).toEqual('12,34');
      expect(format(-12.34, OPTIONS)).toEqual('-12,34');
    });
    test('桁通り', () => {
      expect(format(123456.789, OPTIONS)).toEqual('123.456,789');
      expect(format(-123456.789, OPTIONS)).toEqual('-123.456,789');
    });
    test('桁あふれ', () => {
      expect(format(123456789.123456, OPTIONS)).toEqual('123456.789,123');
      expect(format(-123456789.123456, OPTIONS)).toEqual('-123456.789,123');
    });
  });
  describe('##0.0##.###', () => {
    const OPTIONS: FormatOptions = { format: '##0.0##.###' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0.0');
    });
    test('桁不足', () => {
      expect(format(12.34, OPTIONS)).toEqual('12.34');
      expect(format(-12.34, OPTIONS)).toEqual('-12.34');
    });
    test('桁通り', () => {
      expect(format(123.456789, OPTIONS)).toEqual('123.456789');
      expect(format(-123.456789, OPTIONS)).toEqual('-123.456789');
    });
    test('桁あふれ', () => {
      expect(format(123456.123456789, OPTIONS)).toEqual('123456.123457');
      expect(format(-123456.123456789, OPTIONS)).toEqual('-123456.123457');
    });
  });
  describe('###"_"###"_"##0', () => {
    const OPTIONS = { format: '###"_"###"_"##0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('0');
    });
    test('桁不足', () => {
      expect(format(12, OPTIONS)).toEqual('12');
      expect(format(-12, OPTIONS)).toEqual('-12');
    });
    test('桁通り', () => {
      expect(format(1234, OPTIONS)).toEqual('1_234');
      expect(format(-1234, OPTIONS)).toEqual('-1_234');
    });
    test('桁あふれ', () => {
      expect(format(1234567, OPTIONS)).toEqual('1_234_567');
      expect(format(-1234567, OPTIONS)).toEqual('-1_234_567');
    });
  });
  describe('000"."000"."000', () => {
    const OPTIONS = { format: '000"."000"."000' };
    test('000.000.000', () => {
      expect(format(0, OPTIONS)).toEqual('000.000.000');
    });
    test('000.000.001', () => {
      expect(format(1, OPTIONS)).toEqual('000.000.001');
    });
    test('000.001.000', () => {
      expect(format(1000, OPTIONS)).toEqual('000.001.000');
    });
    test('000.001.001', () => {
      expect(format(1001, OPTIONS)).toEqual('000.001.001');
    });
    test('001.000.000', () => {
      expect(format(1000000, OPTIONS)).toEqual('001.000.000');
    });
    test('001.001.000', () => {
      expect(format(1001000, OPTIONS)).toEqual('001.001.000');
    });
    test('001.001.001', () => {
      expect(format(1001001, OPTIONS)).toEqual('001.001.001');
    });
  });
  describe('負の値のパターンあり', () => {
    const OPTIONS = { format: '"△"###,##0', negativeValueFormat: '"▼"###,##0' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('△0');
    });
    test('正の値', () => {
      expect(format(1234, OPTIONS)).toEqual('△1,234');
    });
    test('負の値', () => {
      expect(format(-1234, OPTIONS)).toEqual('▼1,234');
    });
  });
  describe('ゼロのパターンあり', () => {
    const OPTIONS = { format: '"△"###,##0', negativeValueFormat: '"▼"###,##0', zeroValueFormat: '"－"' };
    test('ゼロ', () => {
      expect(format(0, OPTIONS)).toEqual('－');
    });
    test('正の値', () => {
      expect(format(1234, OPTIONS)).toEqual('△1,234');
    });
    test('負の値', () => {
      expect(format(-1234, OPTIONS)).toEqual('▼1,234');
    });
  });
  describe('NaN', () => {
    const OPTIONS = { format: '###,##0' };
    test('NaNの指定なし(数値)', () => {
      expect(format(NaN, OPTIONS)).toEqual('NaN');
    });
    test('NaNの指定なし(文字列)', () => {
      expect(format('あいうえお', OPTIONS)).toEqual('あいうえお');
    });
    test('NaNの指定あり', () => {
      expect(format(NaN, { ...OPTIONS, nanString: '!!!' })).toEqual('!!!');
    });
  });
});
