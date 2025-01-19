import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère tous les tags disponibles
 * @returns Promise avec la liste des tags
 */
export const fetchTagsHandler = async () => {
  return fetchWithToken('/api/tags');
};
