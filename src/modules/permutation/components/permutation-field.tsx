import { Checkbox } from 'components/checkbox';
import { SelectField } from 'components/select-field';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { PermutationFieldConfig } from '../permutation.type';
import { TextareaField } from 'components/textarea-field';

export type PermutationFieldProps = {
  config: Omit<PermutationFieldConfig, '_id'>;
  preview?: boolean;
  readOnly?: boolean;
};

export const PermutationField = ({
  config,
  preview,
  readOnly,
}: PermutationFieldProps) => {
  switch (config.fieldType) {
    case 'text':
      return (
        <TextField
          label={
            preview && config.isRequired ? `${config.name} *` : config.name
          }
          required={!preview && config.isRequired}
          readOnly={readOnly}
        />
      );

    case 'textarea':
      return (
        <TextareaField
          label={
            preview && config.isRequired ? `${config.name} *` : config.name
          }
          required={!preview && config.isRequired}
          readOnly={readOnly}
        />
      );

    case 'select':
      return (
        <SelectField
          label={
            preview && config.isRequired ? `${config.name} *` : config.name
          }
          required={!preview && config.isRequired}
          disabled={readOnly}
        >
          {config.options.map((opt, i) => (
            <option value={opt.value} key={i}>
              {opt.label}
            </option>
          ))}
        </SelectField>
      );

    case 'checkbox':
      return (
        <Checkbox
          label={
            preview && config.isRequired ? `${config.name} *` : config.name
          }
          disabled={readOnly}
          className="px-1 py-3"
          required={!preview && config.isRequired}
        />
      );

    default:
      return null;
  }
};
