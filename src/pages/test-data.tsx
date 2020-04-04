import { LinkButton } from 'components/button';
import { Container } from 'components/container';
import { Header } from 'components/header';
import * as React from 'react';
import { testDataTemplateUrl } from 'routes';

export const TestDataPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data</h1>
          <div>
            <LinkButton to={testDataTemplateUrl}>Manage Template</LinkButton>
          </div>
        </Container>
      </main>
    </>
  );
};
