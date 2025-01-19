import { cn } from '../../lib/cn';

/**
 * Composant Card pour afficher du contenu dans un conteneur stylisé
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'} props.size - Taille du padding de la carte
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {React.ReactNode} props.children - Contenu de la carte
 * @returns {JSX.Element} Composant Card
 */
type CardProps = {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};

function Card({ size, children, className }: CardProps) {
  return (
    <div
      className={cn(
        {
          'p-0': size === 'xxs',
          'p-2': size === 'xs',
          'p-3': size === 'sm',
          'p-4': size === 'md',
          'p-6': size === 'lg',
          'p-8': size === 'xl',
          'rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 shadow-sm': true
        },
        className
      )}
    >
      {children}
    </div>
  );
}
export default Card;
