/**
 * Type représentant un commentaire
 * @property isMyComment - Indique si le commentaire appartient à l'utilisateur courant
 * @property users - Informations sur l'auteur du commentaire
 */
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
