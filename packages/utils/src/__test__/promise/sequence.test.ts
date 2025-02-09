import sequence from 'src/promise/sequence';

describe('sequence', () => {
  test('default', () => {
    const order: number[] = [],
      promises = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()].map(
        (num, i) =>
          new Promise((resolve) =>
            setTimeout(() => {
              order.push(i);
              resolve(i);
            }, num),
          ),
      );

    return sequence(promises).then((results) => {
      expect(results).toEqual([0, 1, 2, 3, 4]);
      expect(order).toEqual([0, 1, 2, 3, 4]);
    });
  });

  test('error', () => {
    const order: number[] = [],
      promises = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()].map(
        (num, i) =>
          new Promise((resolve, reject) =>
            setTimeout(() => {
              order.push(i);
              if (i === 3) {
                reject(`Error - ${i}`);
              } else {
                resolve(i);
              }
            }, num),
          ),
      );

    const promise = sequence(promises);

    return expect(promise).rejects.toBe('Error - 3');
  });
});
