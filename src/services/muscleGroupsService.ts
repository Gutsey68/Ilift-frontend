import { fetchWithToken } from '../lib/fetchWithToken';
import { MuscleGroupsResponseType } from '../types/musclesType';

/**
 * Récupère tous les groupes musculaires
 * @returns Promise contenant la réponse typée des groupes musculaires
 */
export const fetchMuscleGroups = (): Promise<MuscleGroupsResponseType> => {
  return fetchWithToken('/api/muscles');
};
