export type UserAdminType = {
  id: string;
  pseudo: string;
  email: string;
  createdAt: string;
  profilePhoto: string;
  isBan: boolean;
  _count: {
    posts: number;
    followedBy: number;
    following: number;
  };
};
