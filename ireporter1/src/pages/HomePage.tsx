import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { Eye, MapPin, Settings } from 'lucide-react'; // import the icons

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Report, track,<br />and intervene on incidents of interest
        </h1>

        <div className="hero-buttons">
          <button className="btn-get-started" onClick={() => navigate('/register')}>
            GET STARTED
          </button>
          <button className="btn-sign-in" onClick={() => navigate('/login')}>
            SIGN IN
          </button>
        </div>

        {/* What iReporter Does */}
        <div className="features-summary">
          <div className="feature-item">
            <Eye size={48} color="#4F46E5" /> {/* professional icon */}
            <h3>Report</h3>
            <p>File a report against corruption or a social issue</p>
          </div>
          <div className="feature-item">
            <MapPin size={48} color="#10B981" /> {/* professional icon */}
            <h3>Track</h3>
            <p>Update the record with evidence — photos or videos</p>
          </div>
          <div className="feature-item">
            <Settings size={48} color="#EF4444" /> {/* professional icon */}
            <h3>Intervene</h3>
            <p>Government agency takes action</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div>1. File a report</div>
            <div>2. Locate</div>
            <div>3. Provide evidence</div>
            <div>4. Track</div>
          </div>
        </div>

        {/* Why It Is Important */}
        <div className="importance">
          <p>
            Transparency is the basis for accountability. Public oversight is the key to effective reforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
