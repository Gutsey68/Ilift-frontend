export type Post = {
  id: string;
  photo?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    pseudo: string;
    email: string;
    passwordHash: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
    profilePhoto?: string;
    roleId?: string;
    cityId?: string;
  };
};
