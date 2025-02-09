import format from 'src/boolean/format';

describe('format', () => {
  describe('true', () => {
    test('default', () => {
      const result = format(true);
      expect(result).toBe('true');
    });
    test('空文字', () => {
      const result = format(true, { trueString: '' });
      expect(result).toBe('');
    });
    test('任意の値', () => {
      const result = format(true, { trueString: '○' });
      expect(result).toBe('○');
    });
  });

  describe('false', () => {
    test('default', () => {
      const result = format(false);
      expect(result).toBe('false');
    });
    test('空文字', () => {
      const result = format(false, { falseString: '' });
      expect(result).toBe('');
    });
    test('任意の値', () => {
      const result = format(false, { falseString: '×' });
      expect(result).toBe('×');
    });
  });
});
