/**
 * Type représentant un follower
 * @property isFollowing - Indique si le follower suit l'utilisateur courant
 * @property amIFollowing - Indique si l'utilisateur courant suit ce follower
 */
export type FollowersType = {
  id: string;
  pseudo: string;
  profilePhoto: string;
  isFollowing: boolean;
  amIFollowing: boolean;
};
