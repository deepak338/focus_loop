import React from 'react';
import { useSettings } from '../context/SettingsContext';

export const ModeSwitcher: React.FC = () => {
    const { settings, updateSettings } = useSettings();

    return (
        <div className="mode-switcher">
            <button
                className={`mode-btn ${settings.timerMode === 'pomodoro' ? 'active' : ''}`}
                onClick={() => updateSettings({ timerMode: 'pomodoro' })}
            >
                Focus Loop
            </button>
            <button
                className={`mode-btn ${settings.timerMode === 'custom' ? 'active' : ''}`}
                onClick={() => updateSettings({ timerMode: 'custom' })}
            >
                Custom Timer
            </button>
        </div>
    );
};
