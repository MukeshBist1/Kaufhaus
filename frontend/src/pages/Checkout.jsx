import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    if (!user) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some products first.');
      return;
    }

    if (!address.fullName || !address.street || !address.city || !address.postalCode || !address.country) {
      alert('Please fill in all shipping address fields.');
      return;
    }

    setLoading(true);
    const fakePaymentId = `fakepay_${Date.now()}`;
    const orderItems = cartItems.map((item) => ({
      product: item.productId,
      quantity: item.qty,
      price: item.price
    }));

    try {
      const saveOrderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: totalPrice,
          address,
          paymentId: fakePaymentId
        })
      });

      const data = await saveOrderRes.json();
      if (saveOrderRes.ok) {
        dispatch(clearCart());
        navigate('/ordersuccess');
      } else {
        console.error('Create order error:', data);
        alert(data.message || 'Order placement failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to place your order right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2 className='text-3xl font-bold m-4 ml-5 text-blue-950 text-center'>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3 className='text-white'>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />

          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <p className='text-sm text-gray-300'>Since Razorpay is not available, this uses a fake payment flow to place the order directly.</p>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer btn bg-amber-700 rounded-md px-2 py-1 text-white transition transform duration-200 hover:bg-orange-500 hover:scale-110 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Placing order...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
