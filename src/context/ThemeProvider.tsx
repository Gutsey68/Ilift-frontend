import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    return savedTheme === 'true';
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

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
