import React, { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = /*#__PURE__*/createContext(undefined);
export function ThemeProvider({
  children
}) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: {
      theme,
      toggleTheme
    }
  }, children);
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}