import React, { memo } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = memo(
  ({ darkMode, setDarkMode }) => (
    <div className='flex items-center gap-2'>
      <Sun size={16} className={`${darkMode ? 'hidden' : 'block'}`} />
      <div
        onClick={() => setDarkMode(!darkMode)}
        className='w-9 h-5 flex items-center bg-gray-300 dark:bg-gray-300 rounded-full p-1 cursor-pointer transition-all'
      >
        <div
          className={`w-5 h-5 bg-white dark:bg-[#0077b6] rounded-full shadow-md transform transition-all ${
            darkMode ? 'translate-x-4' : 'translate-x-[-6px]'
          }`}
        />
      </div>
      <Moon size={16} className={`${darkMode ? 'block' : 'hidden'}`} />
    </div>
  )
);

export default ThemeToggle;
