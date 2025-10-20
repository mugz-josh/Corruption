import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Report corruption cases and public issues</h1>
            <p className="hero-subtitle">
              The all-weeb-on-line-how bible your government:
              entire.egf from every thing.intervainment.
            </p>
            <div className="hero-actions">
              <Link to="/create-report" className="btn btn-primary btn-lg">
                Report a Case
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="container">
          <h2 className="text-center">How iReporter Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚩</div>
              <h3>Report Red Flags</h3>
              <p>
                Expose instances of corruption, bribery, or misuse of public funds.
                Your reports help fight corruption at all levels.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Request Intervention</h3>
              <p>
                Report infrastructure issues like bad roads, collapsed bridges, or flooding
                that require government action.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Geolocation Support</h3>
              <p>
                Pin exact locations with latitude and longitude coordinates to help
                authorities respond quickly and effectively.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>
                Monitor your reports as they move from draft to investigation to resolution.
                Get updates on status changes.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Add Evidence</h3>
              <p>
                Upload photos and videos to support your reports and provide
                visual evidence of issues.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Anonymous</h3>
              <p>
                Your reports are handled securely. Only verified administrators
                can review and update report statuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of citizens working to build a better, more transparent society.</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 iReporter. Empowering Citizens for Good Governance.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;