import * as React from 'react';
import { UiStatus } from 'type';
import { fetchJson } from './fetch-json';

const dataCache = new Map<string, any>();

export const useRemoteData = <Data>(
  url: string,
  initialData: Data | (() => Data)
) => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [data, setData] = React.useState<Data>(
    dataCache.get(url) || initialData
  );
  const [error, setErrorMsg] = React.useState('');

  const refreshData = React.useCallback(
    function fetchTemplateData() {
      fetchJson(url)
        .then((result) => {
          setData(result as Data);
          dataCache.set(url, result);
          setStatus('ok');
        })
        .catch((err: Error) => {
          setStatus('error');
          setErrorMsg(err.message);
        });
    },
    [url]
  );

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  return [{ data, status, error }, refreshData] as const;
};
