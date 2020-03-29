import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { createScenario } from '../scenario.service';
import { Scenario } from '../scenario.type';

export type ScenarioFormProps = {
  onSuccess: () => void;
  currentValue?: Scenario;
};

export const ScenarioForm = (props: ScenarioFormProps) => {
  const [title, setTitle] = React.useState(
    props.currentValue ? props.currentValue.title : ''
  );
  const [startUrl, setStartUrl] = React.useState(
    props.currentValue ? props.currentValue.startUrl : ''
  );
  const [steps, setSteps] = React.useState(
    props.currentValue
      ? props.currentValue.steps
      : [
          {
            action: '',
            result: '',
          },
        ]
  );

  const isEdit = !!props.currentValue;

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        createScenario({
          title,
          startUrl,
          steps,
          tags: [],
          permutationIds: [],
        }).then(() => {
          setTitle('');
          setStartUrl('');
          setSteps([]);
          props.onSuccess();
        });
      }}
    >
      <div className="mx-2 font-semibold text-lg mb-2">
        {isEdit ? 'Edit' : 'Create'} Scenario
      </div>
      <TextField
        label="Title"
        value={title}
        onChangeValue={setTitle}
        required
      />
      <TextField
        label="Start Url"
        value={startUrl}
        onChangeValue={setStartUrl}
        required
      />
      <div className="py-4 border-gray-300 border-t border-b my-3">
        <div className="flex justify-between items-start px-1">
          <p className="text-lg">Steps</p>
          <Button
            onClick={() =>
              setSteps((prevSteps) =>
                prevSteps.concat({
                  action: '',
                  result: '',
                })
              )
            }
          >
            Add Step
          </Button>
        </div>
        {steps.map((step, index) => (
          <fieldset key={index}>
            <div className="md:flex items-center py-2">
              <legend className="flex-initial px-2">Step {index + 1}</legend>
              <div className="flex-1">
                <TextField
                  label="Action"
                  value={step.action}
                  onChangeValue={(action) =>
                    setSteps((prevSteps) =>
                      prevSteps.map((pStep, i) =>
                        i === index
                          ? {
                              ...pStep,
                              action,
                            }
                          : pStep
                      )
                    )
                  }
                  required
                />
                <TextField
                  label="Expected Result"
                  value={step.result}
                  onChangeValue={(result) =>
                    setSteps((prevSteps) =>
                      prevSteps.map((pStep, i) =>
                        i === index
                          ? {
                              ...pStep,
                              result,
                            }
                          : pStep
                      )
                    )
                  }
                  required
                />
              </div>
            </div>
          </fieldset>
        ))}
      </div>
      <div className="py-2">
        <Button type="submit">{props.currentValue ? 'Save' : 'Add'}</Button>
      </div>
    </form>
  );
};
