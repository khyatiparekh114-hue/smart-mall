import { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import api from '../../services/api';

const ScanAndGo = () => {
  const [scanning, setScanning] = useState(false);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const controlsRef = useRef(null);

  const startScanning = async () => {
    setError('');
    setMessage('');
    setProduct(null);
    setScanning(true);

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    try {
      const controls = await codeReader.decodeFromConstraints(
        {
          video: { facingMode: 'environment' },
        },
        videoRef.current,
        (result, err) => {
          if (result) {
            const decodedText = result.getText();
            stopScanning();
            fetchProduct(decodedText);
          }
        }
      );
      controlsRef.current = controls;
    } catch (err) {
      setError('Could not start camera. Please check camera permission.');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    setScanning(false);
  };

  const fetchProduct = async (barcode) => {
    try {
      const { data } = await api.get(`/products/barcode/${barcode}`);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found for this barcode');
    }
  };

  const addToCart = async () => {
    try {
      await api.post('/cart/add', {
        productId: product._id,
        quantity: 1,
        cartType: 'scan_and_go',
      });
      setMessage(`${product.name} added to cart!`);
      setProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add to cart');
    }
  };

  const handleManualEntry = () => {
    const barcode = prompt('Enter barcode manually:');
    if (barcode) {
      fetchProduct(barcode.trim());
    }
  };

  return (
    <div style={styles.container}>
      <h2>Scan & Go</h2>
      <p>Scan a product barcode to add it to your cart.</p>

      {!scanning && (
        <button onClick={startScanning} style={styles.button}>
          Start Scanning
        </button>
      )}

      {scanning && (
        <button onClick={stopScanning} style={styles.stopButton}>
          Stop Scanning
        </button>
      )}

      <button onClick={handleManualEntry} style={styles.manualButton}>
        Enter Barcode Manually
      </button>

      <video ref={videoRef} style={styles.video} />

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      {product && (
        <div style={styles.productCard}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Section: {product.storeSection}</p>
          <button onClick={addToCart} style={styles.button}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '10px',
  },
  stopButton: {
    padding: '10px 20px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '10px',
  },
  manualButton: {
    padding: '10px 20px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '10px',
    marginLeft: '10px',
  },
  video: {
    width: '100%',
    marginTop: '20px',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    marginTop: '15px',
  },
  success: {
    color: 'green',
    marginTop: '15px',
  },
  productCard: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};

export default ScanAndGo;