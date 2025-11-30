import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const ThemeToggle: React.FC = () => {
    const { settings, updateSettings } = useSettings();

    const toggleTheme = () => {
        updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
    };

    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${settings.theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};
