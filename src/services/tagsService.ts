import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchTagsHandler = async () => {
  return fetchWithToken('/api/tags');
};
