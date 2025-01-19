import { fetchWithToken } from '../lib/fetchWithToken';

export const createResult = async (data: { exerciceId: string; sets: { reps: number; weight: number }[] }) => {
  return fetchWithToken('/api/results', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateResult = async (id: string, data: { sets: { reps: number; weight: number }[] }) => {
  return fetchWithToken(`/api/results/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteResult = async (id: string) => {
  return fetchWithToken(`/api/results/${id}`, {
    method: 'DELETE'
  });
};

export const deleteSet = async (resultId: string, setId: string) => {
  return fetchWithToken(`/api/results/${resultId}/sets/${setId}`, {
    method: 'DELETE'
  });
};
