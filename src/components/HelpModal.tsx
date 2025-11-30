import React from 'react';
import { X, Clock, Repeat } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="settings-overlay">
            <div className="settings-modal">
                <div className="settings-header">
                    <h2>How it Works</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="settings-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="help-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <Repeat className="text-accent-work" size={24} style={{ color: 'var(--accent-work)' }} />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Focus Loop</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            Based on the Pomodoro Technique. It automatically alternates between <strong>Focus</strong> sessions and <strong>Breaks</strong>.
                        </p>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <li>Complete 4 focus cycles to trigger a <strong>Long Break</strong>.</li>
                            <li>Great for maintaining energy during long study or work sessions.</li>
                        </ul>
                    </div>

                    <div className="help-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <Clock className="text-accent-custom" size={24} style={{ color: 'var(--accent-custom)' }} />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Custom Timer</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            A flexible timer for single tasks. Set any duration you need.
                        </p>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <li>Perfect for workouts, naps, or unstructured work.</li>
                            <li>Enable <strong>Loop Timer</strong> in settings to repeat the timer automatically.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
