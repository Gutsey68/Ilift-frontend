import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchExerciceAndResults = async (id: string) => {
  try {
    return fetchWithToken(`/api/exercices/${id}`);
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};
