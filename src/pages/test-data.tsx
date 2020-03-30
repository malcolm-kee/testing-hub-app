import * as React from 'react';
import { Header } from 'components/header';
import { Container } from 'components/container';

export const TestDataPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data</h1>
        </Container>
      </main>
    </>
  );
};
