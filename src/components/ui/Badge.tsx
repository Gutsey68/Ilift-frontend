import { cn } from '../../lib/cn';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <div {...props} className={cn('w-fit rounded-xl bg-green-3 px-1.5 text-sm text-green-11', className)}>
      {children}
    </div>
  );
}
export default Badge;
