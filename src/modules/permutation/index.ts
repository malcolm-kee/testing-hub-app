export { PermutationFormLazy as PermutationForm } from './components/permutation-form-lazy';
export { PermutationList } from './components/permutation-list';
export { PermutationTemplateForm } from './components/permutation-template-form';
export { PermutationTemplateList } from './components/permutation-template-list';
export {
  createTemplate,
  deleteTemplate,
  updateTemplate,
  useAllTemplates,
} from './permutation.service';
export type {
  Permutation,
  PermutationFieldConfig,
  PermutationTemplate,
} from './permutation.type';
