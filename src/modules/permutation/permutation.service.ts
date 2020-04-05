import { fetchJson } from 'lib/fetch-json';
import { isNumber } from 'lib/is';
import { omit } from 'lib/omit';
import { useRemoteData } from 'lib/use-remote-data';
import { PermutationTemplate } from './permutation.type';

const permutationTemplateUrl = process.env
  .REACT_APP_PERMUTATION_TEMPLATE_URL as string;

export const useAllTemplates = () =>
  useRemoteData(permutationTemplateUrl, [] as PermutationTemplate[]);

export const createTemplate = (data: Omit<PermutationTemplate, '_id'>) =>
  fetchJson(permutationTemplateUrl, {
    method: 'POST',
    data: {
      name: data.name,
      fields: data.fields.map((field) =>
        isNumber(field._id) ? omit(field, ['_id']) : field
      ),
    },
  }) as Promise<PermutationTemplate>;

export const updateTemplate = ({ _id, name, fields }: PermutationTemplate) =>
  fetchJson(permutationTemplateUrl + `/${_id}`, {
    method: 'PUT',
    data: {
      name,
      fields: fields.map((field) =>
        isNumber(field._id) ? omit(field, ['_id']) : field
      ),
    },
  }) as Promise<PermutationTemplate>;

export const deleteTemplate = (templateId: string) =>
  fetchJson(permutationTemplateUrl + `/${templateId}`, {
    method: 'DELETE',
  });
