import { z } from 'zod';

/**
 * Schéma de validation pour la création d'un tag
 */
export const createTagSchema = z.object({
  // good
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  })
});

/**
 * Schéma de validation pour la mise à jour d'un tag
 */
export const updateTagSchema = z.object({
  // good
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});

/**
 * Schéma de validation pour la suppression d'un tag
 */
export const deleteTagSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});
