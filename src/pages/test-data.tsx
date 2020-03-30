import * as React from 'react';
import { Header } from 'components/header';
import { Container } from 'components/container';
import { PermutationTemplateForm } from 'modules/permutation/components/permutation-template-form';

export const TestDataPage = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data</h1>
          <PermutationTemplateForm onSuccess={console.log} />
        </Container>
      </main>
    </>
  );
};
