import { Button } from 'components/button';
import { Input } from 'components/input';
import { SelectField } from 'components/select-field';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { FiMinus } from 'react-icons/fi';
import { FieldType, PermutationFieldConfig } from '../permutation.type';

type FieldWithoutId = Omit<PermutationFieldConfig, '_id'>;

type FieldEditorProps = {
  currentValue?: FieldWithoutId;
  onSave: (data: FieldWithoutId) => void;
};

export const PermutationTemplateFieldEditor = (props: FieldEditorProps) => {
  const [name, setName] = React.useState(
    props.currentValue ? props.currentValue.name : ''
  );
  const [fieldType, setFieldType] = React.useState(
    props.currentValue ? props.currentValue.fieldType : 'text'
  );
  const [options, setOptions] = React.useState(
    props.currentValue
      ? props.currentValue.options
      : [
          {
            label: '',
            value: '',
          },
        ]
  );

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onSave({
          name,
          fieldType,
          options:
            fieldType === 'select' || fieldType === 'multiselect'
              ? options
              : [],
        });
      }}
      className="max-w-lg"
    >
      <TextField label="Label" value={name} onChangeValue={setName} required />
      <SelectField
        label="Control Type"
        value={fieldType}
        onChangeValue={(newFieldType) =>
          setFieldType(newFieldType as FieldType)
        }
        required
        noEmptyOption
      >
        <option value="text">Text</option>
        <option value="textarea">Text Area</option>
        <option value="checkbox">Checkbox</option>
        <option value="select">Select</option>
        <option value="multiselect">Multi Select</option>
      </SelectField>
      {(fieldType === 'select' || fieldType === 'multiselect') && (
        <table className="my-3">
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt, i) => (
              <tr key={i}>
                <td>
                  <Input
                    value={opt.label}
                    onChangeValue={(val) =>
                      setOptions((opts) =>
                        opts.map((o, index) =>
                          index === i
                            ? {
                                ...o,
                                label: val,
                              }
                            : o
                        )
                      )
                    }
                    required
                  />
                </td>
                <td>
                  <Input
                    value={opt.value}
                    onChangeValue={(val) =>
                      setOptions((opts) =>
                        opts.map((o, index) =>
                          index === i
                            ? {
                                ...o,
                                value: val,
                              }
                            : o
                        )
                      )
                    }
                    required
                  />
                </td>
                <td>
                  <Button
                    onClick={() =>
                      setOptions((opts) =>
                        opts.filter((_, index) => index !== i)
                      )
                    }
                  >
                    <FiMinus aria-hidden focusable={false} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <Button
                  onClick={() =>
                    setOptions((opts) =>
                      opts.concat({
                        label: '',
                        value: '',
                      })
                    )
                  }
                >
                  Add Option
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      <div className="py-5">
        <Button type="submit">
          {props.currentValue ? 'Save' : 'Add'} Field
        </Button>
      </div>
    </form>
  );
};
