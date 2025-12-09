import React from 'react';
import { Coffee, Heart } from 'lucide-react';

interface CoffeeButtonProps {
    onClose: () => void;
}

export const CoffeeButton: React.FC<CoffeeButtonProps> = ({ onClose }) => {
    const handlePayment = () => {
        // Redirect to Razorpay.me payment page
        window.open('https://razorpay.me/@deepakkumar1975', '_blank');
        onClose();
    };

    return (
        <div className="coffee-modal-overlay" onClick={onClose}>
            <div className="coffee-modal" onClick={(e) => e.stopPropagation()}>
                <div className="coffee-header">
                    <div className="coffee-icon">
                        <Coffee size={32} />
                    </div>
                    <h2>Buy Me a Coffee</h2>
                    <p>Support Focus Loop development!</p>
                </div>

                <div className="coffee-content">
                    <p style={{ textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        Your support helps keep Focus Loop free and ad-free for everyone!
                    </p>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >
                        <Heart size={18} />
                        Support Focus Loop
                    </button>

                    <p className="test-note">
                        💳 Secure payment via Razorpay
                    </p>
                </div>

                <button className="close-coffee-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};
