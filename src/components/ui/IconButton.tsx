import clsx from 'clsx';
import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function IconButton({ icon, className }: IconButtonProps) {
  return <button className={clsx('p-2 text-neutral-12 transition-colors hover:text-green-9', className)}>{icon}</button>;
}

export default IconButton;
