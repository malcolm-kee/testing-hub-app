import { Alert } from 'components/alert';
import { Button, getButtonStyleClass } from 'components/button';
import { Dialog } from 'components/dialog';
import { AddButton, DeleteButton, EditButton } from 'components/icon-button';
import { TextField } from 'components/text-field';
import { arrayMove } from 'lib/array-move';
import { isDefined } from 'lib/is';
import * as React from 'react';
import { FiMove } from 'react-icons/fi';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { createTemplate, updateTemplate } from '../permutation.service';
import {
  PermutationFieldConfig,
  PermutationTemplate,
} from '../permutation.type';
import { PermutationField } from './permutation-field';
import { PermutationTemplateFieldEditor } from './permutation-template-field-editor';

export type PermutationTemplateFormProps = {
  onSuccess: () => void;
  currentValue?: PermutationTemplate;
};

export const PermutationTemplateForm = (
  props: PermutationTemplateFormProps
) => {
  const [name, setName] = React.useState(
    props.currentValue ? props.currentValue.name : ''
  );
  const [fields, setFields] = React.useState<Array<PermutationFieldConfig>>(
    props.currentValue ? props.currentValue.fields : []
  );
  const [focusedFieldIndex, setFocusedFieldIndex] = React.useState<
    number | undefined
  >(undefined);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    if (props.currentValue) {
      setName(props.currentValue.name);
      setFields(props.currentValue.fields);
    }
  }, [props.currentValue]);

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          Promise.resolve(
            props.currentValue
              ? updateTemplate({
                  _id: props.currentValue._id,
                  name,
                  fields,
                })
              : createTemplate({
                  name,
                  fields,
                })
          )
            .then(() => {
              setName('');
              setFields([]);
              props.onSuccess();
            })
            .catch((err: Error) => {
              setErrorMsg(err.message);
            });
        }}
      >
        <div className="mx-2 font-semibold text-lg mb-2">
          {props.currentValue ? 'Edit' : 'Create'} Template
        </div>
        {errorMsg && <Alert variant="error">{errorMsg}</Alert>}
        <TextField
          label="Template Name"
          value={name}
          onChangeValue={setName}
          required
        />
        <div className="shadow bg-white rounded p-2 my-3">
          <div className="flex justify-between items-center px-2 pb-2">
            <p className="text-xl">Fields</p>
            <AddButton
              onClick={() => setShowAddForm(true)}
              aria-label="Add Field"
            />
          </div>
          <SortableFieldList
            fields={fields}
            onEditField={(index) => setFocusedFieldIndex(index)}
            onDeleteField={(index) =>
              setFields((flds) => flds.filter((_, i) => i !== index))
            }
            onSortEnd={(result) =>
              setFields((flds) =>
                arrayMove(flds, result.oldIndex, result.newIndex)
              )
            }
            useDragHandle
          />
        </div>
        <div className="px-2 py-3">
          <Button type="submit">
            {props.currentValue ? 'Save' : 'Add'} Template
          </Button>
        </div>
      </form>
      <Dialog
        aria-label="Add Field Form"
        isOpen={showAddForm}
        onDismiss={() => setShowAddForm(false)}
      >
        <PermutationTemplateFieldEditor
          onSave={(newField) => {
            setFields((fs) => fs.concat(newField));
            setShowAddForm(false);
          }}
        />
      </Dialog>
      <Dialog
        aria-label="Edit Field Form"
        isOpen={isDefined(focusedFieldIndex)}
        onDismiss={() => setFocusedFieldIndex(undefined)}
      >
        <PermutationTemplateFieldEditor
          currentValue={fields[focusedFieldIndex as number]}
          onSave={(newField) => {
            setFields((fs) =>
              fs.map((field, index) =>
                index === focusedFieldIndex ? newField : field
              )
            );
            setFocusedFieldIndex(undefined);
          }}
        />
      </Dialog>
    </>
  );
};

type FieldListProps = {
  fields: PermutationFieldConfig[];
  onEditField: (index: number) => void;
  onDeleteField: (index: number) => void;
};

const SortableFieldList = SortableContainer(function FieldList(
  props: FieldListProps
) {
  return (
    <ul>
      {props.fields.map((field, index) => (
        <SortableField
          field={field}
          onEdit={() => props.onEditField(index)}
          onDelete={() => props.onDeleteField(index)}
          index={index}
          key={field._id}
        />
      ))}
    </ul>
  );
});

type FieldProps = {
  field: PermutationFieldConfig;
  onEdit: () => void;
  onDelete: () => void;
};

const SortableField = SortableElement(function Field(props: FieldProps) {
  return (
    <li className="flex items-center mb-2">
      <div className="flex-1">
        <PermutationField config={props.field} preview />
      </div>
      <div className="pl-2">
        <EditButton
          onClick={props.onEdit}
          aria-label="Edit field"
          variant="none"
        />
        <SortHandle />
        <DeleteButton
          onClick={props.onDelete}
          aria-label="Delete field"
          variant="none"
        />
      </div>
    </li>
  );
});

const SortHandle = SortableHandle(() => (
  <div
    aria-label="Reorder field, press space to select"
    role="button"
    title="Drag to reorder"
    className={getButtonStyleClass({
      variant: 'none',
    })}
    tabIndex={0}
  >
    <FiMove aria-hidden focusable={false} />
  </div>
));
