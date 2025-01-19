import { fetchWithToken } from '../lib/fetchWithToken';
import { ExerciseResponseType } from '../types/exercicesType';

/**
 * Crée une nouvelle séance d'entraînement
 * @param data - Données de la séance (nom)
 */
export const createWorkout = async (data: { name: string }) => {
  return fetchWithToken('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * Met à jour une séance d'entraînement
 * @param id - Identifiant de la séance
 * @param data - Données à mettre à jour (nom et/ou position)
 */
export const updateWorkout = async (id: string, data: { name?: string; position?: number }) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

/**
 * Supprime une séance d'entraînement
 * @param id - Identifiant de la séance
 */
export const deleteWorkout = async (id: string) => {
  return fetchWithToken(`/api/workouts/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Met à jour la liste des exercices d'une séance
 * @param workoutId - Identifiant de la séance
 * @param exerciceIds - Liste des identifiants des exercices
 * @returns Promise avec la réponse des exercices mis à jour
 */
export const updateWorkoutExercices = async (workoutId: string, exerciceIds: string[]): Promise<ExerciseResponseType> => {
  return fetchWithToken(`/api/workouts/${workoutId}/exercices`, {
    method: 'PUT',
    body: JSON.stringify({ exerciceIds })
  });
};
