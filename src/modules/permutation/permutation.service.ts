import { fetchJson } from 'lib/fetch-json';
import { useRemoteData } from 'lib/use-remote-data';
import {
  PermutationFieldConfig,
  PermutationTemplate,
} from './permutation.type';

const permutationTemplateUrl = process.env
  .REACT_APP_PERMUTATION_TEMPLATE_URL as string;

export const useAllTemplates = () => {
  return useRemoteData(permutationTemplateUrl, [] as PermutationTemplate[]);
};

export const createTemplate = (
  data: Omit<PermutationTemplate, '_id' | 'fields'> & {
    fields: Array<Omit<PermutationFieldConfig, '_id'>>;
  }
) =>
  fetchJson(permutationTemplateUrl, {
    method: 'POST',
    data,
  }) as Promise<PermutationTemplate>;

export const updateTemplate = ({
  _id,
  ...data
}: Omit<PermutationTemplate, 'fields'> & {
  fields: Array<Omit<PermutationFieldConfig, '_id'>>;
}) =>
  fetchJson(permutationTemplateUrl + `/${_id}`, {
    method: 'PUT',
    data,
  }) as Promise<PermutationTemplate>;

export const deleteTemplate = (templateId: string) =>
  fetchJson(permutationTemplateUrl + `/${templateId}`, {
    method: 'DELETE',
  });
