import { cn } from '../../lib/cn';

type AvatarProps = {
    size: 'sm' | 'md' | 'lg';
    src?: string;
    alt: string;
    className?: string;
};

const Avatar = ({ size, src, alt, className }: AvatarProps) => {
    return (
        <div
            className={cn(
                {
                    'w-8 h-8': size === 'sm',
                    'w-16 h-16': size === 'md',
                    'w-24 h-24': size === 'lg',
                    'rounded-full bg-neutral-400': true
                },
                className
            )}
        >
            {src ? <img className="size-full rounded-full object-cover" src={src} alt={alt} /> : <div className="size-full rounded-full bg-neutral-200"></div>}
        </div>
    );
};

export default Avatar;
