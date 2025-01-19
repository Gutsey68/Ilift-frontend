import { cn } from '../../lib/cn';

/**
 * Composant Badge pour afficher un indicateur visuel
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Contenu du badge
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {'default' | 'destructive'} [props.variant='default'] - Variante visuelle du badge
 * @returns {JSX.Element} Composant Badge
 */
type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive';
};

function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={cn(
        {
          'text-green-11 bg-green-3': variant === 'default',
          'text-red-11 bg-red-3': variant === 'destructive',
          'w-fit rounded-xl px-1.5 text-sm ': true
        },
        className
      )}
    >
      {children}
    </div>
  );
}
export default Badge;
