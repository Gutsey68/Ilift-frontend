/**
 * Type représentant les détails complets d'un utilisateur
 * @property id - Identifiant unique de l'utilisateur
 * @property pseudo - Pseudonyme de l'utilisateur
 * @property email - Email de l'utilisateur
 * @property bio - Biographie optionnelle
 * @property isOnboardingCompleted - État de l'onboarding
 * @property _count - Statistiques de l'utilisateur
 * @property amIFollowing - Indique si l'utilisateur courant suit cet utilisateur
 */
export type UserDetailsType = {
  id: string;
  pseudo: string;
  email: string;
  bio?: string;
  createdAt: string;
  profilePhoto?: string;
  isOnboardingCompleted?: boolean;
  onboardingStep?: number;
  roleId?: string;
  city?: {
    name?: string;
  };
  workouts?: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  _count?: {
    posts: number;
    followedBy: number;
    following: number;
    workouts: number;
  };
  amIFollowing?: boolean;
};
