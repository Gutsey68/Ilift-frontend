export type PostType = {
  id: string;
  photo?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  isValid?: boolean;
  isMyPost?: boolean;
  doILike?: boolean;
  isShared?: boolean;
  sharedAt?: string;
  sharedBy?: string;
  sharedByUser?: {
    id: string;
    pseudo: string;
  };
  tags: Array<{
    postId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
    };
  }>;
  _count?: {
    likes: number;
    comments: number;
  };
  author: {
    id: string;
    pseudo: string;
    profilePhoto?: string;
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
