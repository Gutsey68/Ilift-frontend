export type CommentType = {
  postsId: string;
  usersId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isMyComment: boolean;
  users: {
    id: string;
    pseudo: string;
    profilePhoto: string;
  };
};
