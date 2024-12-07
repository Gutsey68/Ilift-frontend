import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeSwitch() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <label className="mb-5 inline-flex cursor-pointer items-center">
      <input checked={isDark} type="checkbox" value="" className="peer sr-only" onChange={toggleTheme} />
      <div className="peer relative z-30 h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-9 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-4 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-green-11 rtl:peer-checked:after:-translate-x-full">
        {isDark ? (
          <Sun className="absolute left-6 top-1 z-40 text-neutral-1" size={16} />
        ) : (
          <Moon size={16} className="absolute left-1 top-1 z-40 text-neutral-10" />
        )}
      </div>
      <span className="ms-3 min-w-max text-sm font-medium text-neutral-11 hover:text-green-11">Changer de thème</span>
    </label>
  );
}
export default ThemeSwitch;
