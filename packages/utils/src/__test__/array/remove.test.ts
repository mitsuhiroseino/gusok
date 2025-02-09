import remove from 'src/array/remove';

describe('remove', () => {
  const ITEM0 = { $id: 'ID0', field0: 0, field1: 4, field2: 0, field3: '!!' },
    ITEM1 = { $id: 'ID1', field0: 1, field1: 3, field2: 1, field3: '!!' },
    ITEM2 = { $id: 'ID2', field0: 2, field1: 2, field2: 0, field3: '!' },
    ITEM3 = { $id: 'ID3', field0: 3, field1: 1, field2: 1, field3: '!' },
    ITEM4 = { $id: 'ID4', field0: 4, field1: 0, field2: 0, field3: '!' };

  describe('条件の項目数', () => {
    test('0項目', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, {});
      expect(array).toEqual([ITEM0, ITEM1, ITEM2, ITEM3, ITEM4]);
    });

    test('1項目', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, { $id: 'ID2' });
      expect(array).toEqual([ITEM0, ITEM1, ITEM3, ITEM4]);
    });

    test('2項目', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, { $id: 'ID3', field0: 3 });
      expect(array).toEqual([ITEM0, ITEM1, ITEM2, ITEM4]);
    });
  });

  describe('削除される要素数', () => {
    test('0要素', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, { $id: 'ID5' });
      expect(array).toEqual([ITEM0, ITEM1, ITEM2, ITEM3, ITEM4]);
    });

    test('1要素', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, { $id: 'ID2' });
      expect(array).toEqual([ITEM0, ITEM1, ITEM3, ITEM4]);
    });

    test('2要素', () => {
      const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4];
      remove(array, { field3: '!!' });
      expect(array).toEqual([ITEM2, ITEM3, ITEM4]);
    });
  });
});
