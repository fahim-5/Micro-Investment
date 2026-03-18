import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Theme Context
export const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'dark'
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [accentColor, setAccentColor] = useState('#00d4ff'); // Default cyan
  const [loading, setLoading] = useState(false);

  // Available themes
  const themes = {
    dark: {
      name: 'Dark',
      primary: '#0f172a',
      secondary: '#1e293b',
      text: '#f8fafc',
      muted: '#94a3b8',
      accent: accentColor,
      card: '#1e293b',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    light: {
      name: 'Light',
      primary: '#ffffff',
      secondary: '#f8fafc',
      text: '#1e293b',
      muted: '#64748b',
      accent: accentColor,
      card: '#f1f5f9',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#2563eb'
    },
    professional: {
      name: 'Professional',
      primary: '#111827',
      secondary: '#1f2937',
      text: '#f9fafb',
      muted: '#9ca3af',
      accent: '#06b6d4',
      card: '#1f2937',
      border: '#374151',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    modern: {
      name: 'Modern',
      primary: '#0a0a0a',
      secondary: '#18181b',
      text: '#fafafa',
      muted: '#a1a1aa',
      accent: '#8b5cf6',
      card: '#18181b',
      border: '#3f3f46',
      success: '#22c55e',
      warning: '#f97316',
      error: '#ef4444',
      info: '#0ea5e9'
    }
  };

  // Available accent colors
  const accentColors = [
    { name: 'Cyan', value: '#00d4ff' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
  ];

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    // Apply CSS variables
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-secondary', currentTheme.secondary);
    root.style.setProperty('--color-text', currentTheme.text);
    root.style.setProperty('--color-muted', currentTheme.muted);
    root.style.setProperty('--color-accent', accentColor);
    root.style.setProperty('--color-card', currentTheme.card);
    root.style.setProperty('--color-border', currentTheme.border);
    root.style.setProperty('--color-success', currentTheme.success);
    root.style.setProperty('--color-warning', currentTheme.warning);
    root.style.setProperty('--color-error', currentTheme.error);
    root.style.setProperty('--color-info', currentTheme.info);

    // Add theme class to body
    document.body.className = `theme-${theme}`;
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-accent-color', accentColor);
  }, [theme, accentColor]);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Change to specific theme
  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
    }
  };

  // Change accent color
  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  // Reset to default theme
  const resetTheme = () => {
    setTheme('dark');
    setAccentColor('#00d4ff');
  };

  // Get current theme object
  const getCurrentTheme = () => {
    return { ...themes[theme], accent: accentColor };
  };

  // Check if theme is dark
  const isDarkTheme = () => {
    return theme === 'dark' || theme === 'professional' || theme === 'modern';
  };

  // Context value
  const value = {
    theme,
    accentColor,
    themes,
    accentColors,
    loading,
    toggleTheme,
    changeTheme,
    changeAccentColor,
    resetTheme,
    getCurrentTheme,
    isDarkTheme,
    currentTheme: getCurrentTheme()
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;