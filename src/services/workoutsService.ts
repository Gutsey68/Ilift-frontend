import { fetchWithToken } from '../lib/fetchWithToken';

export const createWorkout = async (data: { name: string }) => {
  return fetchWithToken('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateWorkout = async (id: string, data: { name: string }) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteWorkout = async (id: string) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'DELETE'
  });
};

export const updateWorkoutExercices = async (workoutId: string, exerciceIds: string[]) => {
  return fetchWithToken(`/api/workouts/${workoutId}/exercices`, {
    method: 'PUT',
    body: JSON.stringify({ exerciceIds })
  });
};
