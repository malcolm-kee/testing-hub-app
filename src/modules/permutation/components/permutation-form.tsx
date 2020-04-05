import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { createRecord, updateRecord } from '../permutation.service';
import {
  Permutation,
  PermutationFieldValue,
  PermutationTemplate,
} from '../permutation.type';
import { PermutationField } from './permutation-field';

type PermutationFormProps = {
  template: PermutationTemplate;
  onSuccess: () => void;
  currentValue?: Permutation;
};

export default function PermutationForm(props: PermutationFormProps) {
  const [name, setName] = React.useState(
    props.currentValue ? props.currentValue.name : ''
  );

  const initPayload = React.useMemo(
    () => ({
      template: props.template,
      currentValue: props.currentValue,
    }),
    [props.currentValue, props.template]
  );

  const [{ values }, dispatch] = React.useReducer(
    reducer,
    initPayload,
    (payload) => reducer(DEFAULT_STATE, actions.init(payload))
  );

  React.useEffect(() => {
    dispatch(actions.init(initPayload));
  }, [initPayload]);

  const [errorMsg, setErrorMsg] = React.useState('');

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        Promise.resolve(
          props.currentValue
            ? updateRecord({
                _id: props.currentValue._id,
                templateId: props.currentValue.templateId,
                name,
                fieldValues: values,
                tags: [],
              })
            : createRecord({
                name,
                templateId: props.template._id,
                fieldValues: values,
                tags: [],
              })
        )
          .then(() => {
            dispatch(actions.init(initPayload));
            setName('');
            props.onSuccess();
          })
          .catch((err: Error) => setErrorMsg(err.message));
      }}
    >
      {errorMsg && <Alert variant="error">{errorMsg}</Alert>}
      <div className="p-2">
        <TextField label="Title" value={name} onChangeValue={setName} />
      </div>
      {props.template.fields.map((field) => (
        <div className="p-2" key={field._id}>
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
        <Button type="submit">
          {props.currentValue ? 'Save' : 'Add'} Test Data
        </Button>
      </div>
    </form>
  );
}

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
    init: (
      state,
      action: PayloadAction<{
        template: PermutationTemplate;
        currentValue?: Permutation;
      }>
    ) => {
      state.template = action.payload.template;
      if (action.payload.currentValue) {
        state.values = action.payload.currentValue.fieldValues;
      } else {
        action.payload.template.fields.forEach((field) => {
          const defaultValue: PermutationFieldValue =
            field.fieldType === 'checkbox'
              ? false
              : field.fieldType === 'multiselect'
              ? []
              : '';

          state.values[field.fieldKey] = defaultValue;
        });
      }
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
