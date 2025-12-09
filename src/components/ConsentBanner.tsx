import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X } from 'lucide-react';

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
                <div className="consent-banner-inner">
                    <div className="consent-icon-header">
                        <div className="consent-icon-wrapper">
                            <Cookie size={28} strokeWidth={2} />
                        </div>
                        <h3 className="consent-title">Cookie Preferences</h3>
                    </div>

                    <div className="consent-content">
                        <p className="consent-description">
                            We use cookies to enhance your experience and show personalized ads.
                            Your privacy matters to us.
                        </p>
                        <div className="consent-features">
                            <div className="consent-feature">
                                <Shield size={16} />
                                <span>GDPR Compliant</span>
                            </div>
                            <div className="consent-feature">
                                <Cookie size={16} />
                                <span>Personalized Experience</span>
                            </div>
                        </div>
                    </div>

                    <div className="consent-actions">
                        <button
                            onClick={handleReject}
                            className="consent-btn consent-btn-secondary"
                        >
                            <X size={18} />
                            Decline
                        </button>
                        <button
                            onClick={handleAccept}
                            className="consent-btn consent-btn-primary"
                        >
                            <Check size={18} />
                            Accept All
                        </button>
                    </div>
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
