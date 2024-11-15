import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const navItems = [
  { to: '/tableau-de-bord', label: 'Tableau de bord' },
  { to: '/activités', label: 'Activités' },
  { to: '/programmes', label: 'Programmes' }
];
export const NotAuhenticatedNavItems = [
  { to: '/', label: 'Accueil' },
  { to: '/connexion', label: 'Connexion' },
  { to: '/inscription', label: 'inscription' }
];

export const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' }
];
