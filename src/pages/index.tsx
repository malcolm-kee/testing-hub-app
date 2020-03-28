import * as React from 'react';
import { Spinner } from 'components/spinner';
import { useAllScenarios } from 'services/scenario';

export const IndexPage = () => {
  const [scenarios, status] = useAllScenarios();

  return (
    <div>
      {status === 'busy' && <Spinner />}
      <ul>
        {scenarios.map((scenario) => (
          <li key={scenario._id}>{scenario.title}</li>
        ))}
      </ul>
    </div>
  );
};
