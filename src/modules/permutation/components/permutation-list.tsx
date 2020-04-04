import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useAllTemplates } from '../permutation.service';
import { Spinner } from 'components/spinner';
import { Menu, MenuItem, MenuButton, MenuList } from 'components/menu';
import { PermutationTemplate } from '../permutation.type';
import { Button } from 'components/button';
import { Dialog } from 'components/dialog';
import { PermutationForm } from './permutation-form';

export const PermutationList = () => {
  const [{ data, status }] = useAllTemplates();
  const [selectedTmpl, setSelectedTmpl] = React.useState<
    PermutationTemplate | undefined
  >(undefined);

  return (
    <div className="py-2">
      {status === 'busy' && <Spinner />}
      <div className="py-2">
        <Menu>
          <MenuButton disabled={data.length === 0}>
            Type <FiChevronDown aria-hidden focusable={false} />
          </MenuButton>
          <MenuList>
            {data.map((template) => (
              <MenuItem
                onSelect={() => setSelectedTmpl(template)}
                key={template._id}
              >
                {template.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      {selectedTmpl && <PermutationListForTemplate template={selectedTmpl} />}
    </div>
  );
};

const PermutationListForTemplate = (props: {
  template: PermutationTemplate;
}) => {
  const [showAddForm, setShowAddForm] = React.useState(false);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">{props.template.name}</p>
        <div>
          <Button onClick={() => setShowAddForm(true)}>Create New</Button>
        </div>
      </div>
      <Dialog
        isOpen={showAddForm}
        onDismiss={() => setShowAddForm(false)}
        aria-label="Add Test Data Form"
      >
        <PermutationForm template={props.template} />
      </Dialog>
    </>
  );
};
