import { DeleteButton, EditButton } from 'components/icon-button';
import * as React from 'react';
import { deleteTemplate } from '../permutation.service';
import { PermutationTemplate } from '../permutation.type';

export type PermutationTemplateListProps = {
  templates: PermutationTemplate[];
  onSelect: (template: PermutationTemplate) => void;
  onChange: () => void;
};

export const PermutationTemplateList = (
  props: PermutationTemplateListProps
) => {
  return (
    <ul>
      {props.templates.map((tmpl) => (
        <li className="flex justify-between" key={tmpl._id}>
          {tmpl.name}
          <div>
            <EditButton
              onClick={() => props.onSelect(tmpl)}
              aria-label="Edit"
              variant="none"
            />
            <DeleteButton
              onClick={() => deleteTemplate(tmpl._id).then(props.onChange)}
              aria-label="Delete"
              variant="none"
              className="text-red-700"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
