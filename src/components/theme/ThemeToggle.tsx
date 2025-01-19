import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Composant bouton pour basculer entre le thème clair et sombre
 * @component
 * @returns {JSX.Element} Bouton de basculement de thème avec icône soleil/lune
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="p-2 text-neutral-12 transition-colors hover:text-green-9">
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
};

export default ThemeToggle;
