import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => { }
});

export function ThemeProvider({ children }) {
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

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
