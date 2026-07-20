import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const newOrderId = location.state?.newOrder?._id;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders/my-orders');
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <p style={styles.centerText}>Loading orders...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>📋 My Orders</h2>

      {error && <p style={styles.error}>{error}</p>}

      {orders.length === 0 && (
        <p style={styles.centerText}>You have no orders yet.</p>
      )}

      {orders.map((order) => {
        const isNew = order._id === newOrderId;
        return (
          <div
            key={order._id}
            style={{
              ...styles.orderCard,
              ...(isNew ? styles.highlightedCard : {}),
            }}
          >
            {isNew && <span style={styles.newBadge}>Just Placed!</span>}

            <div style={styles.orderHeader}>
              <h3>
                {order.orderType === 'scan_and_go' ? '🛍️ Scan & Go' : '📦 Pre-Book'}
              </h3>
              <span style={styles.date}>{formatDate(order.createdAt)}</span>
            </div>

            <div style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <p key={idx} style={styles.itemLine}>
                  {item.name} x {item.quantity} — ₹{item.price * item.quantity}
                </p>
              ))}
            </div>

            <p style={styles.totalLine}>
              <strong>Total: ₹{order.totalAmount}</strong>
            </p>

            <p style={styles.paymentStatus}>
              Payment: <strong>{order.paymentStatus}</strong>
            </p>

            {order.orderType === 'scan_and_go' && order.exitCode && (
              <div style={styles.exitCodeBox}>
                <p style={styles.exitCodeLabel}>Show this at the exit gate:</p>
                <p style={styles.exitCode}>{order.exitCode}</p>
              </div>
            )}

            {order.orderType === 'pre_book' && (
              <div style={styles.pickupBox}>
                <p>
                  <strong>Pickup Slot:</strong> {formatDate(order.pickupSlot)}
                </p>
                <p>
                  <strong>Pickup Counter:</strong> {order.pickupCounter}
                </p>
                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
              </div>
            )}
          </div>
        );
      })}
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
  orderCard: {
    padding: '18px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    marginBottom: '20px',
    position: 'relative',
  },
  highlightedCard: {
    border: '2px solid #1a1a2e',
    backgroundColor: '#f5f5fa',
  },
  newBadge: {
    position: 'absolute',
    top: '-10px',
    right: '15px',
    backgroundColor: '#e94560',
    color: '#fff',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  date: {
    fontSize: '13px',
    color: '#888',
  },
  itemsList: {
    marginBottom: '10px',
  },
  itemLine: {
    fontSize: '14px',
    margin: '4px 0',
  },
  totalLine: {
    fontSize: '16px',
    marginTop: '10px',
  },
  paymentStatus: {
    fontSize: '14px',
    color: '#2e8b57',
  },
  exitCodeBox: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    textAlign: 'center',
  },
  exitCodeLabel: {
    color: '#ccc',
    fontSize: '13px',
    margin: 0,
  },
  exitCode: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '5px 0 0 0',
  },
  pickupBox: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#f0f0f5',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default MyOrders;