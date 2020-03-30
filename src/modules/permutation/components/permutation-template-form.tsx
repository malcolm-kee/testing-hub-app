import * as React from 'react';
import { createTemplate } from '../permutation.service';
import { TextField } from 'components/text-field';
import {
  PermutationTemplate,
  PermutationTemplateField,
} from '../permutation.type';
import { Button } from 'components/button';
import { FiPlus } from 'react-icons/fi';

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
    props.currentValue ? props.currentValue.fields : [FIELD_DEFAULT]
  );

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        createTemplate({
          name,
          fields,
        }).then(() => {
          setName('');
          setFields([FIELD_DEFAULT]);
          props.onSuccess();
        });
      }}
    >
      <TextField
        label="Template Name"
        value={name}
        onChangeValue={setName}
        required
      />
      <div className="flex justify-between items-center px-2 py-3">
        <p className="text-xl">Fields</p>
        <Button
          onClick={() => setFields((f) => f.concat(FIELD_DEFAULT))}
          aria-label="Add Field"
        >
          <FiPlus aria-hidden focusable={false} />
        </Button>
      </div>
      {fields.map((field, index) => (
        <fieldset key={index}>
          <TextField
            label="Label"
            value={field.name}
            onChangeValue={(newName) =>
              setFields((fs) =>
                fs.map((f, i) =>
                  i === index
                    ? {
                        ...f,
                        name: newName,
                      }
                    : f
                )
              )
            }
          />
        </fieldset>
      ))}
    </form>
  );
};

const FIELD_DEFAULT: FieldWithoutId = {
  name: '',
  fieldType: 'text',
  options: [],
};

type FieldWithoutId = Omit<PermutationTemplateField, '_id'>;
