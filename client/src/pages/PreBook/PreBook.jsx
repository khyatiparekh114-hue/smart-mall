import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const PreBook = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId, productName) => {
    try {
      setError('');
      setMessage('');
      await api.post('/cart/add', {
        productId,
        quantity: 1,
        cartType: 'pre_book',
      });
      setMessage(`${productName} added to your Pre-Book cart!`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add to cart');
    }
  };

  if (loading) {
    return <p style={styles.centerText}>Loading products...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2>📦 Pre-Book Products</h2>
        <Link to="/pre-book-cart" style={styles.cartLink}>
          Go to Pre-Book Cart →
        </Link>
      </div>

      <p>Browse products and pre-book them for pickup at the store.</p>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <h4>{product.name}</h4>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>₹{product.price}</p>
            <p style={styles.stock}>
              {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
            </p>
            <p style={styles.section}>Section: {product.storeSection}</p>

            <button
              onClick={() => addToCart(product._id, product.name)}
              style={styles.button}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={styles.centerText}>No products available right now.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '20px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cartLink: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  centerText: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#888',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '18px',
    marginTop: '20px',
  },
  card: {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '10px',
  },
  description: {
    fontSize: '13px',
    color: '#666',
    minHeight: '36px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '8px 0 4px 0',
  },
  stock: {
    fontSize: '13px',
    color: '#2e8b57',
  },
  section: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
};

export default PreBook;