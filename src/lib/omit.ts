const hasOwnProperty = Object.prototype.hasOwnProperty;

export const omit = <Original extends {}, Key extends keyof Original>(
  obj: Original,
  keysToOmit: Key[]
): Omit<Original, Key> => {
  const result: Partial<Original> = {};

  for (const prop in obj) {
    if (
      hasOwnProperty.call(obj, prop) &&
      (keysToOmit as string[]).indexOf(prop) === -1
    ) {
      result[prop] = obj[prop];
    }
  }

  return result as Omit<Original, Key>;
};
