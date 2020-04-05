import { Button } from 'components/button';
import { Dialog } from 'components/dialog';
import { DeleteButton, EditButton } from 'components/icon-button';
import { Menu, MenuButton, MenuItem, MenuList } from 'components/menu';
import { Spinner } from 'components/spinner';
import { isDefined } from 'lib/is';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { testDataTemplateUrl } from 'routes';
import {
  deleteRecord,
  useAllRecordsForTemplate,
  useAllTemplates,
} from '../permutation.service';
import { Permutation, PermutationTemplate } from '../permutation.type';
import { PermutationFormLazy } from './permutation-form-lazy';

export const PermutationList = () => {
  const history = useHistory();
  const [{ data }] = useAllTemplates();
  const [selectedTmpl, setSelectedTmpl] = React.useState<
    PermutationTemplate | undefined
  >(undefined);

  return (
    <div className="py-2">
      <div className="py-2">
        <Menu>
          <MenuButton>
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
            <MenuItem
              className="border-t border-gray-400"
              onSelect={() => history.push(testDataTemplateUrl)}
            >
              Manage
            </MenuItem>
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
  const [{ data, status }, refresh] = useAllRecordsForTemplate(
    props.template._id
  );
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<
    Permutation | undefined
  >(undefined);

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <p className="text-xl font-semibold">{props.template.name}</p>
        <div>
          <Button onClick={() => setShowAddForm(true)}>Create New</Button>
        </div>
      </div>
      <div>
        {status === 'busy' && <Spinner />}
        <ul>
          {data.map((record) => (
            <li className="p-1 flex justify-between" key={record._id}>
              <span>{record.name}</span>
              <div>
                <EditButton
                  onClick={() => setSelectedRecord(record)}
                  aria-label="Edit Test Data"
                  variant="none"
                />
                <DeleteButton
                  onClick={() => deleteRecord(record._id).then(refresh)}
                  aria-label="Delete Test Data"
                  variant="none"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Dialog
        isOpen={showAddForm}
        onDismiss={() => setShowAddForm(false)}
        aria-label="Add Test Data Form"
      >
        <React.Suspense fallback={<Spinner />}>
          <PermutationFormLazy
            template={props.template}
            onSuccess={() => {
              setShowAddForm(false);
              refresh();
            }}
          />
        </React.Suspense>
      </Dialog>
      <Dialog
        isOpen={isDefined(selectedRecord)}
        onDismiss={() => setSelectedRecord(undefined)}
        aria-label="Edit Test Data Form"
      >
        <React.Suspense fallback={<Spinner />}>
          <PermutationFormLazy
            template={props.template}
            currentValue={selectedRecord}
            onSuccess={() => {
              setSelectedRecord(undefined);
              refresh();
            }}
          />
        </React.Suspense>
      </Dialog>
    </>
  );
};
