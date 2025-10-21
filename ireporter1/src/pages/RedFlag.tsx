import { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'redflag' | 'intervention'>('redflag');

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Recent Records</h1>
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'redflag' ? 'active' : ''}`}
              onClick={() => setActiveTab('redflag')}
            >
              🚩 Red Flag
            </button>
            <button
              className={`tab-btn ${activeTab === 'intervention' ? 'active' : ''}`}
              onClick={() => setActiveTab('intervention')}
            >
              🛠️ Intervention
            </button>
          </div>
        </header>

        <section className="record-cards">
          <div className="record-card red">
            <div className="card-header">Red Flag</div>
            <h3>Bad infrastructure</h3>
            <p>Description: No service here.</p>
            <span className="status resolved">RESOLVED</span>
            <p className="location">Lat 6.6888019, Long 6.939899</p>
            <img
              src="/Images/Road%20broken.jpg"
              alt="Damaged road"
              className="record-image"
            />
          </div>

          <div className="record-card blue">
            <div className="card-header">Intervention</div>
            <h3>Bad infrastructure</h3>
            <p>Description: No long here.</p>
            <span className="status investigating">UNDER INVESTIGATION</span>
            <p className="location">Lat 6.6888019, Long 76.34874</p>
            <img
              src="/Broken%20bridge.webp"
              alt="Broken bridge"
              className="record-image"
            />
          </div>
        </section>

        <section className="map-section">
          <h2>Map View</h2>
          <div className="map-container">
            <img
              src="/map-placeholder.jpg"
              alt="Map showing Johannesburg, Mabopane, Spandbeck, Killsia, and others"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
