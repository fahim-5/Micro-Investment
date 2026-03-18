import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiSettings } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme, changeTheme, accentColors, changeAccentColor } = useTheme();
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center p-2 rounded-lg bg-secondary hover:bg-card transition-colors"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          <FiSun className="text-yellow-400 text-xl" />
        ) : (
          <FiMoon className="text-blue-400 text-xl" />
        )}
      </button>

      {/* Settings Dropdown */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="ml-2 p-2 rounded-lg bg-secondary hover:bg-card transition-colors"
        title="Theme settings"
      >
        <FiSettings className="text-muted" />
      </button>

      {/* Theme Settings Panel */}
      {showSettings && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl p-4 z-50">
          <div className="mb-4">
            <h3 className="font-bold text-text mb-2">Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => changeTheme('dark')}
                className={`p-2 rounded-lg border ${theme === 'dark' ? 'border-accent bg-accent/10' : 'border-border'}`}
              >
                <span className="text-text">Dark</span>
              </button>
              <button
                onClick={() => changeTheme('light')}
                className={`p-2 rounded-lg border ${theme === 'light' ? 'border-accent bg-accent/10' : 'border-border'}`}
              >
                <span className="text-text">Light</span>
              </button>
              <button
                onClick={() => changeTheme('professional')}
                className={`p-2 rounded-lg border ${theme === 'professional' ? 'border-accent bg-accent/10' : 'border-border'}`}
              >
                <span className="text-text">Professional</span>
              </button>
              <button
                onClick={() => changeTheme('modern')}
                className={`p-2 rounded-lg border ${theme === 'modern' ? 'border-accent bg-accent/10' : 'border-border'}`}
              >
                <span className="text-text">Modern</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-text mb-2">Accent Color</h3>
            <div className="flex flex-wrap gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => changeAccentColor(color.value)}
                  className="h-8 w-8 rounded-full border-2 border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;