import { cn } from '../../lib/cn';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-neutral-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-12 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-9 text-neutral-950 hover:bg-green-7 h-10 px-4 py-2`,
        className
      )}
    >
      {children}
    </button>
  );
}
export default Button;
