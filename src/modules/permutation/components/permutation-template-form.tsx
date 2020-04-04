import { Button } from 'components/button';
import { Dialog } from 'components/dialog';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { FiPlus } from 'react-icons/fi';
import { createTemplate } from '../permutation.service';
import {
  PermutationTemplate,
  PermutationFieldConfig,
} from '../permutation.type';
import { PermutationTemplateFieldEditor } from './permutation-template-field-editor';
import { PermutationField } from './permutation-field';

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

  const [showAddForm, setShowAddForm] = React.useState(false);

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          createTemplate({
            name,
            fields,
          }).then(() => {
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
        <div className="flex justify-between items-center px-2 py-3">
          <p className="text-xl">Fields</p>
          <Button onClick={() => setShowAddForm(true)} aria-label="Add Field">
            <FiPlus aria-hidden focusable={false} />
          </Button>
        </div>
        {fields.map((field, i) => (
          <PermutationField config={field} readOnly key={i} />
        ))}
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
    </>
  );
};

type FieldWithoutId = Omit<PermutationFieldConfig, '_id'>;
