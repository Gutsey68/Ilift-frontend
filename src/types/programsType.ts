/**
 * Type représentant un programme d'entraînement
 * @property id - Identifiant unique du programme
 * @property name - Nom du programme
 * @property description - Description détaillée
 * @property position - Position dans la liste des programmes
 */
export type ProgramType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  position: number;
};
