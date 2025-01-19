/**
 * Type représentant un résultat d'exercice complet
 * Inclut les séries, l'exercice et les informations utilisateur
 */
export type ExerciseResult = {
  id: string;
  createdAt: string;
  updatedAt: string;
  exerciceId: string;
  userId: string;
  sets: {
    id: string;
    reps: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    exerciceResultId: string;
  }[];
  exercice: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    pseudo: string;
    email: string;
    passwordHash: string;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
    profilePhoto: string | null;
    roleId: string | null;
    cityId: string | null;
  };
};

/**
 * Version simplifiée du résultat d'exercice
 */
export type SimpleExerciseResult = {
  id: string;
  createdAt: string;
  exercice: {
    id: string;
    name: string;
  };
  sets: Array<{
    id: string;
    reps: number;
    weight: number;
  }>;
};

/**
 * Type pour les résultats d'exercice dans un post
 */
export type ExerciseResultPost = {
  exercicesResults: SimpleExerciseResult;
};
