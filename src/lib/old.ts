import { z } from 'zod';

export const loginSchemaOld = z.object({
  pseudo: z.string().min(1, 'Le pseudo est requis'),
  password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères')
});

export const forgotPasswordSchemaOld = z.object({
  email: z.string().email('Email invalide')
});

export const registerShemaOld = z
  .object({
    pseudo: z.string().min(1, 'Le pseudo est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères'),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  });

export const postShemaOld = z.object({
  content: z.string().min(1, 'Le contenu est requis'),
  photo: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const resetPasswordSchemaOld = z
  .object({
    newPassword: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères'),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  });

export const createProgramSchemaOld = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme est requis'),
    description: z.string().min(1, 'La déscription du programme est requise')
  })
});

export const updateProgramSchemaOld = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme ne peut être vide'),
    description: z.string()
  })
});
