import { TagType as PostTagType } from './postsType';

/**
 * Type représentant un post partagé
 * @property postsId - Identifiant du post partagé
 * @property usersId - Identifiant de l'utilisateur qui partage
 * @property posts - Détails du post partagé avec ses métadonnées
 */
export type SharedPostType = {
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
    doILike?: boolean;
    isShared?: boolean;
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
