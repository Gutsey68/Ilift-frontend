import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * Récupère le thème initial depuis le localStorage ou les préférences système
 * @returns boolean Indiquant si le thème sombre est activé
 */
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    return savedTheme === 'true';
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

/**
 * Provider pour gérer le thème de l'application (clair/sombre)
 * Synchronise le thème avec le localStorage et les classes CSS
 * @param children - Composants enfants
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('darkMode', isDark.toString());
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
