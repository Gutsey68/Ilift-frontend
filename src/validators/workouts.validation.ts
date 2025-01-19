import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une séance d'entraînement
 */
export const createWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis'),
    programId: z.string().min(1, "L'identifiant du programme est requis")
  })
});

/**
 * Schéma de validation pour la mise à jour d'une séance d'entraînement
 */
export const updateWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis'),
    position: z.number().int().optional()
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

/**
 * Schéma de validation pour la suppression d'une séance d'entraînement
 */
export const deleteWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

/**
 * Schéma de validation pour la récupération des exercices d'une séance
 */
export const getExercicesOfWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});
