export type SuggestedUser = {
  id: string;
  pseudo: string;
  profilePhoto: string | null;
  followedBy: {
    following: { pseudo: string }[];
  }[];
  _count: {
    followedBy: number;
  };
};
