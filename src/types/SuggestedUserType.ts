export type SuggestedUserType = {
  id: string;
  pseudo: string;
  profilePhoto: string | null;
  commonFollowers: { id: string; pseudo: string }[];
  commonFollowersCount: number;
};
