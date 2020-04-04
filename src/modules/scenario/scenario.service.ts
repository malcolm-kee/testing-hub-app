import { fetchJson } from 'lib/fetch-json';
import { useRemoteData } from 'lib/use-remote-data';
import { Scenario } from './scenario.type';

const scenarioUrl = process.env.REACT_APP_SCENARIO_URL as string;

export const useAllScenarios = () => {
  return useRemoteData(scenarioUrl, [] as Scenario[]);
};

export const createScenario = (data: Omit<Scenario, '_id'>) =>
  fetchJson(scenarioUrl, {
    method: 'POST',
    data,
  }) as Promise<Scenario>;
