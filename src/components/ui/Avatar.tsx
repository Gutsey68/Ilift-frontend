import { cn } from '../../lib/cn';

type AvatarProps = {
  size: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt: string;
  className?: string;
};

const Avatar = ({ size, src, alt, className }: AvatarProps) => {
  return (
    <div
      className={cn(
        {
          'size-10': size === 'sm',
          'size-16': size === 'md',
          'size-24': size === 'lg',
          'size-36': size === 'xl',
          'rounded-full bg-neutral-4': true
        },
        className
      )}
    >
      {src ? <img className="size-full rounded-full object-cover" src={src} alt={alt} /> : <div className="size-full rounded-full"></div>}
    </div>
  );
};

export default Avatar;
