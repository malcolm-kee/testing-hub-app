import * as React from 'react';
import { UiStatus } from 'type';
import { fetchJson } from './fetch-json';

export const useRemoteData = <Data>(
  url: string,
  initialData: Data | (() => Data)
) => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [data, setData] = React.useState(initialData);

  const refreshData = React.useCallback(
    function fetchTemplateData() {
      fetchJson(url)
        .then((result) => {
          setData(result as Data);
          setStatus('ok');
        })
        .catch(() => {
          setStatus('error');
        });
    },
    [url]
  );

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  return [{ data, status }, refreshData] as const;
};
