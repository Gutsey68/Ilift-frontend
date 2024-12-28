import { fetchWithToken } from '../lib/fetchWithToken';
import { MuscleGroupsResponseType } from '../types/musclesType';

export const fetchMuscleGroups = (): Promise<MuscleGroupsResponseType> => {
  return fetchWithToken('/api/muscles');
};
