import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchExerciceAndResults = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`);
};
