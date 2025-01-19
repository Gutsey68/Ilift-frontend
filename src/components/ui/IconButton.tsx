import clsx from 'clsx';
import React from 'react';

/**
 * Composant bouton avec icône
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {React.ReactNode} props.icon - L'icône à afficher dans le bouton
 * @param {string} [props.className] - Classes CSS additionnelles
 * @returns {JSX.Element} Composant IconButton
 */
interface IconButtonProps {
  icon: React.ReactNode;
  className?: string;
}

function IconButton({ icon, className }: IconButtonProps) {
  return <button className={clsx('p-2 text-neutral-12 transition-colors hover:text-green-9', className)}>{icon}</button>;
}

export default IconButton;
