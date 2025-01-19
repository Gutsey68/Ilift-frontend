import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère les programmes de l'utilisateur connecté
 */
export const fetchProgramsOfUser = async () => {
  return fetchWithToken('/api/programs/me');
};

/**
 * Récupère les séances d'un programme
 * @param id - Identifiant du programme
 */
export const fetchWorkoutsOfProgram = async (id: string) => {
  return fetchWithToken(`/api/programs/${id}/workouts`);
};

/**
 * Récupère les exercices d'une séance
 * @param id - Identifiant de la séance
 */
export const fetchExercicesOfWorkout = async (id: string) => {
  return fetchWithToken(`/api/workouts/${id}/exercices`);
};

/**
 * Crée un nouveau programme
 * @param data - Données du programme (nom et description)
 */
export const createProgram = async (data: { name: string; description: string }) => {
  return fetchWithToken('/api/programs', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * Met à jour un programme
 * @param id - Identifiant du programme
 * @param data - Données à mettre à jour (nom, description et/ou position)
 */
export const updateProgram = async (id: string, data: { name?: string; description?: string; position?: number }) => {
  return fetchWithToken(`/api/programs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

/**
 * Supprime un programme
 * @param id - Identifiant du programme
 */
export const deleteProgram = async (id: string) => {
  return fetchWithToken(`/api/programs/${id}`, {
    method: 'DELETE'
  });
};
