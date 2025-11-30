import React from 'react';
import { X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { CustomTimerInput } from './CustomTimerInput';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
    const { settings, updateSettings } = useSettings();

    if (!isOpen) return null;

    const handleChange = (key: keyof typeof settings, value: any) => {
        updateSettings({ [key]: value });
    };

    return (
        <div className="settings-overlay">
            <div className="settings-modal">
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="settings-content">
                    {settings.timerMode === 'pomodoro' ? (
                        <>
                            <div className="setting-group">
                                <h3>Timer Durations (minutes)</h3>
                                <div className="input-row">
                                    <label>
                                        Focus
                                        <input
                                            type="number"
                                            value={settings.workDuration / 60}
                                            onChange={(e) => handleChange('workDuration', Number(e.target.value) * 60)}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Short Break
                                        <input
                                            type="number"
                                            value={settings.breakDuration / 60}
                                            onChange={(e) => handleChange('breakDuration', Number(e.target.value) * 60)}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Long Break
                                        <input
                                            type="number"
                                            value={settings.longBreakDuration / 60}
                                            onChange={(e) => handleChange('longBreakDuration', Number(e.target.value) * 60)}
                                            min="1"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="setting-group">
                                <h3>Loop Configuration</h3>
                                <div className="input-row">
                                    <label>
                                        Long Break Interval
                                        <input
                                            type="number"
                                            value={settings.longBreakInterval}
                                            onChange={(e) => handleChange('longBreakInterval', Number(e.target.value))}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Loop Limit (0 = Infinite)
                                        <input
                                            type="number"
                                            value={settings.loopLimit}
                                            onChange={(e) => handleChange('loopLimit', Number(e.target.value))}
                                            min="0"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="setting-group">
                                <h3>Automation</h3>
                                <div className="toggle-row">
                                    <label className="toggle-label">
                                        <span>Auto-start Breaks</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.autoStartBreaks}
                                            onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                                        />
                                    </label>
                                    <label className="toggle-label">
                                        <span>Auto-start Focus</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.autoStartWork}
                                            onChange={(e) => handleChange('autoStartWork', e.target.checked)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="setting-group">
                            <h3>Custom Timer</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <CustomTimerInput
                                    totalSeconds={settings.customDuration}
                                    onChange={(val) => handleChange('customDuration', val)}
                                />
                            </div>
                            <div className="toggle-row">
                                <label className="toggle-label">
                                    <span>Loop Timer</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.customLoop}
                                        onChange={(e) => handleChange('customLoop', e.target.checked)}
                                    />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
