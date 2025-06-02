import React, { useState } from 'react';
import axios from 'axios';
import './Donate.css';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 250];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setIsCustomAmount(false);
    setCustomAmount('');
    setError('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setIsCustomAmount(true);
    setAmount('');
    setError('');
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationAmount = isCustomAmount ? customAmount : amount;
    setIsProcessing(true);
    setError('');

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay');
      }

      // Create order on backend
      const response = await axios.post('http://localhost:5000/create-order', {
        amount: parseFloat(donationAmount)
      });

      const { orderId, amount: orderAmount, currency } = response.data;

      // Configure Razorpay options
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: orderAmount,
        currency: currency,
        name: 'Water Footprint',
        description: 'Donation for Water Conservation',
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('http://localhost:5000/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              setSuccess(true);
              setAmount('');
              setCustomAmount('');
              setIsCustomAmount(false);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: 'Donor',
          email: 'donor@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#1e3c72'
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError('Failed to initialize payment. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="donate-container">
      <div className="donate-content">
        <div className="donate-header">
          <h1>Support Water Conservation</h1>
          <p>Your donation helps us continue our mission of promoting water conservation and sustainability.</p>
        </div>

        <div className="donate-body">
          <div className="donation-options">
            <h2>Select Amount</h2>
            <div className="amount-buttons">
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  className={`amount-button ${amount === value ? 'selected' : ''}`}
                  onClick={() => handleAmountSelect(value)}
                >
                  ₹{value}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <label htmlFor="customAmount">Custom Amount</label>
              <div className="custom-amount-input">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  id="customAmount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              className="donate-button"
              disabled={(!amount && !customAmount) || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Donate Now'}
            </button>
          </div>

          <div className="donation-info">
            <h2>Your Impact</h2>
            <div className="impact-items">
              <div className="impact-item">
                <i className="fas fa-tint"></i>
                <div>
                  <h3>Water Conservation</h3>
                  <p>Help us develop better water management solutions</p>
                </div>
              </div>
              <div className="impact-item">
                <i className="fas fa-globe"></i>
                <div>
                  <h3>Global Reach</h3>
                  <p>Support our efforts to spread awareness worldwide</p>
                </div>
              </div>
              <div className="impact-item">
                <i className="fas fa-seedling"></i>
                <div>
                  <h3>Sustainable Future</h3>
                  <p>Contribute to building a sustainable water future</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Thank you for your donation! Your payment was successful.
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate; 