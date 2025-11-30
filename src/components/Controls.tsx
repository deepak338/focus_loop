import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlsProps {
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onSkip: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isActive, onStart, onPause, onReset, onSkip }) => {
    return (
        <div className="controls-container">
            <button
                className="control-btn secondary"
                onClick={onReset}
                title="Reset Timer"
            >
                <RotateCcw size={24} />
            </button>

            <button
                className={`control-btn primary ${isActive ? 'active' : ''}`}
                onClick={isActive ? onPause : onStart}
                title={isActive ? "Pause" : "Start"}
            >
                {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>

            <button
                className="control-btn secondary"
                onClick={onSkip}
                title="Skip to next"
            >
                <SkipForward size={24} />
            </button>
        </div>
    );
};
