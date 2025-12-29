import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Checkout = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/cart/checkout');
            alert('Payment Successful! Thank you for your order.');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Checkout failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section" style={{ maxWidth: '600px' }}>
            <h2 className="section-title">Checkout</h2>
            <form onSubmit={handleCheckout} className="card" style={{ padding: '30px' }}>
                <h3 style={{ marginBottom: '20px' }}>Payment Details</h3>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>

                {paymentMethod === 'card' ? (
                    <>
                        <input type="text" placeholder="Card Number" required />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="MM/YY" required style={{ flex: 1 }} />
                            <input type="text" placeholder="CVV" required style={{ flex: 1 }} />
                        </div>
                        <input type="text" placeholder="Cardholder Name" required />
                    </>
                ) : (
                    <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" required />
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
                    {loading ? 'Processing...' : `Pay Now (${paymentMethod === 'card' ? 'Card' : 'UPI'})`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
