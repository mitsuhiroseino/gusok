import group from 'src/object/group';

describe('group', () => {
  const OBJECT = {
    '01': { code: '01', name: '北海道', regionCode: '1' },
    '02': { code: '02', name: '青森県', regionCode: '2' },
    '03': { code: '03', name: '岩手県', regionCode: '2' },
    '04': { code: '04', name: '宮城県', regionCode: '2' },
    '05': { code: '05', name: '秋田県', regionCode: '2' },
    '06': { code: '06', name: '山形県', regionCode: '2' },
    '07': { code: '07', name: '福島県', regionCode: '2' },
    '08': { code: '08', name: '茨城県', regionCode: '3' },
    '09': { code: '09', name: '栃木県', regionCode: '3' },
    '10': { code: '10', name: '群馬県', regionCode: '3' },
    '11': { code: '11', name: '埼玉県', regionCode: '3' },
    '12': { code: '12', name: '千葉県', regionCode: '3' },
    '13': { code: '13', name: '東京都', regionCode: '3' },
    '14': { code: '14', name: '神奈川県', regionCode: '3' },
    '15': { code: '15', name: '新潟県', regionCode: '4' },
    '16': { code: '16', name: '富山県', regionCode: '4' },
    '17': { code: '17', name: '石川県', regionCode: '4' },
    '18': { code: '18', name: '福井県', regionCode: '4' },
    '19': { code: '19', name: '山梨県', regionCode: '4' },
    '20': { code: '20', name: '長野県', regionCode: '4' },
    '21': { code: '21', name: '岐阜県', regionCode: '4' },
    '22': { code: '22', name: '静岡県', regionCode: '4' },
    '23': { code: '23', name: '愛知県', regionCode: '4' },
    '24': { code: '24', name: '三重県', regionCode: '4' },
    '25': { code: '25', name: '滋賀県', regionCode: '5' },
    '26': { code: '26', name: '京都府', regionCode: '5' },
    '27': { code: '27', name: '大阪府', regionCode: '5' },
    '28': { code: '28', name: '兵庫県', regionCode: '5' },
    '29': { code: '29', name: '奈良県', regionCode: '5' },
    '30': { code: '30', name: '和歌山県', regionCode: '5' },
    '31': { code: '31', name: '鳥取県', regionCode: '6' },
    '32': { code: '32', name: '島根県', regionCode: '6' },
    '33': { code: '33', name: '岡山県', regionCode: '6' },
    '34': { code: '34', name: '広島県', regionCode: '6' },
    '35': { code: '35', name: '山口県', regionCode: '6' },
    '36': { code: '36', name: '徳島県', regionCode: '7' },
    '37': { code: '37', name: '香川県', regionCode: '7' },
    '38': { code: '38', name: '愛媛県', regionCode: '7' },
    '39': { code: '39', name: '高知県', regionCode: '7' },
    '40': { code: '40', name: '福岡県', regionCode: '8' },
    '41': { code: '41', name: '佐賀県', regionCode: '8' },
    '42': { code: '42', name: '長崎県', regionCode: '8' },
    '43': { code: '43', name: '熊本県', regionCode: '8' },
    '44': { code: '44', name: '大分県', regionCode: '8' },
    '45': { code: '45', name: '宮崎県', regionCode: '8' },
    '46': { code: '46', name: '鹿児島県', regionCode: '8' },
    '47': { code: '47', name: '沖縄県', regionCode: '9' },
  };
  test('グループ化', () => {
    const result = group(OBJECT, (key, item: any) => item.regionCode);
    expect(result).toEqual({
      '1': {
        '01': {
          code: '01',
          name: '北海道',
          regionCode: '1',
        },
      },
      '2': {
        '02': {
          code: '02',
          name: '青森県',
          regionCode: '2',
        },
        '03': {
          code: '03',
          name: '岩手県',
          regionCode: '2',
        },
        '04': {
          code: '04',
          name: '宮城県',
          regionCode: '2',
        },
        '05': {
          code: '05',
          name: '秋田県',
          regionCode: '2',
        },
        '06': {
          code: '06',
          name: '山形県',
          regionCode: '2',
        },
        '07': {
          code: '07',
          name: '福島県',
          regionCode: '2',
        },
      },
      '3': {
        '08': {
          code: '08',
          name: '茨城県',
          regionCode: '3',
        },
        '09': {
          code: '09',
          name: '栃木県',
          regionCode: '3',
        },
        '10': {
          code: '10',
          name: '群馬県',
          regionCode: '3',
        },
        '11': {
          code: '11',
          name: '埼玉県',
          regionCode: '3',
        },
        '12': {
          code: '12',
          name: '千葉県',
          regionCode: '3',
        },
        '13': {
          code: '13',
          name: '東京都',
          regionCode: '3',
        },
        '14': {
          code: '14',
          name: '神奈川県',
          regionCode: '3',
        },
      },
      '4': {
        '15': {
          code: '15',
          name: '新潟県',
          regionCode: '4',
        },
        '16': {
          code: '16',
          name: '富山県',
          regionCode: '4',
        },
        '17': {
          code: '17',
          name: '石川県',
          regionCode: '4',
        },
        '18': {
          code: '18',
          name: '福井県',
          regionCode: '4',
        },
        '19': {
          code: '19',
          name: '山梨県',
          regionCode: '4',
        },
        '20': {
          code: '20',
          name: '長野県',
          regionCode: '4',
        },
        '21': {
          code: '21',
          name: '岐阜県',
          regionCode: '4',
        },
        '22': {
          code: '22',
          name: '静岡県',
          regionCode: '4',
        },
        '23': {
          code: '23',
          name: '愛知県',
          regionCode: '4',
        },
        '24': {
          code: '24',
          name: '三重県',
          regionCode: '4',
        },
      },
      '5': {
        '25': {
          code: '25',
          name: '滋賀県',
          regionCode: '5',
        },
        '26': {
          code: '26',
          name: '京都府',
          regionCode: '5',
        },
        '27': {
          code: '27',
          name: '大阪府',
          regionCode: '5',
        },
        '28': {
          code: '28',
          name: '兵庫県',
          regionCode: '5',
        },
        '29': {
          code: '29',
          name: '奈良県',
          regionCode: '5',
        },
        '30': {
          code: '30',
          name: '和歌山県',
          regionCode: '5',
        },
      },
      '6': {
        '31': {
          code: '31',
          name: '鳥取県',
          regionCode: '6',
        },
        '32': {
          code: '32',
          name: '島根県',
          regionCode: '6',
        },
        '33': {
          code: '33',
          name: '岡山県',
          regionCode: '6',
        },
        '34': {
          code: '34',
          name: '広島県',
          regionCode: '6',
        },
        '35': {
          code: '35',
          name: '山口県',
          regionCode: '6',
        },
      },
      '7': {
        '36': {
          code: '36',
          name: '徳島県',
          regionCode: '7',
        },
        '37': {
          code: '37',
          name: '香川県',
          regionCode: '7',
        },
        '38': {
          code: '38',
          name: '愛媛県',
          regionCode: '7',
        },
        '39': {
          code: '39',
          name: '高知県',
          regionCode: '7',
        },
      },
      '8': {
        '40': {
          code: '40',
          name: '福岡県',
          regionCode: '8',
        },
        '41': {
          code: '41',
          name: '佐賀県',
          regionCode: '8',
        },
        '42': {
          code: '42',
          name: '長崎県',
          regionCode: '8',
        },
        '43': {
          code: '43',
          name: '熊本県',
          regionCode: '8',
        },
        '44': {
          code: '44',
          name: '大分県',
          regionCode: '8',
        },
        '45': {
          code: '45',
          name: '宮崎県',
          regionCode: '8',
        },
        '46': {
          code: '46',
          name: '鹿児島県',
          regionCode: '8',
        },
      },
      '9': {
        '47': {
          code: '47',
          name: '沖縄県',
          regionCode: '9',
        },
      },
    });
  });
});
