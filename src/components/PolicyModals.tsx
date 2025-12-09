import React from 'react';

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="policy-overlay" onClick={onClose}>
            <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
                <div className="policy-header">
                    <h2>{title}</h2>
                    <button className="close-policy-btn" onClick={onClose}>×</button>
                </div>
                <div className="policy-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const PrivacyPolicy: React.FC = () => (
    <>
        <h3>Privacy Policy</h3>
        <p><strong>Effective Date:</strong> December 9, 2024</p>

        <h4>1. Information We Collect</h4>
        <p>Focus Loop is a local-first productivity timer application. We collect minimal information:</p>
        <ul>
            <li><strong>Local Storage:</strong> Timer settings and preferences are stored locally in your browser</li>
            <li><strong>Payment Information:</strong> When you choose to support us via "Buy me a coffee", payment processing is handled securely by Razorpay. We do not store your payment details</li>
            <li><strong>No Account Data:</strong> We do not require user accounts or personal information</li>
        </ul>

        <h4>2. How We Use Information</h4>
        <ul>
            <li>Timer preferences are stored locally to enhance your experience</li>
            <li>Payment information is used solely for processing your donation through Razorpay</li>
            <li>We do not track, collect, or share your personal data</li>
        </ul>

        <h4>3. Cookies</h4>
        <p>We use essential cookies and local storage to:</p>
        <ul>
            <li>Remember your timer settings</li>
            <li>Store your theme preferences</li>
            <li>Remember your consent choices for GDPR compliance</li>
        </ul>

        <h4>4. Third-Party Services</h4>
        <ul>
            <li><strong>Google AdSense:</strong> We use AdSense for advertisements. Google may use cookies for personalized ads. You can opt out via your consent preferences.</li>
            <li><strong>Razorpay:</strong> Payment processing is handled by Razorpay. Please review their privacy policy at razorpay.com</li>
        </ul>

        <h4>5. Your Rights</h4>
        <p>You have the right to:</p>
        <ul>
            <li>Clear your browser's local storage at any time</li>
            <li>Manage cookie preferences</li>
            <li>Request information about any data we may have</li>
        </ul>

        <h4>6. Contact Us</h4>
        <p>For privacy concerns, contact us through GitHub or our website.</p>
    </>
);

export const TermsOfService: React.FC = () => (
    <>
        <h3>Terms of Service</h3>
        <p><strong>Effective Date:</strong> December 9, 2024</p>

        <h4>1. Acceptance of Terms</h4>
        <p>By accessing and using Focus Loop, you accept and agree to be bound by these Terms of Service.</p>

        <h4>2. Description of Service</h4>
        <p>Focus Loop is a free productivity timer application that helps you manage work sessions using the Pomodoro Technique and custom timers.</p>

        <h4>3. Use of Service</h4>
        <ul>
            <li>The service is provided "as is" without warranties</li>
            <li>You may use the timer for personal and professional productivity</li>
            <li>We reserve the right to modify or discontinue the service at any time</li>
        </ul>

        <h4>4. Donations</h4>
        <ul>
            <li>The "Buy me a coffee" feature is optional and voluntary</li>
            <li>Donations support the development and hosting of Focus Loop</li>
            <li>All donations are processed securely through Razorpay</li>
        </ul>

        <h4>5. Intellectual Property</h4>
        <p>Focus Loop and its content are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our code without permission.</p>

        <h4>6. Limitation of Liability</h4>
        <p>Focus Loop is not liable for any damages arising from the use or inability to use the service.</p>

        <h4>7. Changes to Terms</h4>
        <p>We reserve the right to update these terms. Continued use of the service constitutes acceptance of updated terms.</p>
    </>
);

export const RefundPolicy: React.FC = () => (
    <>
        <h3>Refund & Cancellation Policy</h3>
        <p><strong>Effective Date:</strong> December 9, 2024</p>

        <h4>1. Nature of Donations</h4>
        <p>The "Buy me a coffee" feature accepts <strong>voluntary donations</strong> to support Focus Loop development. These are not purchases of goods or services.</p>

        <h4>2. No Refunds</h4>
        <p>All donations are <strong>final and non-refundable</strong>. By making a donation, you acknowledge that:</p>
        <ul>
            <li>You are making a voluntary contribution</li>
            <li>No goods, services, or features are promised in exchange</li>
            <li>The donation supports ongoing development and hosting costs</li>
        </ul>

        <h4>3. Payment Processing</h4>
        <ul>
            <li>All payments are processed securely through Razorpay</li>
            <li>Payment confirmation is sent immediately after successful transaction</li>
            <li>For payment issues, contact Razorpay support</li>
        </ul>

        <h4>4. Exceptional Circumstances</h4>
        <p>In case of:</p>
        <ul>
            <li>Duplicate charges due to technical errors</li>
            <li>Unauthorized transactions</li>
        </ul>
        <p>Please contact us immediately with transaction details. We will investigate and work with Razorpay to resolve the issue.</p>

        <h4>5. Contact for Issues</h4>
        <p>For payment-related concerns, contact us through our GitHub repository or support email.</p>
    </>
);
