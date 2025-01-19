import { cn } from '../../lib/cn';

/**
 * Props pour le composant Spacing
 * @property size - Taille de l'espacement (sm, md, lg, xl, xxl)
 */
export type SpacingProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

/**
 * Composant utilitaire pour créer des espacements verticaux responsifs
 * Utilise différentes hauteurs selon la taille d'écran
 */
export const Spacing = ({ size = 'md' }: SpacingProps) => {
  return (
    <div
      className={cn({
        'h-8 lg:h-16': size === 'sm',
        'h-16 lg:h-24': size === 'md',
        'h-24 lg:h-32': size === 'lg',
        'h-32 lg:h-40': size === 'xl',
        'h-40 lg:h-52': size === 'xxl'
      })}
    />
  );
};
