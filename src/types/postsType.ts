export type PostType = {
  id: string;
  photo?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  tags: TagType[];
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
  _count?: {
    likes: number;
  };
};

export type TagType = {
  postId: string;
  tagId: string;
  createdAt: string;
  updatedAt: string;
  tag: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
