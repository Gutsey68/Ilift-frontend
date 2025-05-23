import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Composant Input réutilisable avec style personnalisé
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {string} [props.type] - Type de l'input HTML
 * @param {React.Ref<HTMLInputElement>} ref - Référence React vers l'élément input
 * @returns {JSX.Element} Composant Input stylisé
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-neutral-6 bg-neutral-1 px-3 py-2 text-sm ring-offset-neutral-1 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
