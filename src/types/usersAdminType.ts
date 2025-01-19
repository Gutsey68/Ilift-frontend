/**
 * Type représentant un utilisateur dans l'interface d'administration
 * @property id - Identifiant unique de l'utilisateur
 * @property pseudo - Pseudonyme de l'utilisateur
 * @property email - Email de l'utilisateur
 * @property isBan - Statut de bannissement
 * @property _count - Statistiques de l'utilisateur
 */
export type UserAdminType = {
  id: string;
  pseudo: string;
  email: string;
  createdAt: string;
  profilePhoto: string;
  isBan: boolean;
  _count: {
    posts: number;
    followedBy: number;
    following: number;
  };
};
