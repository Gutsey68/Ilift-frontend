import { fetchWithToken } from '../lib/fetchWithToken';
import { ExerciseResponseType } from '../types/exercicesType';

export const createWorkout = async (data: { name: string }) => {
  return fetchWithToken('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateWorkout = async (id: string, name?: string, position?: number) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...(name && { name }),
      ...(typeof position === 'number' && { position })
    })
  });
};

export const deleteWorkout = async (id: string) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'DELETE'
  });
};

export const updateWorkoutExercices = async (workoutId: string, exerciceIds: string[]): Promise<ExerciseResponseType> => {
  return fetchWithToken(`/api/workouts/${workoutId}/exercices`, {
    method: 'PUT',
    body: JSON.stringify({ exerciceIds })
  });
};
