import React, { useEffect, useState } from 'react';

interface CustomTimerInputProps {
    totalSeconds: number;
    onChange: (seconds: number) => void;
    onEnter?: () => void;
}

export const CustomTimerInput: React.FC<CustomTimerInputProps> = ({ totalSeconds, onChange, onEnter }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }, [totalSeconds]);

    const handleChange = (field: 'h' | 'm' | 's', value: number) => {
        let newH = hours;
        let newM = minutes;
        let newS = seconds;

        if (field === 'h') newH = value;
        if (field === 'm') newM = value;
        if (field === 's') newS = value;

        const total = (newH * 3600) + (newM * 60) + newS;
        onChange(total);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onEnter) {
            onEnter();
        }
    };

    return (
        <div className="custom-timer-input">
            <div className="time-field">
                <label>Hr</label>
                <input
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => handleChange('h', Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <span className="separator">:</span>
            <div className="time-field">
                <label>Min</label>
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => handleChange('m', Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <span className="separator">:</span>
            <div className="time-field">
                <label>Sec</label>
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => handleChange('s', Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};
