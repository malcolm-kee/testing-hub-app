import { Container } from 'components/container';
import { Header } from 'components/header';
import { Spinner } from 'components/spinner';
import {
  PermutationTemplateForm,
  PermutationTemplateList,
  useAllTemplates,
} from 'modules/permutation';
import * as React from 'react';

export const TestDataTemplatePage = () => {
  const [{ data, status }, refresh] = useAllTemplates();

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data Template</h1>
          {status === 'busy' && <Spinner />}
          <div className="grid gap-2 md:grid-cols-2">
            <PermutationTemplateList templates={data} onChange={refresh} />
            <PermutationTemplateForm onSuccess={refresh} />
          </div>
        </Container>
      </main>
    </>
  );
};
