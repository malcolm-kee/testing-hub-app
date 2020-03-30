export type FieldType =
  | 'text'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'multiselect';

export type PermutationTemplateField = {
  _id: string;
  name: string;
  fieldType: FieldType;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export type PermutationTemplate = {
  name: string;
  fields: PermutationTemplateField[];
};

export type Permutation = {
  _id: string;
  name: string;
  templateId: string;
  tags: string[];
  fieldValues: Record<string, string>;
};
