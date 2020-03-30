import { Button } from 'components/button';
import { Dialog } from 'components/dialog';
import { Header } from 'components/header';
import { Spinner } from 'components/spinner';
import { ScenarioForm, ScenarioList, useAllScenarios } from 'modules/scenario';
import * as React from 'react';

export const ScenarioPage = () => {
  const [scenarios, status, refresh] = useAllScenarios();
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-2 px-4">
        {status === 'busy' && <Spinner />}
        <main className="grid md:grid-cols-2 gap-2">
          <div className="mb-4">
            <div className="px-2 py-6 md:hidden">
              <Button onClick={() => setShowDialog(true)}>Add</Button>
            </div>
            <ScenarioList scenarios={scenarios} />
          </div>
          <div className="hidden md:block">
            <ScenarioForm onSuccess={refresh} />
          </div>
          <Dialog
            isOpen={showDialog}
            aria-label="Scenario Form"
            onDismiss={() => setShowDialog(false)}
          >
            <ScenarioForm onSuccess={refresh} />
          </Dialog>
        </main>
      </div>
    </>
  );
};
