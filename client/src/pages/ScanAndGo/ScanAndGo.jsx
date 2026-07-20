import { useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import api from "../../services/api";

const ScanAndGo = () => {
  const fileInputRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [scanning, setScanning] = useState(false);

  const fetchProduct = async (barcode) => {
    try {
      setError("");
      setMessage("");

      const { data } = await api.get(`/products/barcode/${barcode}`);

      setProduct(data);
    } catch (err) {
      setProduct(null);
      setError(
        err.response?.data?.message || "Product not found for this barcode."
      );
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setError("");
    setMessage("");
    setProduct(null);
    setScanning(true);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    try {
      const codeReader = new BrowserMultiFormatReader();
      const result = await codeReader.decodeFromImageUrl(imageUrl);

      console.log("Detected:", result.getText());
      fetchProduct(result.getText());
    } catch (err) {
      setError(
        "Barcode not detected. Please try a clearer, well-lit image with the barcode filling more of the frame, or use manual entry."
      );
    } finally {
      setScanning(false);
    }
  };

  const addToCart = async () => {
    if (!product) return;

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
        cartType: "scan_and_go",
      });

      setMessage(`${product.name} added to cart successfully!`);
      setProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product to cart.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>📦 Scan & Go</h2>

      <p>Upload a barcode image to detect the product.</p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <button
        style={styles.button}
        onClick={() => fileInputRef.current.click()}
        disabled={scanning}
      >
        {scanning ? "Scanning..." : "Upload Barcode Image"}
      </button>


      {preview && (
        <img src={preview} alt="Barcode Preview" style={styles.preview} />
      )}

      {error && <p style={styles.error}>{error}</p>}

      {message && <p style={styles.success}>{message}</p>}

      {product && (
        <div style={styles.productCard}>
          <h3>{product.name}</h3>

          <p>
            <strong>Description:</strong> {product.description}
          </p>

          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p>
            <strong>Section:</strong> {product.storeSection}
          </p>

          <button style={styles.button} onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },

  button: {
    padding: "10px 20px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "10px",
  },

  preview: {
    width: "100%",
    maxWidth: "350px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  productCard: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "left",
  },

  error: {
    color: "red",
    marginTop: "15px",
    fontWeight: "bold",
  },

  success: {
    color: "green",
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default ScanAndGo;