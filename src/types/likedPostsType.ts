import { TagType as PostTagType } from './postsType';

/**
 * Type représentant une publication likée
 * Inclut les métadonnées de like et les informations de la publication
 */
export type LikedPostType = {
  postsId: string;
  usersId: string;
  createdAt: string;
  posts: {
    id: string;
    photo?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    doILike: boolean;
    isMyPost?: boolean;
    tags: PostTagType[];
    author: {
      id: string;
      pseudo: string;
      profilePhoto?: string;
    };
    _count?: {
      likes: number;
      comments: number;
    };
  };
};

/**
 * Type représentant un tag simplifié
 */
export type TagType = {
  postId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};
