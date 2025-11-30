import { useEffect, useRef, useState, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';

type TimerMode = 'work' | 'break' | 'longBreak' | 'custom';

export interface TimerState {
    timeLeft: number;
    isActive: boolean;
    mode: TimerMode;
    cycleCount: number;
    totalCycles: number; // How many work sessions completed
}

export const useTimer = () => {
    const { settings } = useSettings();
    const workerRef = useRef<Worker | null>(null);

    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(settings.workDuration);
    const [isActive, setIsActive] = useState(false);
    const [cycleCount, setCycleCount] = useState(1); // Current cycle (1 of 4)
    const [totalCycles, setTotalCycles] = useState(0); // Total completed work sessions

    // Initialize Worker
    useEffect(() => {
        workerRef.current = new Worker(new URL('../workers/timer.worker.ts', import.meta.url), {
            type: 'module'
        });

        workerRef.current.onmessage = (e) => {
            if (e.data.type === 'TICK') {
                setTimeLeft((prev) => prev - 1);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    // Define actions first to avoid hoisting issues
    const startTimer = useCallback(() => {
        setIsActive(true);
        workerRef.current?.postMessage({ type: 'START' });
    }, []);

    const pauseTimer = useCallback(() => {
        setIsActive(false);
        workerRef.current?.postMessage({ type: 'STOP' });
    }, []);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        workerRef.current?.postMessage({ type: 'RESET' });

        // Reset to current mode's start time
        if (mode === 'work') setTimeLeft(settings.workDuration);
        if (mode === 'break') setTimeLeft(settings.breakDuration);
        if (mode === 'longBreak') setTimeLeft(settings.longBreakDuration);
        if (mode === 'custom') setTimeLeft(settings.customDuration);
    }, [mode, settings]);

    const handleTimerComplete = useCallback(() => {
        setIsActive(false);
        workerRef.current?.postMessage({ type: 'STOP' });

        // Play sound
        playNotificationSound();

        // Send notification
        if (Notification.permission === 'granted') {
            new Notification('Focus Loop', {
                body: `${mode === 'work' ? 'Focus session' : (mode === 'custom' ? 'Timer' : 'Break')} complete!`,
                icon: '/logo.svg' // Fallback icon
            });
        }

        let nextMode: TimerMode = mode;
        let nextTime = 0;
        let shouldAutoStart = false;

        if (settings.timerMode === 'custom') {
            // Custom Mode Logic
            if (settings.customLoop) {
                nextMode = 'custom';
                nextTime = settings.customDuration;
                shouldAutoStart = true;
                setCycleCount((prev) => prev + 1);
            } else {
                // Stop
                nextMode = 'custom';
                nextTime = settings.customDuration;
                shouldAutoStart = false;
                // Reset cycle count?
            }
        } else {
            // Pomodoro Logic
            if (mode === 'work') {
                setTotalCycles((prev) => prev + 1);
                const isLongBreak = (cycleCount % settings.longBreakInterval === 0);

                if (isLongBreak) {
                    nextMode = 'longBreak';
                    nextTime = settings.longBreakDuration;
                } else {
                    nextMode = 'break';
                    nextTime = settings.breakDuration;
                }
                shouldAutoStart = settings.autoStartBreaks;
            } else {
                // Break or Long Break finished
                nextMode = 'work';
                nextTime = settings.workDuration;
                setCycleCount((prev) => {
                    return prev + 1;
                });
                shouldAutoStart = settings.autoStartWork;
            }

            // Check Loop Limit
            if (settings.loopLimit > 0 && cycleCount > settings.loopLimit && nextMode === 'work') {
                shouldAutoStart = false;
            }
        }

        setMode(nextMode);
        setTimeLeft(nextTime);

        if (shouldAutoStart) {
            startTimer();
        }
    }, [mode, cycleCount, settings, startTimer]);

    const skipTimer = useCallback(() => {
        // Force complete
        handleTimerComplete();
    }, [handleTimerComplete]);

    // Handle Timer Completion
    useEffect(() => {
        if (timeLeft > 0) return;
        handleTimerComplete();
    }, [timeLeft, handleTimerComplete]);

    // Update time when settings change (if not active)
    useEffect(() => {
        if (!isActive) {
            if (settings.timerMode === 'custom') {
                setMode('custom');
                setTimeLeft(settings.customDuration);
            } else {
                // If switching back to pomodoro, default to work
                if (mode === 'custom') {
                    setMode('work');
                    setTimeLeft(settings.workDuration);
                } else {
                    if (mode === 'work') setTimeLeft(settings.workDuration);
                    if (mode === 'break') setTimeLeft(settings.breakDuration);
                    if (mode === 'longBreak') setTimeLeft(settings.longBreakDuration);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings, mode]);

    // Dynamic Title
    useEffect(() => {
        const formattedTime = formatTimeForTitle(timeLeft);
        const modeIcon = mode === 'work' ? '🔴' : (mode === 'custom' ? '⏱️' : '🟢');
        document.title = `${formattedTime} ${modeIcon} Focus Loop`;
    }, [timeLeft, mode]);

    // Request Notification Permission on mount
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    return {
        timeLeft,
        isActive,
        mode,
        cycleCount,
        totalCycles,
        startTimer,
        pauseTimer,
        resetTimer,
        skipTimer
    };
};

// Helper for Title Time
const formatTimeForTitle = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
};

// Helper for Sound
const playNotificationSound = () => {
    try {
        const audio = new Audio('/alarm.mp3');
        audio.loop = true;
        audio.play().catch(e => console.error('Audio play failed', e));

        // Stop after 5 seconds
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 5000);
    } catch (e) {
        console.error('Audio setup failed', e);
    }
};
