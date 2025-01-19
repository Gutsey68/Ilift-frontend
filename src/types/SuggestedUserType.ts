/**
 * Type représentant un utilisateur suggéré
 * @property id - Identifiant unique de l'utilisateur
 * @property pseudo - Pseudonyme de l'utilisateur
 * @property profilePhoto - Photo de profil
 * @property commonFollowers - Liste des followers en commun
 * @property commonFollowersCount - Nombre de followers en commun
 */
export type SuggestedUserType = {
  id: string;
  pseudo: string;
  profilePhoto: string | null;
  commonFollowers: { id: string; pseudo: string }[];
  commonFollowersCount: number;
};
