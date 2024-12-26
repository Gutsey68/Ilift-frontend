import { cn } from '../../lib/cn';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
};

function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <div
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
