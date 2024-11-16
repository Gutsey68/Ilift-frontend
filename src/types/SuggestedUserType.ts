// types/SuggestedUserType.ts
export type SuggestedUser = {
  id: string;
  pseudo: string;
  profilePhoto: string | null;
  commonFollowers: { id: string; pseudo: string }[];
  commonFollowersCount: number;
};
