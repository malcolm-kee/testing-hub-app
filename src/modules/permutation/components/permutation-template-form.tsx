import { Button } from 'components/button';
import { Dialog } from 'components/dialog';
import { AddButton, DeleteButton, EditButton } from 'components/icon-button';
import { TextField } from 'components/text-field';
import { isDefined } from 'lib/is';
import * as React from 'react';
import { createTemplate, updateTemplate } from '../permutation.service';
import {
  PermutationFieldConfig,
  PermutationTemplate,
} from '../permutation.type';
import { PermutationField } from './permutation-field';
import { PermutationTemplateFieldEditor } from './permutation-template-field-editor';

export type PermutationTemplateFormProps = {
  onSuccess: () => void;
  currentValue?: PermutationTemplate;
};

export const PermutationTemplateForm = (
  props: PermutationTemplateFormProps
) => {
  const [name, setName] = React.useState(
    props.currentValue ? props.currentValue.name : ''
  );
  const [fields, setFields] = React.useState<Array<FieldWithoutId>>(
    props.currentValue ? props.currentValue.fields : []
  );
  const [focusedFieldIndex, setFocusedFieldIndex] = React.useState<
    number | undefined
  >(undefined);

  const [showAddForm, setShowAddForm] = React.useState(false);

  React.useEffect(() => {
    if (props.currentValue) {
      setName(props.currentValue.name);
      setFields(props.currentValue.fields);
    }
  }, [props.currentValue]);

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          Promise.resolve(
            props.currentValue
              ? updateTemplate({
                  _id: props.currentValue._id,
                  name,
                  fields,
                })
              : createTemplate({
                  name,
                  fields,
                })
          ).then(() => {
            setName('');
            setFields([]);
            props.onSuccess();
          });
        }}
      >
        <div className="mx-2 font-semibold text-lg mb-2">
          {props.currentValue ? 'Edit' : 'Create'} Template
        </div>
        <TextField
          label="Template Name"
          value={name}
          onChangeValue={setName}
          required
        />
        <div className="shadow bg-white rounded p-2 my-3">
          <div className="flex justify-between items-center px-2 pb-2">
            <p className="text-xl">Fields</p>
            <AddButton
              onClick={() => setShowAddForm(true)}
              aria-label="Add Field"
            />
          </div>
          <ul>
            {fields.map((field, i) => (
              <li className="flex items-center mb-2" key={i}>
                <div className="flex-1">
                  <PermutationField config={field} />
                </div>
                <div className="pl-2">
                  <EditButton
                    onClick={() => setFocusedFieldIndex(i)}
                    aria-label="Edit field"
                    variant="none"
                  />
                  <DeleteButton
                    onClick={() =>
                      setFields((fs) => fs.filter((_, index) => index !== i))
                    }
                    aria-label="Delete field"
                    variant="none"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2 py-3">
          <Button type="submit">
            {props.currentValue ? 'Save' : 'Add'} Template
          </Button>
        </div>
      </form>
      <Dialog
        aria-label="Add Field Form"
        isOpen={showAddForm}
        onDismiss={() => setShowAddForm(false)}
      >
        <PermutationTemplateFieldEditor
          onSave={(newField) => {
            setFields((fs) => fs.concat(newField));
            setShowAddForm(false);
          }}
        />
      </Dialog>
      <Dialog
        aria-label="Edit Field Form"
        isOpen={isDefined(focusedFieldIndex)}
        onDismiss={() => setFocusedFieldIndex(undefined)}
      >
        <PermutationTemplateFieldEditor
          currentValue={fields[focusedFieldIndex as number]}
          onSave={(newField) => {
            setFields((fs) =>
              fs.map((field, index) =>
                index === focusedFieldIndex ? newField : field
              )
            );
            setFocusedFieldIndex(undefined);
          }}
        />
      </Dialog>
    </>
  );
};

type FieldWithoutId = Omit<PermutationFieldConfig, '_id'>;
