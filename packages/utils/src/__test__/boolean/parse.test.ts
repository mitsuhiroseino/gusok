import parse from 'src/boolean/parse';

describe('parse', () => {
  describe('default', () => {
    test('true', () => {
      const result = parse(true);
      expect(result).toBe(true);
    });

    test('false', () => {
      const result = parse(false);
      expect(result).toBe(false);
    });

    test('truthy', () => {
      const result = parse(1);
      expect(result).toBe(true);
    });

    test('falsy', () => {
      const result = parse(0);
      expect(result).toBe(false);
    });
  });

  describe('trueValues指定', () => {
    test('一致', () => {
      const result = parse('on', { trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'] });
      expect(result).toBe(true);
    });

    test('不一致', () => {
      const result = parse('off', { trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'] });
      expect(result).toBe(false);
    });

    test('一致(deepEqual)', () => {
      const result = parse(
        { result: true },
        { trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON', { result: true }], deepEqual: true },
      );
      expect(result).toBe(true);
    });

    test('不一致(deepEqual)', () => {
      const result = parse(
        { result: false },
        { trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON', { result: true }], deepEqual: true },
      );
      expect(result).toBe(false);
    });
  });

  describe('falseValues指定', () => {
    test('一致', () => {
      const result = parse('off', { falseValues: [false, 'False', 'FALSE', 'off', 'Off', 'OFF'] });
      expect(result).toBe(false);
    });

    test('不一致', () => {
      const result = parse('on', { falseValues: [false, 'False', 'FALSE', 'off', 'Off', 'OFF'] });
      expect(result).toBe(true);
    });

    test('一致(deepEqual)', () => {
      const result = parse(
        { result: false },
        {
          falseValues: [false, 'False', 'FALSE', 'off', 'Off', 'OFF', { result: false }],
          deepEqual: true,
        },
      );
      expect(result).toBe(false);
    });

    test('不一致(deepEqual)', () => {
      const result = parse(
        { result: true },
        {
          falseValues: [false, 'False', 'FALSE', 'off', 'Off', 'OFF', { result: false }],
          deepEqual: true,
        },
      );
      expect(result).toBe(true);
    });
  });

  describe('trueValues & falseValues指定', () => {
    test('一致', () => {
      const result = parse('on', {
        trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'],
        falseValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'],
      });
      expect(result).toBe(true);
    });

    test('不一致', () => {
      const result = parse('off', {
        trueValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'],
        falseValues: [true, 'True', 'TRUE', 'on', 'On', 'ON'],
      });
      expect(result).toBe(false);
    });
  });
});
