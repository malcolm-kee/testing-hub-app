import { LinkButton } from 'components/button';
import { Container } from 'components/container';
import { Header } from 'components/header';
import * as React from 'react';
import * as routes from 'routes';

export const IndexPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="flex items-center justify-around px-2 py-3">
            <LinkButton to={routes.scenarioUrl}>Scenarios</LinkButton>
            <LinkButton to={routes.testDataUrl}>Test Data</LinkButton>
          </div>
        </Container>
      </main>
    </>
  );
};
