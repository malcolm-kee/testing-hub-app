import { fetchJson } from 'lib/fetch-json';
import { isNumber } from 'lib/is';
import { omit } from 'lib/omit';
import { useRemoteData } from 'lib/use-remote-data';
import { PermutationTemplate, Permutation } from './permutation.type';

const permutationTemplateUrl = process.env
  .REACT_APP_PERMUTATION_TEMPLATE_URL as string;

const permutationRecordUrl = process.env
  .REACT_APP_PERMUTATION_RECORD_URL as string;

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

export const useAllRecordsForTemplate = (templateId: string) =>
  useRemoteData(
    permutationRecordUrl + `/template/${templateId}`,
    [] as Permutation[]
  );

export const createRecord = (data: Omit<Permutation, '_id'>) =>
  fetchJson(permutationRecordUrl, {
    method: 'POST',
    data,
  }) as Promise<Permutation>;

export const updateRecord = ({ _id, ...data }: Permutation) =>
  fetchJson(permutationRecordUrl + `/${_id}`, {
    method: 'PUT',
    data,
  }) as Promise<Permutation>;

export const deleteRecord = (id: string) =>
  fetchJson(permutationRecordUrl + `/${id}`, {
    method: 'DELETE',
  }) as Promise<Permutation>;
