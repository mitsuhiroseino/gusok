import flatten from 'src/object/flatten';

describe('flatten', () => {
  const OBJECT = {
    item0: 'A',
    item1: ['a', 'b', { item1_0: 'c', item1_1: 'd', item1_2: { item1_2_0: 'e' } }],
    item2: {
      a: 0,
      b: 1,
      c: {
        item2_0: 2,
        item2_1: 3,
        item2_2: { item2_2_0: 4 },
      },
    },
  };

  test('default', () => {
    const result = flatten(OBJECT);
    expect(result).toEqual({
      item0: 'A',
      'item1.0': 'a',
      'item1.1': 'b',
      'item1.2.item1_0': 'c',
      'item1.2.item1_1': 'd',
      'item1.2.item1_2.item1_2_0': 'e',
      'item2.a': 0,
      'item2.b': 1,
      'item2.c.item2_0': 2,
      'item2.c.item2_1': 3,
      'item2.c.item2_2.item2_2_0': 4,
    });
  });

  test('ignoreArray=true', () => {
    const result = flatten(OBJECT, { ignoreArray: true });
    expect(result).toEqual({
      item0: 'A',
      item1: [
        'a',
        'b',
        {
          item1_0: 'c',
          item1_1: 'd',
          item1_2: {
            item1_2_0: 'e',
          },
        },
      ],
      'item2.a': 0,
      'item2.b': 1,
      'item2.c.item2_0': 2,
      'item2.c.item2_1': 3,
      'item2.c.item2_2.item2_2_0': 4,
    });
  });

  test('keySeparator="-"', () => {
    const result = flatten(OBJECT, { keySeparator: '-' });
    expect(result).toEqual({
      item0: 'A',
      'item1-0': 'a',
      'item1-1': 'b',
      'item1-2-item1_0': 'c',
      'item1-2-item1_1': 'd',
      'item1-2-item1_2-item1_2_0': 'e',
      'item2-a': 0,
      'item2-b': 1,
      'item2-c-item2_0': 2,
      'item2-c-item2_1': 3,
      'item2-c-item2_2-item2_2_0': 4,
    });
  });

  test('noPathKeys=true', () => {
    const result = flatten(OBJECT, { noPathKeys: true });
    expect(result).toEqual({
      item0: 'A',
      '0': 'a',
      '1': 'b',
      item1_0: 'c',
      item1_1: 'd',
      item1_2_0: 'e',
      a: 0,
      b: 1,
      item2_0: 2,
      item2_1: 3,
      item2_2_0: 4,
    });
  });
});
