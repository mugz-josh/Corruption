import Navbar from '../components/ui/Navbar';
import '../styles/HomePage.css';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container">
            <h1>About iReporter</h1>
            <p className="hero-subtitle">
              Empowering citizens to report corruption and request government intervention
            </p>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Our Mission</h3>
                <p>
                  To create a transparent platform where citizens can easily report corruption 
                  cases and request government intervention on issues that need immediate attention.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Community Driven</h3>
                <p>
                  We believe in the power of community. Every report matters and contributes 
                  to building a better, more accountable society.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Anonymous</h3>
                <p>
                  Your safety is our priority. Report incidents securely with optional 
                  anonymity to protect whistleblowers.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Track Progress</h3>
                <p>
                  Stay informed with real-time updates on your reports. We ensure transparency 
                  in how each case is handled.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Geolocation</h3>
                <p>
                  Precise location tracking helps authorities respond quickly and effectively 
                  to reported incidents.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Response</h3>
                <p>
                  Our platform ensures that your reports reach the right authorities quickly, 
                  enabling swift action.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container text-center">
            <h2>Join Us in Making a Difference</h2>
            <p className="mb-lg">Together, we can build a more transparent and accountable society.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 iReporter. Making a difference, one report at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;