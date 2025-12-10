import React, { useState } from 'react';
import { Settings as SettingsIcon, HelpCircle, Coffee } from 'lucide-react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { SettingsPanel } from './components/SettingsPanel';
import { ThemeToggle } from './components/ThemeToggle';
import { ModeSwitcher } from './components/ModeSwitcher';
import { HelpModal } from './components/HelpModal';
import { ConsentBanner } from './components/ConsentBanner';
import { CoffeeButton } from './components/CoffeeButton';
import { PolicyModal, PrivacyPolicy, TermsOfService, RefundPolicy } from './components/PolicyModals';
import { InfoSection } from './components/InfoSection';
import './index.css';

const FocusLoop: React.FC = () => {
  const { settings } = useSettings();
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
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);


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
          <button
            className="settings-btn"
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
          >
            <SettingsIcon size={20} />
          </button>

          <button
            className="coffee-btn-header"
            onClick={() => setIsCoffeeOpen(true)}
          >
            <Coffee size={18} />
            <span>Buy me a coffee</span>
          </button>

          <ThemeToggle />

          <button
            className="settings-btn"
            onClick={() => setIsHelpOpen(true)}
            title="Help & Info"
          >
            <HelpCircle size={20} />
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

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <ConsentBanner />

      {isCoffeeOpen && (
        <CoffeeButton onClose={() => setIsCoffeeOpen(false)} />
      )}

      <PolicyModal
        isOpen={policyModal === 'privacy'}
        onClose={() => setPolicyModal(null)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </PolicyModal>

      <PolicyModal
        isOpen={policyModal === 'terms'}
        onClose={() => setPolicyModal(null)}
        title="Terms of Service"
      >
        <TermsOfService />
      </PolicyModal>

      <PolicyModal
        isOpen={policyModal === 'refund'}
        onClose={() => setPolicyModal(null)}
        title="Refund Policy"
      >
        <RefundPolicy />
      </PolicyModal>

      <InfoSection />

      <footer className="app-footer">
        <div className="footer-links">
          <a href="/privacy.html" className="footer-link">Privacy Policy</a>
          <a href="/terms.html" className="footer-link">Terms of Service</a>
          <a href="/refund.html" className="footer-link">Refund Policy</a>
        </div>
        <p>© 2024 Focus Loop. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <SettingsProvider>
      <FocusLoop />
    </SettingsProvider>
  );
}

export default App;
