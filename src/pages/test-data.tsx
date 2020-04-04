import { LinkButton } from 'components/button';
import { Container } from 'components/container';
import { Header } from 'components/header';
import * as React from 'react';
import { testDataTemplateUrl } from 'routes';
import { PermutationList } from 'modules/permutation';

export const TestDataPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data</h1>
          <PermutationList />
          <div>
            <LinkButton to={testDataTemplateUrl}>
              Manage Test Data Type
            </LinkButton>
          </div>
        </Container>
      </main>
    </>
  );
};
