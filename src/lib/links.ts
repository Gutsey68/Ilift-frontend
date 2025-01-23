import {Github, Globe, Linkedin, Twitter} from "lucide-react";

/**
 * Éléments de navigation principaux de l'application
 * @type {Array<{to: string, label: string}>}
 */
export const navItems = [{ to: "/programmes", label: "Programmes" }];

/**
 * Éléments de navigation pour les utilisateurs non authentifiés
 * @type {Array<{to: string, label: string}>}
 */
export const NotAuhenticatedNavItems = [
  { to: "/connexion", label: "Connexion" },
  { to: "/inscription", label: "Inscription" },
];

/**
 * Liens vers les réseaux sociaux avec leurs icônes associées
 * @type {Array<{icon: LucideIcon, label: string, href: string}>}
 */
export const socials = [
  { icon: Github, label: "Github", href: "https://github.com/Gutsey68" },
  { icon: Globe, label: "Globe", href: "https://www.seyzeriat.com/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/Gauthier__sey" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gauthier-seyzeriat-meyer-1b8582281/",
  },
];
