import React, { useState, useEffect } from 'react';

interface ConsentBannerProps {
    onConsentChange?: (hasConsent: boolean) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsentChange }) => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already given consent
        const consent = localStorage.getItem('gdpr-consent');
        if (!consent) {
            setShowBanner(true);
        } else {
            onConsentChange?.(consent === 'accepted');
        }
    }, [onConsentChange]);

    const handleAccept = () => {
        localStorage.setItem('gdpr-consent', 'accepted');
        setShowBanner(false);
        onConsentChange?.(true);

        // Reload ads if they were blocked
        if (window.adsbygoogle) {
            try {
                (window.adsbygoogle as any).push({});
            } catch (e) {
                console.log('AdSense initialization after consent');
            }
        }
    };

    const handleReject = () => {
        localStorage.setItem('gdpr-consent', 'rejected');
        setShowBanner(false);
        onConsentChange?.(false);
    };

    if (!showBanner) return null;

    return (
        <div className="consent-overlay">
            <div className="consent-banner">
                <div className="consent-header">
                    <h3>Cookie Consent</h3>
                </div>

                <div className="consent-content">
                    <p>
                        We use cookies and similar technologies to provide personalized content and ads.
                        By clicking "Accept", you consent to the use of cookies for analytics and personalized advertising.
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        You can change your preferences at any time. For users in the EEA, UK, and Switzerland,
                        we comply with GDPR and TCF v2.2 standards.
                    </p>
                </div>

                <div className="consent-actions">
                    <button
                        onClick={handleReject}
                        className="consent-btn consent-btn-secondary"
                    >
                        Reject
                    </button>
                    <button
                        onClick={handleAccept}
                        className="consent-btn consent-btn-primary"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

// Add type declaration for window
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}
