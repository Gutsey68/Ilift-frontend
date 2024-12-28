import { fetchWithToken } from '../lib/fetchWithToken';
import { AllExercisesResponseType } from '../types/exercicesType';

export const fetchExerciceAndResults = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`);
};

export const fetchExercices = async (): Promise<AllExercisesResponseType> => {
  return fetchWithToken('/api/exercices', {
    method: 'GET'
  });
};

export const createExercice = async (data: { name: string }) => {
  return fetchWithToken('/api/exercices', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateExercice = async (id: string, data: { name: string }) => {
  return fetchWithToken(`/api/exercices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteExercice = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`, {
    method: 'DELETE'
  });
};
