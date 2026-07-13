import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🏬 Smart Mall
      </Link>

      <div style={styles.links}>
        <Link to="/scan-and-go" style={styles.link}>Scan & Go</Link>
        <Link to="/pre-book" style={styles.link}>Pre-Book</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/my-orders" style={styles.link}>My Orders</Link>

        {user ? (
          <>
            <span style={styles.link}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '15px',
  },
  button: {
    padding: '6px 14px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;