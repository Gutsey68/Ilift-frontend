export type UserDetails = {
  id: string;
  pseudo: string;
  email: string;
  bio?: string;
  createdAt: string;
  profilePhoto?: string;
  roleId?: string;
  city?: {
    name?: string;
  };
  _count?: {
    posts: number;
    followedBy: number;
    following: number;
    workouts: number;
  };
};
