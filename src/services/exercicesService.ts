import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère un exercice et ses résultats
 * @param id - Identifiant de l'exercice
 */
export const fetchExerciceAndResults = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`);
};

/**
 * Récupère tous les exercices
 */
export const fetchExercices = async () => {
  return fetchWithToken('/api/exercices');
};

/**
 * Crée un nouvel exercice
 * @param data - Données de l'exercice
 */
export const createExercice = async (data: { name: string }) => {
  return fetchWithToken('/api/exercices', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * Met à jour un exercice
 * @param id - Identifiant de l'exercice
 * @param data - Données de l'exercice
 */
export const updateExercice = async (id: string, data: { name: string }) => {
  return fetchWithToken(`/api/exercices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

/**
 * Supprime un exercice
 * @param id - Identifiant de l'exercice
 */
export const deleteExercice = async (id: string) => {
  return fetchWithToken(`/api/exercices/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Met à jour la position d'un exercice dans une séance
 * @param workoutId - Identifiant de la séance
 * @param exerciceId - Identifiant de l'exercice
 * @param position - Nouvelle position
 */
export const updateExercicePosition = async (workoutId: string, exerciceId: string, position: number) => {
  return fetchWithToken(`/api/workouts/${workoutId}/exercices/${exerciceId}`, {
    method: 'PUT',
    body: JSON.stringify({ position })
  });
};
