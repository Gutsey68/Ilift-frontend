import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Composant Textarea personnalisé
 * Utilise forwardRef pour la compatibilité avec les formulaires
 * Applique des styles Tailwind pour l'apparence et les états
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-neutral-6 bg-neutral-1 px-3 py-2 text-sm ring-offset-neutral-1 placeholder:text-neutral-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
