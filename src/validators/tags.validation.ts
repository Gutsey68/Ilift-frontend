import { z } from 'zod';

export const createTagSchema = z.object({
  // good
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  })
});

export const updateTagSchema = z.object({
  // good
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});

export const deleteTagSchema = z.object({
  // good
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});
