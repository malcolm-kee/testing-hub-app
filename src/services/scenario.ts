import { fetchJson } from 'lib/fetch-json';
import * as React from 'react';
import { UiStatus } from 'type';

const scenarioUrl = process.env.REACT_APP_SCENARIO_URL as string;

export type ScenarioStep = {
  action: string;
  result: string;
};

export type Scenario = {
  _id: string;
  title: string;
  steps: ScenarioStep[];
  tags: string[];
  startUrl: string;
  permutationIds: string[];
};

export const useAllScenarios = () => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [scenarios, setScenarios] = React.useState<Scenario[]>([]);

  const refreshData = React.useCallback(function fetchScenarioData() {
    fetchJson(scenarioUrl)
      .then((result) => {
        setScenarios(result as Scenario[]);
        setStatus('ok');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  return [scenarios, status, refreshData] as const;
};
