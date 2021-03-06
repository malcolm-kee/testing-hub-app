import * as React from 'react';
import { Header } from 'components/header';
import { Container } from 'components/container';

export const PageNotFound = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl">Page Not Found</h1>
        </Container>
      </main>
    </>
  );
};
