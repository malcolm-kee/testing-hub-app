export const isDefined = <T>(val: T | undefined): val is T =>
  typeof val !== 'undefined';

export const isNumber = <Other>(val: number | Other): val is number =>
  typeof val === 'number';
