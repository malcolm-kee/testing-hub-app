import { Button } from 'components/button';
import * as React from 'react';
import { FiX } from 'react-icons/fi';
import { deleteTemplate } from '../permutation.service';
import { PermutationTemplate } from '../permutation.type';

export type PermutationTemplateListProps = {
  templates: PermutationTemplate[];
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
            <Button
              onClick={() => deleteTemplate(tmpl._id).then(props.onChange)}
              aria-label="Delete"
              variant="none"
              className="text-red-700"
            >
              <FiX aria-hidden focusable={false} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};
