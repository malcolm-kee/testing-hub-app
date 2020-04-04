export const isDefined = <T>(val: T | undefined): val is T =>
  typeof val !== 'undefined';
