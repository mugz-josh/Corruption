import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import {
  FaRegEdit,
  FaCamera,
  FaTools,
  FaMapMarkerAlt,
  FaChartLine
} from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-main">
        <section className="hero-section">
          <h1>Report, track, and intervene on incidents of interest.</h1>
          <div className="hero-buttons">
            <button className="btn-get-started" onClick={() => navigate('/create-report')}>
              GET STARTED
            </button>
            <button className="btn-sign-in" onClick={() => navigate('/login')}>
              SIGN IN
            </button>
          </div>
        </section>

        <section className="info-section">
          <h2>What iReporter Does</h2>
          <div className="info-grid">
            <div className="info-card">
              <FaRegEdit className="info-icon" />
              <h3>Report</h3>
              <p>File a report against corruption or a social concern.</p>
            </div>
            <div className="info-card">
              <FaCamera className="info-icon" />
              <h3>Track</h3>
              <p>Update the record with evidence—photos or videos.</p>
            </div>
            <div className="info-card">
              <FaTools className="info-icon" />
              <h3>Intervene</h3>
              <p>Government agency takes action.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>How It Works</h2>
          <div className="info-grid">
            <div className="info-card">
              <FaRegEdit className="info-icon" />
              <p>File a report</p>
            </div>
            <div className="info-card">
              <FaMapMarkerAlt className="info-icon" />
              <p>Locate</p>
            </div>
            <div className="info-card">
              <FaCamera className="info-icon" />
              <p>Provide evidence</p>
            </div>
            <div className="info-card">
              <FaChartLine className="info-icon" />
              <p>Track</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Why It Is Important</h2>
          <p>
            Transparency is the basis for accountability. <br />
            Public oversight is the key to effective reforms.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
