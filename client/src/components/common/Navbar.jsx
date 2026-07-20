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
        SMART<span style={styles.logoAccent}>MALL</span>
      </Link>

      <div style={styles.links}>
        <Link to="/scan-and-go" style={styles.link}>Scan & Go</Link>
        <Link to="/pre-book" style={styles.link}>Pre-Book</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/my-orders" style={styles.link}>Orders</Link>

        {user ? (
          <>
            <span style={styles.userName}>{user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.signupButton}>Signup</Link>
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
    padding: '16px 32px',
    backgroundColor: 'var(--color-ink)',
    borderBottom: '3px solid var(--color-amber)',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    color: 'var(--color-white)',
    textDecoration: 'none',
  },
  logoAccent: {
    color: 'var(--color-amber)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#D8D6CC',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'var(--font-body)',
  },
  userName: {
    color: 'var(--color-amber)',
    fontSize: '14px',
    fontWeight: '600',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid var(--color-line)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
  },
  signupButton: {
    padding: '8px 18px',
    backgroundColor: 'var(--color-amber)',
    color: 'var(--color-ink)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '700',
    textDecoration: 'none',
  },
};

export default Navbar;