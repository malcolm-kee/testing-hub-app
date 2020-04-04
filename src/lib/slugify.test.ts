import { slugify } from './slugify';

test.each([
  ['name', 'name'],
  [' Customer Name ', 'customer-name'],
])(`slugify('%s') -> '%s'`, (oriText, result) => {
  expect(slugify(oriText)).toBe(result);
});
