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
