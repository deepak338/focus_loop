import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type TimerModeType = 'pomodoro' | 'custom';

export interface Settings {
    timerMode: TimerModeType;
    workDuration: number; // in seconds
    breakDuration: number; // in seconds
    longBreakDuration: number; // in seconds
    longBreakInterval: number; // number of cycles before long break
    autoStartBreaks: boolean;
    autoStartWork: boolean;
    loopLimit: number; // 0 for infinite
    theme: Theme;
    // Custom Mode Settings
    customDuration: number; // in seconds
    customLoop: boolean;
}

const DEFAULT_SETTINGS: Settings = {
    timerMode: 'pomodoro',
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartWork: true,
    loopLimit: 0,
    theme: 'light',
    customDuration: 30 * 60, // Default 30 mins
    customLoop: false,
};

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('focus-loop-settings');
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('focus-loop-settings', JSON.stringify(settings));
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
