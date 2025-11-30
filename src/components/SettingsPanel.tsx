import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { CustomTimerInput } from './CustomTimerInput';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
    const { settings, updateSettings } = useSettings();
    const [localSettings, setLocalSettings] = useState(settings);
    const [error, setError] = useState<string | null>(null);

    // Sync local state when panel opens or settings change externally
    useEffect(() => {
        if (isOpen) {
            setLocalSettings(settings);
            setError(null);
        }
    }, [isOpen, settings]);

    if (!isOpen) return null;

    const handleChange = (key: keyof typeof settings, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
        setError(null);
    };

    const handleSave = () => {
        // Validation
        if (localSettings.timerMode === 'pomodoro') {
            if (localSettings.workDuration <= 0 ||
                localSettings.breakDuration <= 0 ||
                localSettings.longBreakDuration <= 0) {
                setError('All durations must be greater than 0');
                return;
            }
        } else {
            if (localSettings.customDuration <= 0) {
                setError('Duration must be greater than 0');
                return;
            }
        }

        updateSettings(localSettings);
        onClose();
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
                    {localSettings.timerMode === 'pomodoro' ? (
                        <>
                            <div className="setting-group">
                                <h3>Timer Durations (minutes)</h3>
                                <div className="input-row">
                                    <label>
                                        Focus
                                        <input
                                            type="number"
                                            value={Math.floor(localSettings.workDuration / 60)}
                                            onChange={(e) => handleChange('workDuration', Math.max(0, Number(e.target.value)) * 60)}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Short Break
                                        <input
                                            type="number"
                                            value={Math.floor(localSettings.breakDuration / 60)}
                                            onChange={(e) => handleChange('breakDuration', Math.max(0, Number(e.target.value)) * 60)}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Long Break
                                        <input
                                            type="number"
                                            value={Math.floor(localSettings.longBreakDuration / 60)}
                                            onChange={(e) => handleChange('longBreakDuration', Math.max(0, Number(e.target.value)) * 60)}
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
                                            value={localSettings.longBreakInterval}
                                            onChange={(e) => handleChange('longBreakInterval', Math.max(1, Number(e.target.value)))}
                                            min="1"
                                        />
                                    </label>
                                    <label>
                                        Loop Limit (0 = Infinite)
                                        <input
                                            type="number"
                                            value={localSettings.loopLimit}
                                            onChange={(e) => handleChange('loopLimit', Math.max(0, Number(e.target.value)))}
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
                                            checked={localSettings.autoStartBreaks}
                                            onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                                        />
                                    </label>
                                    <label className="toggle-label">
                                        <span>Auto-start Focus</span>
                                        <input
                                            type="checkbox"
                                            checked={localSettings.autoStartWork}
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
                                    totalSeconds={localSettings.customDuration}
                                    onChange={(val) => handleChange('customDuration', val)}
                                />
                            </div>
                            <div className="toggle-row">
                                <label className="toggle-label">
                                    <span>Loop Timer</span>
                                    <input
                                        type="checkbox"
                                        checked={localSettings.customLoop}
                                        onChange={(e) => handleChange('customLoop', e.target.checked)}
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    {error && <div className="error-message" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>{error}</div>}

                    <div className="settings-footer" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="save-btn"
                            onClick={handleSave}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'var(--accent-work)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                        >
                            <Save size={20} />
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
