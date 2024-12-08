import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchProgramsOfUser = async (id: string) => {
  return fetchWithToken(`/api/programs/users/${id}`);
};

export const fetchWorkoutsOfProgram = async (id: string) => {
  return fetchWithToken(`/api/programs/${id}/workouts`);
};

export const fetchExercicesOfWorkout = async (id: string) => {
  return fetchWithToken(`/api/programs/workouts/${id}/exercices`);
};
