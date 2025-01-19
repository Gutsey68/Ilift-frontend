import { MuscleGroupType } from './musclesType';

/**
 * Type de base pour les entités avec identifiant et nom
 * @property id - Identifiant unique
 * @property name - Nom de l'entité
 * @property createdAt - Date de création optionnelle
 * @property updatedAt - Date de mise à jour optionnelle
 */
export type BaseEntityType = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Type pour l'association entre un exercice et un groupe musculaire
 * @property muscleGroups - Groupe musculaire associé
 */
export type ExerciseMuscleGroupType = {
  muscleGroups: MuscleGroupType;
};

/**
 * Type représentant un exercice complet
 * Étend le type de base avec les groupes musculaires et la position
 * @property musclesGroups - Liste des groupes musculaires associés
 * @property position - Position optionnelle dans la séance
 */
export type ExerciseType = BaseEntityType & {
  musclesGroups: ExerciseMuscleGroupType[];
  position?: number;
};

/**
 * Type représentant un exercice dans une séance
 * Étend le type ExerciseType avec une position obligatoire
 * @property position - Position dans la séance
 */
export type WorkoutExerciseType = ExerciseType & {
  position: number;
};

/**
 * Type représentant une séance d'entraînement
 * @property program - Informations sur le programme parent
 */
export type WorkoutType = {
  id: string;
  name: string;
  program: {
    id: string;
    name: string;
  };
};

/**
 * Type générique pour les réponses de l'API
 * @template T - Type des données de la réponse
 */
export type ResponseType<T> = {
  message: string;
  data: T;
};

/**
 * Type de réponse pour les exercices d'une séance
 * Contient la liste des exercices et les informations de la séance
 */
export type ExerciseResponseType = ResponseType<{
  exercices: WorkoutExerciseType[];
  workout: WorkoutType;
}>;

/**
 * Types pour les différentes réponses API liées aux exercices
 */
export type AllExercisesResponseType = ResponseType<ExerciseType[]>;
export type WorkoutExercisesResponseType = ExerciseResponseType;
