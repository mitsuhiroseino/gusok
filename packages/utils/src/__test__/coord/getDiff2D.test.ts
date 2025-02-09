import getDiff2D, { GetDiff2DOptions } from 'src/coord/getDiff2D';

describe('getDiff2D', () => {
  describe('default', () => {
    describe('正→正', () => {
      test('正順', () => {
        const result = getDiff2D({ x: 0, y: 0 }, { x: 100, y: 200 });
        expect(result).toEqual({ x: 100, y: 200 });
      });

      test('逆順', () => {
        const result = getDiff2D({ x: 100, y: 200 }, { x: 0, y: 0 });
        expect(result).toEqual({ x: -100, y: -200 });
      });
    });

    describe('負→負', () => {
      test('正順', () => {
        const result = getDiff2D({ x: -200, y: -200 }, { x: -100, y: -50 });
        expect(result).toEqual({ x: 100, y: 150 });
      });

      test('逆順', () => {
        const result = getDiff2D({ x: -100, y: -50 }, { x: -200, y: -200 });
        expect(result).toEqual({ x: -100, y: -150 });
      });
    });

    describe('0を跨ぐ', () => {
      test('負→正', () => {
        const result = getDiff2D({ x: -100, y: -100 }, { x: 100, y: 200 });
        expect(result).toEqual({ x: 200, y: 300 });
      });

      test('正→負', () => {
        const result = getDiff2D({ x: 100, y: 200 }, { x: -100, y: -100 });
        expect(result).toEqual({ x: -200, y: -300 });
      });
    });
  });

  describe('options', () => {
    test('abs', () => {
      const result = getDiff2D({ x: 100, y: 200 }, { x: 0, y: 0 }, { abs: true });
      expect(result).toEqual({ x: 100, y: 200 });
    });

    describe('keysX & keysY', () => {
      test('string', () => {
        const result = getDiff2D({ lng: 0, lat: 0 }, { lng: 100, lat: 200 }, { keysX: 'lng', keysY: 'lat' });
        expect(result).toEqual({ x: 100, y: 200 });
      });

      test('string[]', () => {
        const result = getDiff2D({ lng: 0, lat: 0 }, { lng: 100, lat: 200 }, { keysX: [0, 'lng'], keysY: [1, 'lat'] });
        expect(result).toEqual({ x: 100, y: 200 });
      });
    });

    test('keyX & keyY', () => {
      const result = getDiff2D({ x: 0, y: 0 }, { x: 100, y: 200 }, { keyX: 'lng', keyY: 'lat' });
      expect(result).toEqual({ lng: 100, lat: 200 });
    });

    describe('accuracy', () => {
      const options: GetDiff2DOptions = { accuracy: 0.1 };
      test('正', () => {
        const result = getDiff2D({ x: 0, y: 0 }, { x: 100.678, y: 50.678 }, options);
        expect(result).toEqual({ x: 100.7, y: 50.7 });
      });

      test('負', () => {
        const result = getDiff2D({ x: 100.678, y: 50.678 }, { x: 0, y: 0 }, options);
        expect(result).toEqual({ x: -100.7, y: -50.7 });
      });
    });

    // test('getDistance', () => {
    //   const result = getDiff2D(
    //     { x: 0, y: 0 },
    //     { x: 10, y: 10 },
    //     {
    //       getDistance: (start, end, options) => {
    //         const { extraOptions } = options,
    //           { axis, pow } = extraOptions;
    //         if (axis === 'x') {
    //           return Math.pow(end - start, pow) * 2;
    //         } else {
    //           return Math.pow(end - start, pow);
    //         }
    //       },
    //       extraOptions: {
    //         pow: 3,
    //       },
    //     }
    //   );
    //   expect(result).toEqual({ x: 2000, y: 1000 });
    // });

    describe('loopX', () => {
      const options: GetDiff2DOptions = { loopX: true, minValueX: -200, maxValueX: 200 };
      test('正順', () => {
        const result = getDiff2D({ x: 0, y: 0 }, { x: 100, y: 100 }, options);
        expect(result).toEqual({ x: 100, y: 100 });
      });

      describe('逆順の方が近い', () => {
        test('負→正', () => {
          const result = getDiff2D({ x: -150, y: -150 }, { x: 150, y: 150 }, options);
          expect(result).toEqual({ x: -100, y: 300 });
        });

        test('正→負', () => {
          const result = getDiff2D({ x: 150, y: 150 }, { x: -150, y: -150 }, options);
          expect(result).toEqual({ x: 100, y: -300 });
        });
      });
    });

    describe('loopY', () => {
      const options: GetDiff2DOptions = { loopY: true, minValueY: -200, maxValueY: 200 };
      test('正順', () => {
        const result = getDiff2D({ x: 0, y: 0 }, { x: 100, y: 100 }, options);
        expect(result).toEqual({ x: 100, y: 100 });
      });

      describe('逆順の方が近い', () => {
        test('負→正', () => {
          const result = getDiff2D({ x: -150, y: -150 }, { x: 150, y: 150 }, options);
          expect(result).toEqual({ x: 300, y: -100 });
        });

        test('正→負', () => {
          const result = getDiff2D({ x: 150, y: 150 }, { x: -150, y: -150 }, options);
          expect(result).toEqual({ x: -300, y: 100 });
        });
      });
    });
  });
});
