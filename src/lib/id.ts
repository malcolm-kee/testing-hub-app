import * as React from 'react';

let fakeId = 0;

export function getId(inNumber: true): number;
export function getId(inNumber?: false): string;
export function getId(inNumber?: boolean) {
  return inNumber ? fakeId++ : `forum-${fakeId++}`;
}

export const useId = (providedId: string | undefined) => {
  const [fallbackId, setFallbackId] = React.useState(providedId);

  const result = providedId || fallbackId;

  React.useEffect(() => {
    if (!result) {
      setFallbackId(getId());
    }
  }, [result]);

  return result;
};
