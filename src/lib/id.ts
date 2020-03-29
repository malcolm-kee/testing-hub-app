import * as React from 'react';

let fakeId = -10_000;

export const getId = () => `forum-${fakeId++}`;

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
