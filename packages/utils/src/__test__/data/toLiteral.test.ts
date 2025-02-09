import toLiteral from 'src/data/toLiteral';

describe('toLiteral', () => {
  const DATE = new Date(2000, 0, 1, 2, 3, 4, 567),
    ISO_DATE = '1999-12-31T17:03:04.567Z';

  describe('undefined', () => {
    test('default', () => {
      const result = toLiteral(undefined);
      expect(result).toBe('undefined');
    });
    test('null', () => {
      const result = toLiteral(undefined, { undefinedOutput: 'null' });
      expect(result).toBe('null');
    });
    test('omit', () => {
      const result = toLiteral(undefined, { undefinedOutput: 'omit' });
      expect(result).toBe('');
    });
  });
  describe('null', () => {
    test('default', () => {
      const result = toLiteral(null);
      expect(result).toBe('null');
    });
    test('undefined', () => {
      const result = toLiteral(null, { nullOutput: 'undefined' });
      expect(result).toBe('undefined');
    });
    test('omit', () => {
      const result = toLiteral(null, { nullOutput: 'omit' });
      expect(result).toBe('');
    });
  });
  describe('string', () => {
    test('default', () => {
      const result = toLiteral('ABC');
      expect(result).toBe("'ABC'");
    });
  });
  describe('number', () => {
    test('default', () => {
      const result = toLiteral(123456.789);
      expect(result).toBe('123456.789');
    });
  });
  describe('boolean', () => {
    test('default', () => {
      const result = toLiteral(true);
      expect(result).toBe('true');
    });
  });
  describe('date', () => {
    test('default', () => {
      const result = toLiteral(DATE);
      expect(result).toBe(`'${ISO_DATE}'`);
    });
    test('dateFormat', () => {
      const result = toLiteral(DATE, { dateFormat: 'yyyy/MM/dd HH:mm:ss.SSS' });
      expect(result).toBe(`'2000/01/01 02:03:04.567'`);
    });
  });
  describe('array', () => {
    test('default', () => {
      const result = toLiteral([undefined, null, 'ABC', 123456.789, true, DATE, ['ABC'], { string: 'ABC' }]);
      expect(result).toBe(`[undefined,null,'ABC',123456.789,true,'${ISO_DATE}',['ABC'],{string:'ABC'}]`);
    });
    test('limit', () => {
      const result = toLiteral([['ABC', ['abc']]], {
        limit: 1,
      });
      expect(result).toBe(`[['ABC','[Array]...']]`);
    });
  });
  describe('object', () => {
    test('default', () => {
      const result = toLiteral({
        undefined: undefined,
        null: null,
        string: 'ABC',
        number: 123456.789,
        boolean: true,
        date: DATE,
        array: ['ABC'],
        object: { string: 'ABC' },
      });
      expect(result).toBe(
        `{undefined:undefined,null:null,string:'ABC',number:123456.789,boolean:true,date:'${ISO_DATE}',array:['ABC'],object:{string:'ABC'}}`,
      );
    });
    test('limit', () => {
      const result = toLiteral(
        {
          object: { string: 'ABC', object: { string: 'abc' } },
        },
        { limit: 1 },
      );
      expect(result).toBe(`{object:{string:'ABC',object:'[object]...'}}`);
    });
    test('sortByKey', () => {
      const result = toLiteral(
        {
          undefined: undefined,
          null: null,
          string: 'ABC',
          number: 123456.789,
          boolean: true,
          date: DATE,
          array: ['ABC'],
          object: { number: 123456.789, string: 'ABC', boolean: true },
        },
        { sortByKey: true },
      );
      expect(result).toBe(
        `{array:['ABC'],boolean:true,date:'${ISO_DATE}',null:null,number:123456.789,object:{boolean:true,number:123456.789,string:'ABC'},string:'ABC',undefined:undefined}`,
      );
    });
  });
  describe('Map', () => {
    test('default', () => {
      const result = toLiteral(
        new Map<string, unknown>([
          ['undefined', undefined],
          ['null', null],
          ['string', 'ABC'],
          ['number', 123456.789],
          ['boolean', true],
          ['date', DATE],
          ['array', ['ABC']],
          ['object', { string: 'ABC' }],
        ]),
      );
      expect(result).toBe(
        `{undefined:undefined,null:null,string:'ABC',number:123456.789,boolean:true,date:'${ISO_DATE}',array:['ABC'],object:{string:'ABC'}}`,
      );
    });
    test('type', () => {
      const result = toLiteral(new Map<string, unknown>(), { mapOutput: 'type' });
      expect(result).toBe("'[Map]'");
    });
    test('omit', () => {
      const result = toLiteral(new Map<string, unknown>(), { mapOutput: 'omit' });
      expect(result).toBe('');
    });
    test('limit', () => {
      const result = toLiteral(
        new Map<string, unknown>([['map', { string: 'ABC', map: new Map<string, unknown>([['string', 'abc']]) }]]),
        { limit: 1 },
      );
      expect(result).toBe(`{map:{string:'ABC',map:'[Map]...'}}`);
    });
  });
  describe('Iterable', () => {
    test('default', () => {
      const result = toLiteral(new Set([undefined, null, 'ABC', 123456.789, true, DATE, ['ABC'], { string: 'ABC' }]));
      expect(result).toBe(`[undefined,null,'ABC',123456.789,true,'${ISO_DATE}',['ABC'],{string:'ABC'}]`);
    });
    test('type', () => {
      const result = toLiteral(new Set<unknown>(), { iterableOutput: 'type' });
      expect(result).toBe("'[Set]'");
    });
    test('omit', () => {
      const result = toLiteral(new Set<unknown>(), { iterableOutput: 'omit' });
      expect(result).toBe('');
    });
    test('limit', () => {
      const result = toLiteral(new Set([new Set(['ABC', new Set(['abc'])])]), {
        limit: 1,
      });
      expect(result).toBe(`[['ABC','[Set]...']]`);
    });
  });
  describe('function', () => {
    test('default', () => {
      const result = toLiteral(function printABC() {
        console.log('ABC');
      });
      expect(result).toBe(`'function printABC() {
                console.log('ABC');
            }'`);
    });
    test('type', () => {
      const result = toLiteral(() => {}, { functionOutput: 'type' });
      expect(result).toBe("'[function]'");
    });
    test('omit', () => {
      const result = toLiteral(() => {}, { functionOutput: 'omit' });
      expect(result).toBe('');
    });
  });
  describe('その他', () => {
    class MyClass {}
    test('default', () => {
      const result = toLiteral(new MyClass());
      expect(result).toBe("'[object Object]'");
    });
    test('type', () => {
      const result = toLiteral(new MyClass(), { instanceOutput: 'type' });
      expect(result).toBe("'[MyClass]'");
    });
    test('omit', () => {
      const result = toLiteral(new MyClass(), { instanceOutput: 'omit' });
      expect(result).toBe('');
    });
  });
  describe('formatting', () => {
    test('formatting=true', () => {
      const result = toLiteral(
        {
          undefined: undefined,
          null: null,
          string: 'ABC',
          number: 123456.789,
          boolean: true,
          date: DATE,
          array: ['ABC'],
          object: { string: 'ABC' },
        },
        { formatting: true },
      );
      expect(result).toEqual(
        `{
    undefined: undefined,
    null: null,
    string: 'ABC',
    number: 123456.789,
    boolean: true,
    date: '${ISO_DATE}',
    array: [
        'ABC'
    ],
    object: {
        string: 'ABC'
    }
}`.replaceAll('\n', '\r\n'),
      );
    });
    test('indent=2, lineSeparator="\\n", separatorSpace=3', () => {
      const result = toLiteral(
        {
          undefined: undefined,
          null: null,
          string: 'ABC',
          number: 123456.789,
          boolean: true,
          date: DATE,
          array: ['ABC'],
          object: { string: 'ABC' },
        },
        { indent: 2, lineSeparator: '\n', separatorSpace: 3 },
      );
      expect(result).toEqual(
        `{
  undefined:   undefined,
  null:   null,
  string:   'ABC',
  number:   123456.789,
  boolean:   true,
  date:   '${ISO_DATE}',
  array:   [
    'ABC'
  ],
  object:   {
    string:   'ABC'
  }
}`,
      );
    });
  });
  describe('key', () => {
    test('enclosureあり', () => {
      const result = toLiteral({
        'a.b': true,
        'a-b': true,
        'a/b': true,
        'a@b': true,
        '0.b': true,
        あいう: true,
      });
      expect(result).toBe("{'a.b':true,'a-b':true,'a/b':true,'a@b':true,'0.b':true,'あいう':true}");
    });
    test('enclosureなし', () => {
      const result = toLiteral({
        abc: true,
        a0: true,
        a_b: true,
      });
      expect(result).toBe('{abc:true,a0:true,a_b:true}');
    });
  });
});
