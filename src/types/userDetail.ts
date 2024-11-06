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
};
