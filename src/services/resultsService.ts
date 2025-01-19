import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Crée un nouveau résultat d'exercice
 * @param data - Données du résultat (exercice et séries)
 */
export const createResult = async (data: { exerciceId: string; sets: { reps: number; weight: number }[] }) => {
  return fetchWithToken('/api/results', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * Met à jour un résultat existant
 * @param id - Identifiant du résultat
 * @param data - Nouvelles données des séries
 */
export const updateResult = async (id: string, data: { sets: { reps: number; weight: number }[] }) => {
  return fetchWithToken(`/api/results/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

/**
 * Supprime un résultat
 * @param id - Identifiant du résultat
 */
export const deleteResult = async (id: string) => {
  return fetchWithToken(`/api/results/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Supprime une série spécifique d'un résultat
 * @param resultId - Identifiant du résultat
 * @param setId - Identifiant de la série
 */
export const deleteSet = async (resultId: string, setId: string) => {
  return fetchWithToken(`/api/results/${resultId}/sets/${setId}`, {
    method: 'DELETE'
  });
};
