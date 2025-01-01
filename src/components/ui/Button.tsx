import { LoaderCircle } from 'lucide-react';
import { cn } from '../../lib/cn';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  isPending?: boolean;
};

function Button({ children, className, variant = 'default', isPending, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isPending}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-neutral-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-12 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
        {
          'bg-green-9 text-neutral-950 hover:bg-green-7': variant === 'default',
          'bg-neutral-3 text-neutral-12 hover:bg-neutral-4': variant === 'secondary',
          'border border-green-11 bg-transparent text-green-11 hover:bg-green-2': variant === 'outline',
          'bg-red-9 text-white hover:bg-red-7': variant === 'destructive'
        },
        className
      )}
    >
      {isPending ? <LoaderCircle className="animate-spin" size={20} /> : children}
    </button>
  );
}

export default Button;
