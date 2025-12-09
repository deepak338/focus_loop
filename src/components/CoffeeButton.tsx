import React, { useState } from 'react';
import { Coffee, Heart } from 'lucide-react';

interface CoffeeButtonProps {
    onClose: () => void;
}

export const CoffeeButton: React.FC<CoffeeButtonProps> = ({ onClose }) => {
    const [amount, setAmount] = useState(50); // Default amount in INR
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: 'rzp_test_RpRUSWBC2AstFV', // Your Razorpay Test Key
                    amount: amount * 100, // Amount in paise (smallest currency unit)
                    currency: 'INR',
                    name: 'Focus Loop',
                    description: 'Buy me a coffee ☕',
                    image: '/logo.svg',
                    handler: function (response: any) {
                        alert('Payment Successful! Thank you for your support! 🎉');
                        console.log('Payment ID:', response.razorpay_payment_id);
                        onClose();
                    },
                    prefill: {
                        name: '',
                        email: '',
                        contact: ''
                    },
                    theme: {
                        color: '#4f46e5'
                    },
                    modal: {
                        ondismiss: function () {
                            setLoading(false);
                        }
                    }
                };

                const razorpay = new (window as any).Razorpay(options);
                razorpay.open();
                setLoading(false);
            };

            script.onerror = () => {
                alert('Failed to load payment gateway. Please try again.');
                setLoading(false);
            };
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
            setLoading(false);
        }
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
                    <div className="amount-selector">
                        <button
                            className={`amount-btn ${amount === 50 ? 'active' : ''}`}
                            onClick={() => setAmount(50)}
                        >
                            ☕ ₹50
                        </button>
                        <button
                            className={`amount-btn ${amount === 100 ? 'active' : ''}`}
                            onClick={() => setAmount(100)}
                        >
                            ☕☕ ₹100
                        </button>
                        <button
                            className={`amount-btn ${amount === 200 ? 'active' : ''}`}
                            onClick={() => setAmount(200)}
                        >
                            ☕☕☕ ₹200
                        </button>
                    </div>

                    <div className="custom-amount">
                        <label>Or enter custom amount (₹):</label>
                        <input
                            type="number"
                            min="10"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value) || 50)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                        disabled={loading || amount < 10}
                    >
                        {loading ? (
                            'Processing...'
                        ) : (
                            <>
                                <Heart size={18} />
                                Pay ₹{amount} with Razorpay
                            </>
                        )}
                    </button>

                    <p className="test-note">
                        🔒 TEST MODE - Use Razorpay test cards for payment testing.
                    </p>
                </div>

                <button className="close-coffee-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};
