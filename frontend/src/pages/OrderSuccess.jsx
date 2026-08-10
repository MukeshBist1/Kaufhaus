import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-page" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ maxWidth: '580px', width: '100%', background: '#111827', borderRadius: '20px', padding: '38px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h1 style={{ color: '#f97316', fontSize: '2.5rem', marginBottom: '22px' }}>Order Placed!</h1>
        <p style={{ color: '#e5e7eb', fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px' }}>
          Your order has been placed successfully using the fake payment flow. This means the app saved the order without a real payment provider.
        </p>
        <button
          onClick={() => navigate('/shop')}
          style={{ background: '#f97316', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '10px', cursor: 'pointer' }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
