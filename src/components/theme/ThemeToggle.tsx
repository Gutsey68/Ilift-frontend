import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setIsDark(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('darkMode', newIsDark.toString());
        document.documentElement.classList.toggle('dark', newIsDark);
    };

    return (
        <button onClick={toggleTheme} className="p-2 text-neutral-12 transition-colors hover:text-green-9">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    );
};

export default ThemeToggle;
