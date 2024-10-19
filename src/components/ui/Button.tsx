import { cn } from '../../lib/cn';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                `inline-block rounded-md bg-neutral-12 px-5 py-3 text-sm font-medium text-neutral-1 hover:bg-neutral-11 focus:outline-none focus:ring-2 focus:ring-neutral-12 focus:ring-offset-2 transition-colors`,
                className
            )}
        >
            {children}
        </button>
    );
}
export default Button;
