import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const navItems = [
  { to: '/accueil', label: 'Accueil' },
  { to: '/activités', label: 'Activités' },
  { to: '/programmes', label: 'Programmes' }
];
export const NotAuhenticatedNavItems = [
  { to: '/', label: 'Accueil' },
  { to: '/connexion', label: 'Connexion' },
  { to: '/inscription', label: 'inscription' }
];

export const socials = [
  { icon: Facebook, label: 'Facebook', href: '' },
  { icon: Twitter, label: 'Twitter', href: '' },
  { icon: Instagram, label: 'Instagram', href: '' },
  { icon: Linkedin, label: 'LinkedIn', href: '' }
];
