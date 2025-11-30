import React, { useState } from 'react';
import { Settings as SettingsIcon, Maximize, Minimize, User, LogOut, HelpCircle } from 'lucide-react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { SettingsPanel } from './components/SettingsPanel';
import { ThemeToggle } from './components/ThemeToggle';
import { AuthModal } from './components/AuthModal';
import { ModeSwitcher } from './components/ModeSwitcher';
import { HelpModal } from './components/HelpModal';
import './index.css';

const FocusLoop: React.FC = () => {
  const { settings } = useSettings();
  const { session, signOut } = useAuth();
  const {
    timeLeft,
    isActive,
    mode,
    cycleCount,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer
  } = useTimer();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const getTotalTime = () => {
    if (mode === 'custom') return settings.customDuration;
    switch (mode) {
      case 'work': return settings.workDuration;
      case 'break': return settings.breakDuration;
      case 'longBreak': return settings.longBreakDuration;
      default: return settings.workDuration;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <img src="/logo.svg" alt="Focus Loop Logo" className="app-logo" />
          <h1 className="app-title">Focus Loop</h1>
        </div>
        <div className="header-controls">
          {session ? (
            <div className="user-menu">
              <div className="user-avatar" title={session.user.email}>
                {session.user.email?.[0].toUpperCase()}
              </div>
              <button
                className="settings-btn"
                onClick={() => signOut()}
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              className="settings-btn"
              onClick={() => setIsAuthOpen(true)}
              title="Sign In"
            >
              <User size={20} />
            </button>
          )}

          <button
            className="settings-btn"
            onClick={() => setIsHelpOpen(true)}
            title="Help & Info"
          >
            <HelpCircle size={20} />
          </button>

          <button
            className="theme-toggle-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <ThemeToggle />
          <button
            className="settings-btn"
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="timer-card">
          <ModeSwitcher />

          <div className="cycle-indicator">
            {mode === 'custom' ? (
              settings.customLoop ? `Loop ${cycleCount}` : 'Timer'
            ) : (
              `Cycle ${cycleCount} ${settings.loopLimit > 0 ? `/ ${settings.loopLimit}` : ''}`
            )}
          </div>

          <TimerDisplay
            timeLeft={timeLeft}
            totalTime={getTotalTime()}
            mode={mode}
          />

          <Controls
            isActive={isActive}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onSkip={skipTimer}
          />
        </div>
      </main>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <FocusLoop />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
