import fetch from 'unfetch';

export type RequestInitPlus = RequestInit & {
  data?: object;
};

export const fetchJson = (
  url: RequestInfo,
  { headers, data, ...init }: RequestInitPlus = {}
): Promise<unknown> =>
  fetch(url, {
    headers: {
      ...(init.method && init.method !== 'GET'
        ? {
            'Content-Type': 'application/json',
          }
        : {}),
      Accept: 'application/json',
      ...headers,
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...init,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res
        .json()
        .catch(() =>
          // `.json()` fails so we fallback to get plain text
          res.text().then((resultText) => {
            throw Error(resultText);
          })
        )
        .then((result) => {
          const errorText = Array.isArray(result && result.message)
            ? result.message[0]
            : result && result.message;
          throw Error(errorText);
        });
    }
  });
