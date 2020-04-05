import { Container } from 'components/container';
import { Header } from 'components/header';
import { PermutationList } from 'modules/permutation';
import * as React from 'react';

export const TestDataPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data</h1>
          <PermutationList />
        </Container>
      </main>
    </>
  );
};
