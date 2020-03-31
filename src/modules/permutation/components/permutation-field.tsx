import { SelectField } from 'components/select-field';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { PermutationFieldConfig } from '../permutation.type';

export type PermutationFieldProps = {
  config: Omit<PermutationFieldConfig, '_id'>;
  readOnly?: boolean;
};

export const PermutationField = ({
  config,
  readOnly,
}: PermutationFieldProps) => {
  switch (config.fieldType) {
    case 'text':
      return <TextField label={config.name} readOnly={readOnly} />;

    case 'select':
      return (
        <SelectField label={config.name} disabled={readOnly}>
          {config.options.map((opt, i) => (
            <option value={opt.value} key={i}>
              {opt.label}
            </option>
          ))}
        </SelectField>
      );

    default:
      return null;
  }
};
