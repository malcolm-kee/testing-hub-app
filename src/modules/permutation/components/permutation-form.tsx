import { Button } from 'components/button';
import * as React from 'react';
import { PermutationTemplate } from '../permutation.type';
import { PermutationField } from './permutation-field';

export type PermutationFormProps = {
  template: PermutationTemplate;
};

export const PermutationForm = (props: PermutationFormProps) => {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <div className="p-2">
        {props.template.fields.map((field) => (
          <div key={field._id}>
            <PermutationField config={field} />
          </div>
        ))}
        <div className="p-2">
          <Button type="submit">Create</Button>
        </div>
      </div>
    </form>
  );
};
