export type FieldType =
  | 'text'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'multiselect';

export type PermutationFieldConfig = {
  /**
   * number _id are temporary id that will be filtered when submitted
   */
  _id: string | number;
  name: string;
  fieldType: FieldType;
  fieldKey: string;
  isRequired: boolean;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export type PermutationTemplate = {
  _id: string;
  name: string;
  fields: PermutationFieldConfig[];
};

export type PermutationFieldValue = string | boolean | string[];

export type Permutation = {
  _id: string;
  name: string;
  templateId: string;
  tags: string[];
  fieldValues: Record<string, PermutationFieldValue>;
};
