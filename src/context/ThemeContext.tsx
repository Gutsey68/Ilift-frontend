import { createContext } from 'react';

/**
 * Type définissant la structure du contexte de thème
 */
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

/**
 * Contexte pour gérer le thème global de l'application
 */
export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {}
});
