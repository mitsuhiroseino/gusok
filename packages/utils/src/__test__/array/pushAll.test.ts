import pushAll from 'src/array/pushAll';

describe('pushAll', () => {
  test('1要素', () => {
    const array: any[] = [0, 1, 2, 3, 4];
    pushAll(array, 'a');
    expect(array).toEqual([0, 1, 2, 3, 4, 'a']);
  });

  test('複数要素', () => {
    const array: any[] = [0, 1, 2, 3, 4];
    pushAll(array, ['a', 'b', 'c']);
    expect(array).toEqual([0, 1, 2, 3, 4, 'a', 'b', 'c']);
  });
});
