import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchExerciceAndResults = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`);
};

export const fetchExercices = async () => {
  return fetchWithToken('/api/exercices');
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

export const updateExercicePosition = async (workoutId: string, exerciceId: string, position: number) => {
  return fetchWithToken(`/api/workouts/${workoutId}/exercices/${exerciceId}`, {
    method: 'PUT',
    body: JSON.stringify({ position })
  });
};
