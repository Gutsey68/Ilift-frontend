import { BaseEntityType, ResponseType } from './exercicesType';

/**
 * Types pour la gestion des groupes musculaires
 * Utilise les types de base des exercices
 */
export type MuscleGroupType = BaseEntityType;
export type MuscleGroupsResponseType = ResponseType<MuscleGroupType[]>;
