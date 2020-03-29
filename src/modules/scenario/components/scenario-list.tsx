import * as React from 'react';
import { Scenario } from '../scenario.type';

export type ScenarioListProps = {
  scenarios: Scenario[];
};

export const ScenarioList = (props: ScenarioListProps) => {
  return (
    <ul>
      {props.scenarios.map((scenario) => (
        <li className="px-2 py-2" key={scenario._id}>
          {scenario.title}
        </li>
      ))}
    </ul>
  );
};
