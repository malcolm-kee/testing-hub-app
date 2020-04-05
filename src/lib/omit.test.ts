import { omit } from './omit';

test(`omit`, () => {
  expect(
    omit(
      {
        a: 'A',
        b: 'B',
      },
      ['a']
    )
  ).toStrictEqual({
    b: 'B',
  });
});
