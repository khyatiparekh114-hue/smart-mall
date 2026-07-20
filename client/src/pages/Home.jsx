import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>NO LINES. NO WAITING.</p>
        <h1 style={styles.heroTitle}>
          Skip the checkout.<br />Not the shopping.
        </h1>
        <p style={styles.heroSubtitle}>
          Scan items as you shop and walk out, or pre-book from home and
          pick up at an express counter. Either way, you're never standing
          in a billing line again.
        </p>

        <div style={styles.ctaRow}>
          <Link to="/scan-and-go" style={styles.primaryButton}>
            Start Scan & Go →
          </Link>
          <Link to="/pre-book" style={styles.secondaryButton}>
            Browse & Pre-Book
          </Link>
        </div>
      </section>

      <section style={styles.howRow}>
        <div className="ticket-card" style={styles.howCard}>
          <span style={styles.howNumber}>01</span>
          <h3 style={styles.howTitle}>Scan & Go</h3>
          <p style={styles.howText}>
            Scan barcodes as you shop in-store, pay from your phone, and
            show your exit code at the gate.
          </p>
        </div>

        <div className="ticket-card" style={styles.howCard}>
          <span style={styles.howNumber}>02</span>
          <h3 style={styles.howTitle}>Pre-Book & Pickup</h3>
          <p style={styles.howText}>
            Browse the store's inventory from home, pay online, and collect
            your packed order at an express counter.
          </p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 24px',
  },
  hero: {
    textAlign: 'left',
    marginBottom: '60px',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-fresh)',
    letterSpacing: '1.5px',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '46px',
    lineHeight: '1.15',
    marginBottom: '18px',
  },
  heroSubtitle: {
    fontSize: '17px',
    color: 'var(--color-text-muted)',
    maxWidth: '540px',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  ctaRow: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '14px 26px',
    backgroundColor: 'var(--color-amber)',
    color: 'var(--color-ink)',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
  },
  secondaryButton: {
    padding: '14px 26px',
    backgroundColor: 'transparent',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-ink)',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
  },
  howRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  howCard: {
    padding: '28px 24px',
  },
  howNumber: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-amber-dark)',
  },
  howTitle: {
    marginTop: '10px',
  },
  howText: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
  },
};

export default Home;