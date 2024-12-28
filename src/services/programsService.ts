import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchProgramsOfUser = async (id: string) => {
  return fetchWithToken(`/api/programs/users/${id}`);
};

export const fetchWorkoutsOfProgram = async (id: string) => {
  return fetchWithToken(`/api/programs/${id}/workouts`);
};

export const fetchExercicesOfWorkout = async (id: string) => {
  return fetchWithToken(`/api/workouts/${id}/exercices`);
};

export const createProgram = async (data: { name: string; description: string }) => {
  return fetchWithToken('/api/programs', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateProgram = async (id: string, data: { name?: string; description?: string }) => {
  return fetchWithToken(`/api/programs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};
