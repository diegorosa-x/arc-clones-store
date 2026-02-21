import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  // Iniciamos com o que estiver no localStorage ou 'dark' como padrão da ARC Clones
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button 
      onClick={toggleTheme}
      className="  p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold"
      aria-label={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
      title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
    >
      <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
    </button>
  );
};

export default ThemeToggle;