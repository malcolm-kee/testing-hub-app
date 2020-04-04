import { Button } from 'components/button';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from 'components/disclosure';
import { Input } from 'components/input';
import { SelectField } from 'components/select-field';
import { TextField } from 'components/text-field';
import { slugify } from 'lib/slugify';
import * as React from 'react';
import { FiMinus } from 'react-icons/fi';
import { FieldType, PermutationFieldConfig } from '../permutation.type';
import { PermutationField } from './permutation-field';

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
  const [fieldKey, setFieldKey] = React.useState(
    props.currentValue ? props.currentValue.fieldKey : ''
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
  const [isKeyDirty, setIsKeyDirty] = React.useState(false);

  return (
    <div className="grid grid-cols-2 gap-2">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          props.onSave({
            name,
            fieldType,
            fieldKey,
            options:
              fieldType === 'select' || fieldType === 'multiselect'
                ? options
                : [],
          });
        }}
      >
        <TextField
          label="Label"
          value={name}
          onChangeValue={setName}
          onBlur={
            isKeyDirty || props.currentValue
              ? undefined
              : () => {
                  setFieldKey(slugify(name));
                }
          }
          required
        />
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
                      onBlur={() => {
                        if (!opt.value && opt.label) {
                          setOptions((opts) =>
                            opts.map((o, index) =>
                              index === i
                                ? {
                                    ...o,
                                    value: opt.label.toLowerCase(),
                                  }
                                : o
                            )
                          );
                        }
                      }}
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
        <Disclosure>
          <div className="p-2 text-right">
            <DisclosureButton>Advanced Settings</DisclosureButton>
          </div>
          <DisclosurePanel>
            <TextField
              value={fieldKey}
              onChangeValue={(newFieldKey) => {
                setFieldKey(newFieldKey);
                setIsKeyDirty(true);
              }}
              readOnly={!!props.currentValue}
              required
              label="Field Key"
              helpText="Determine the property name of the generated data"
            />
          </DisclosurePanel>
        </Disclosure>
        <div className="py-5">
          <Button type="submit">
            {props.currentValue ? 'Save' : 'Add'} Field
          </Button>
        </div>
      </form>
      <div>
        <p className="text-lg font-semibold mb-2">Preview</p>
        <PermutationField
          config={{
            fieldType,
            name,
            options,
            fieldKey,
          }}
        />
      </div>
    </div>
  );
};
