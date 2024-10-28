import { cn } from '../../lib/cn';

type CardProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};
function Card({ size, children, className }: CardProps) {
  return (
    <div
      className={cn(
        {
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
