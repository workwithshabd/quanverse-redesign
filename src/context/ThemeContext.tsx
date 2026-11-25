import { useEffect, type ReactNode } from 'react';
import { ThemeContext } from './themeContextDefinition';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = 'dark';
  const isDark = true;
  const toggleTheme = () => { };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('quanverse-theme', 'dark');

    const metaTheme = document.querySelector('meta[name="color-scheme"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', 'dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
