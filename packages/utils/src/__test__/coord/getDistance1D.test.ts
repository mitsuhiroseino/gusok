import getDistance1D, { GetDistance1DOptions } from 'src/coord/getDistance1D';

describe('getDistance1D', () => {
  describe('default', () => {
    describe('正→正', () => {
      test('正順', () => {
        const result = getDistance1D(0, 100);
        expect(result).toBe(100);
      });

      test('逆順', () => {
        const result = getDistance1D(100, 0);
        expect(result).toBe(-100);
      });
    });

    describe('負→負', () => {
      test('正順', () => {
        const result = getDistance1D(-200, -100);
        expect(result).toBe(100);
      });

      test('逆順', () => {
        const result = getDistance1D(-100, -200);
        expect(result).toBe(-100);
      });
    });

    describe('0を跨ぐ', () => {
      test('負→正', () => {
        const result = getDistance1D(-100, 100);
        expect(result).toBe(200);
      });

      test('正→負', () => {
        const result = getDistance1D(100, -100);
        expect(result).toBe(-200);
      });
    });
  });

  describe('options', () => {
    describe('abs', () => {
      const options: GetDistance1DOptions = { abs: true };
      test('正', () => {
        const result = getDistance1D(0, 100, options);
        expect(result).toBe(100);
      });

      test('負', () => {
        const result = getDistance1D(100, 0, options);
        expect(result).toBe(100);
      });
    });

    describe('accuracy', () => {
      const options: GetDistance1DOptions = { accuracy: 0.1 };
      test('正', () => {
        const result = getDistance1D(0, 100.678, options);
        expect(result).toBe(100.7);
      });

      test('負', () => {
        const result = getDistance1D(100.678, 0, options);
        expect(result).toBe(-100.7);
      });
    });

    describe('loop', () => {
      const options: GetDistance1DOptions = { loop: true, minValue: -200, maxValue: 200 };
      describe('正→正', () => {
        test('正順', () => {
          const result = getDistance1D(0, 100, options);
          expect(result).toBe(100);
        });

        test('逆順', () => {
          const result = getDistance1D(100, 0, options);
          expect(result).toBe(-100);
        });
      });

      describe('負→負', () => {
        test('正順', () => {
          const result = getDistance1D(-200, -100, options);
          expect(result).toBe(100);
        });

        test('逆順', () => {
          const result = getDistance1D(-100, -200, options);
          expect(result).toBe(-100);
        });
      });

      describe('0を跨ぐ', () => {
        test('負→正', () => {
          const result = getDistance1D(-100, 100, options);
          expect(result).toBe(200);
        });

        test('正→負', () => {
          const result = getDistance1D(100, -100, options);
          expect(result).toBe(-200);
        });
      });

      describe('逆順の方が近い', () => {
        test('負→正', () => {
          const result = getDistance1D(-150, 150, options);
          expect(result).toBe(-100);
        });

        test('正→負', () => {
          const result = getDistance1D(150, -150, options);
          expect(result).toBe(100);
        });
      });
    });

    // test('getDistance', () => {
    //   const result = getDistance1D(0, 10, {
    //     getDistance: (start, end, options) => {
    //       return Math.pow(end - start, options.extraOptions.pow);
    //     },
    //     extraOptions: {
    //       pow: 3,
    //     },
    //   });
    //   expect(result).toBe(1000);
    // });
  });
});
