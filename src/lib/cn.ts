import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne plusieurs classes CSS en une seule chaîne, en résolvant les conflits potentiels
 * entre les classes Tailwind.
 *
 * @param inputs - Un tableau de valeurs de classe (strings, objets, ou arrays)
 * @returns Une chaîne de caractères contenant les classes CSS fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
