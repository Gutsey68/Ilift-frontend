/**
 * Type représentant une séance d'entraînement
 * @property id - Identifiant unique de la séance
 * @property name - Nom de la séance
 * @property programId - Identifiant du programme associé
 * @property program - Informations du programme parent
 */
export type WorkoutType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  programId: string;
  userId: string;
  program: {
    name: string;
    id: string;
  };
};

/**
 * Type représentant les données d'une séance avec son programme
 * @property workouts - Liste des séances
 * @property program - Informations du programme
 */
export type WorkoutsDataType = {
  workouts: WorkoutType[];
  program: {
    name: string;
    id: string;
  };
};
