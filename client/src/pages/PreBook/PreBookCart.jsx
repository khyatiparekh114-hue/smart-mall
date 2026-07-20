import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const PreBookCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cart/pre_book');
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      setError('');
      await api.delete(`/cart/remove/${productId}`, {
        data: { cartType: 'pre_book' },
      });
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove item');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.priceAtAddition * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (!pickupDate || !pickupTime) {
      setError('Please select a pickup date and time');
      return;
    }

    try {
      setError('');
      const pickupSlot = new Date(`${pickupDate}T${pickupTime}`);

      const { data } = await api.post('/orders/checkout', {
        cartType: 'pre_book',
        pickupSlot: pickupSlot.toISOString(),
      });

      navigate('/my-orders', { state: { newOrder: data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    }
  };

  if (loading) {
    return <p style={styles.centerText}>Loading cart...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>📦 Your Pre-Book Cart</h2>

      {error && <p style={styles.error}>{error}</p>}

      {(!cart || !cart.items || cart.items.length === 0) && (
        <p style={styles.centerText}>
          Your Pre-Book cart is empty. Go browse some products!
        </p>
      )}

      {cart && cart.items && cart.items.length > 0 && (
        <>
          {cart.items.map((item) => (
            <div key={item._id} style={styles.itemCard}>
              <div>
                <h4>{item.product?.name}</h4>
                <p>
                  ₹{item.priceAtAddition} x {item.quantity} = ₹
                  {item.priceAtAddition * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.product._id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={styles.totalRow}>
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>

          <div style={styles.pickupForm}>
            <h4>Select Pickup Slot</h4>

            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={styles.input}
              min={new Date().toISOString().split('T')[0]}
            />

            <label style={styles.label}>Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Confirm Pre-Book & Pay
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
  },
  centerText: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#888',
  },
  itemCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  removeButton: {
    padding: '8px 14px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  totalRow: {
    textAlign: 'right',
    marginTop: '20px',
    marginBottom: '10px',
  },
  pickupForm: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  label: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  checkoutButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default PreBookCart;