import { LinkButton } from 'components/button';
import { Container } from 'components/container';
import { Dialog } from 'components/dialog';
import { Header } from 'components/header';
import { Spinner } from 'components/spinner';
import {
  PermutationTemplate,
  PermutationTemplateForm,
  PermutationTemplateList,
  useAllTemplates,
} from 'modules/permutation';
import * as React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { testDataUrl } from 'routes';

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
          <div>
            <LinkButton to={testDataUrl} variant="none" size="small">
              <FiChevronLeft aria-hidden focusable={false} /> Back to Test Data
            </LinkButton>
          </div>
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
