import React from 'react';

interface TimerDisplayProps {
    timeLeft: number;
    totalTime: number;
    mode: 'work' | 'break' | 'longBreak' | 'custom';
}

const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalTime, mode }) => {
    // Calculate progress for circle
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progress = totalTime > 0 ? (timeLeft / totalTime) : 0;
    const dashoffset = circumference * (1 - progress);

    const getModeLabel = () => {
        switch (mode) {
            case 'work': return 'Focus';
            case 'break': return 'Short Break';
            case 'longBreak': return 'Long Break';
            case 'custom': return 'Timer';
        }
    };

    return (
        <div className="timer-display-container">
            <div className="timer-circle-wrapper">
                <svg className="timer-svg" width="300" height="300" viewBox="0 0 300 300">
                    {/* Background Circle */}
                    <circle
                        className="timer-circle-bg"
                        cx="150"
                        cy="150"
                        r={radius}
                    />
                    {/* Progress Circle */}
                    <circle
                        className={`timer-circle-progress ${mode}`}
                        cx="150"
                        cy="150"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        transform="rotate(-90 150 150)"
                    />
                </svg>
                <div className="timer-text-overlay">
                    <div className="timer-mode-label">{getModeLabel()}</div>
                    <div className="timer-time">{formatTime(timeLeft)}</div>
                </div>
            </div>
        </div>
    );
};
