import { Checkbox } from 'components/checkbox';
import { SelectField } from 'components/select-field';
import { TextField } from 'components/text-field';
import * as React from 'react';
import {
  PermutationFieldConfig,
  PermutationFieldValue,
} from '../permutation.type';
import { TextareaField } from 'components/textarea-field';

export type PermutationFieldProps<Value extends PermutationFieldValue> = {
  config: Omit<PermutationFieldConfig, '_id'>;
  value?: Value;
  onChangeValue?: (value: Value) => void;
  preview?: boolean;
  readOnly?: boolean;
};

export const PermutationField = <Value extends PermutationFieldValue>({
  config,
  value,
  onChangeValue,
  preview,
  readOnly,
}: PermutationFieldProps<Value>) => {
  switch (config.fieldType) {
    case 'text':
      return (
        <TextField
          label={
            preview && config.isRequired ? `${config.name} *` : config.name
          }
          required={!preview && config.isRequired}
          readOnly={readOnly}
          value={value as string}
          onChangeValue={onChangeValue as any}
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
          value={value as string}
          onChangeValue={onChangeValue as any}
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
          value={value as string}
          onChangeValue={onChangeValue as any}
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
          checked={value as boolean}
          onChange={
            onChangeValue && ((ev) => (onChangeValue as any)(ev.target.checked))
          }
        />
      );

    default:
      return null;
  }
};
