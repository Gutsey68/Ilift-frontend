export type UserDetails = {
  id: string;
  pseudo: string;
  email: string;
  bio: string | null;
  createdAt: string;
  profilePhoto: string | null;
  roleId: string | null;
  city: {
    name: string | null;
  } | null;
  _count: {
    posts: number;
    followedBy: number;
    following: number;
    workouts: number;
  } | null;
};
