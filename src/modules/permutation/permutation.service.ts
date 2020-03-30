import { fetchJson } from 'lib/fetch-json';
import {
  PermutationTemplate,
  PermutationTemplateField,
} from './permutation.type';

const permutationTemplateUrl = process.env
  .REACT_APP_PERMUTATION_TEMPLATE_URL as string;

export const createTemplate = (
  data: Omit<PermutationTemplate, '_id' | 'fields'> & {
    fields: Array<Omit<PermutationTemplateField, '_id'>>;
  }
) =>
  fetchJson(permutationTemplateUrl, {
    method: 'POST',
    data,
  }) as Promise<PermutationTemplate>;
