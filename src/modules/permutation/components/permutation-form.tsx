import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Button } from 'components/button';
import * as React from 'react';
import {
  Permutation,
  PermutationFieldValue,
  PermutationTemplate,
} from '../permutation.type';
import { PermutationField } from './permutation-field';

export type PermutationFormProps = {
  template: PermutationTemplate;
};

export const PermutationForm = (props: PermutationFormProps) => {
  const [{ values }, dispatch] = React.useReducer(
    reducer,
    props.template,
    (template) => reducer(DEFAULT_STATE, actions.init(template))
  );

  React.useEffect(() => {
    dispatch(actions.init(props.template));
  }, [props.template]);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <div className="p-2">
        {props.template.fields.map((field) => (
          <div key={field._id}>
            <PermutationField
              config={field}
              value={values[field.fieldKey]}
              onChangeValue={(val) =>
                dispatch(
                  actions.updateValue({
                    fieldKey: field.fieldKey,
                    value: val,
                  })
                )
              }
            />
          </div>
        ))}
        <div className="p-2">
          <Button type="submit">Create</Button>
        </div>
      </div>
    </form>
  );
};

type FormValues = Permutation['fieldValues'];

type FormState = {
  template: PermutationTemplate | null;
  values: FormValues;
};

const DEFAULT_STATE = {
  template: null,
  values: {},
} as FormState;

const { reducer, actions } = createSlice({
  name: 'permutationForm',
  initialState: DEFAULT_STATE,
  reducers: {
    init: (state, action: PayloadAction<PermutationTemplate>) => {
      state.template = action.payload;
      state.template.fields.forEach((field) => {
        const defaultValue: PermutationFieldValue =
          field.fieldType === 'checkbox'
            ? false
            : field.fieldType === 'multiselect'
            ? []
            : '';

        state.values[field.fieldKey] = defaultValue;
      });
    },
    updateValue: (
      state,
      {
        payload,
      }: PayloadAction<{ fieldKey: string; value: PermutationFieldValue }>
    ) => {
      state.values[payload.fieldKey] = payload.value;
    },
  },
});
