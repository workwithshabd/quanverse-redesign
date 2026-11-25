import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => { }
});
