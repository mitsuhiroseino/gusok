import toMap from 'src/array/toMap';

describe('toMap', () => {
  const ITEM0 = { $id: 'ID0', field0: 0, field1: 4, field2: 0, field3: '!!' },
    ITEM1 = { $id: 'ID1', field0: 1, field1: 3, field2: 1, field3: '!!' },
    ITEM2 = { $id: 'ID2', field0: 2, field1: 2, field2: 0, field3: '!' },
    ITEM3 = { $id: 'ID3', field0: 3, field1: 1, field2: 1, field3: '!' },
    ITEM4 = { $id: 'ID4', field0: 4, field1: 0, field2: 0, field3: '!' };

  test('1項目', () => {
    const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4],
      result = toMap(array, '$id');
    expect(result).toEqual({
      ID0: ITEM0,
      ID1: ITEM1,
      ID2: ITEM2,
      ID3: ITEM3,
      ID4: ITEM4,
    });
  });

  test('複数項目', () => {
    const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4],
      result = toMap(array, ['field3', '$id']);
    expect(result).toEqual({
      '!!': {
        ID0: ITEM0,
        ID1: ITEM1,
      },
      '!': {
        ID2: ITEM2,
        ID3: ITEM3,
        ID4: ITEM4,
      },
    });
  });

  test('複数項目(flat)', () => {
    const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4],
      result = toMap(array, ['field3', '$id'], true);
    expect(result).toEqual({
      '!!.ID0': ITEM0,
      '!!.ID1': ITEM1,
      '!.ID2': ITEM2,
      '!.ID3': ITEM3,
      '!.ID4': ITEM4,
    });
  });

  test('複数項目(flat & 区切り文字="/")', () => {
    const array = [ITEM0, ITEM1, ITEM2, ITEM3, ITEM4],
      result = toMap(array, ['field3', '$id'], true, '/');
    expect(result).toEqual({
      '!!/ID0': ITEM0,
      '!!/ID1': ITEM1,
      '!/ID2': ITEM2,
      '!/ID3': ITEM3,
      '!/ID4': ITEM4,
    });
  });
});
