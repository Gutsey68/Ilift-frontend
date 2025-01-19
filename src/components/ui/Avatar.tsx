import { cn } from '../../lib/cn';

/**
 * Composant Avatar pour afficher une image de profil ou un placeholder
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Taille de l'avatar
 * @param {string} [props.src] - URL de l'image
 * @param {string} props.alt - Texte alternatif pour l'image
 * @param {string} [props.className] - Classes CSS additionnelles
 * @returns {JSX.Element} Composant Avatar
 */
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
          'rounded-full bg-green-9': true
        },
        className
      )}
    >
      {src ? <img className="size-full rounded-full object-cover" src={src} alt={alt} /> : <div className="size-full rounded-full"></div>}
    </div>
  );
};

export default Avatar;
