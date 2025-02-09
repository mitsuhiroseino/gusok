import { isValid } from 'date-fns';
import dayjs from 'dayjs';

describe('dayjs', () => {
  const date = new Date();
  const dateStr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  test('YMD', () => {
    const dateJp = isValid('2000年02月31日', 'yyyy年MM月dd日', new Date());

    expect(dateJp).toEqual('1999-11-02T15:40:56.789Z');
  });
});
