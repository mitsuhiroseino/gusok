import asAsync from 'src/function/asAsync';

describe('asAsync', () => {
  test('待ちなし', async () => {
    const fn = jest.fn((arg0: string, arg1: number): boolean => {
      return arg0 === String(arg1);
    });
    const result = await asAsync(fn, ['123', 123]);
  });
});
