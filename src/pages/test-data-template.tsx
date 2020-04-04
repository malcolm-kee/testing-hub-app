import { Container } from 'components/container';
import { Header } from 'components/header';
import { Spinner } from 'components/spinner';
import {
  PermutationTemplateForm,
  PermutationTemplateList,
  useAllTemplates,
  PermutationTemplate,
} from 'modules/permutation';
import * as React from 'react';
import { Dialog } from 'components/dialog';

export const TestDataTemplatePage = () => {
  const [{ data, status }, refresh] = useAllTemplates();
  const [focusedTemplate, setFocusedTemplate] = React.useState<
    PermutationTemplate | undefined
  >(undefined);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl text-gray-800">Test Data Type</h1>
          {status === 'busy' && <Spinner />}
          <div className="grid gap-2 md:grid-cols-2">
            <PermutationTemplateList
              templates={data}
              onChange={refresh}
              onSelect={setFocusedTemplate}
            />
            <PermutationTemplateForm onSuccess={refresh} />
          </div>
        </Container>
      </main>
      <Dialog
        aria-label="Update Template Form"
        isOpen={!!focusedTemplate}
        onDismiss={() => setFocusedTemplate(undefined)}
      >
        {focusedTemplate && (
          <PermutationTemplateForm
            onSuccess={() => {
              refresh();
              setFocusedTemplate(undefined);
            }}
            currentValue={focusedTemplate}
          />
        )}
      </Dialog>
    </>
  );
};
