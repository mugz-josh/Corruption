import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';
import type { Report, ReportType } from '../types';
import '../styles/CreateReportPage.css';

const CreateReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [type, setType] = useState<ReportType>('red-flag');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          setError('Unable to get location: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newReport: Report = {
        id: Date.now().toString(),
        userId: user.id,
        type,
        title,
        description,
        location: '',
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const stored = localStorage.getItem('reports');
      const reports: Report[] = stored ? JSON.parse(stored) : [];
      reports.push(newReport);
      localStorage.setItem('reports', JSON.stringify(reports));

      navigate('/dashboard');
    } catch {
      setError('Failed to create report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <Navbar />
      <div className="create-container">
        <h1>Create Record</h1>
        <div className="type-buttons">
          <button
            className={`type-btn ${type === 'red-flag' ? 'active' : ''}`}
            onClick={() => setType('red-flag')}
          >
            🚩 Red Flag
          </button>
          <button
            className={`type-btn ${type === 'intervention' ? 'active' : ''}`}
            onClick={() => setType('intervention')}
          >
            🛠️ Intervention
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
          />

          <div className="coord-row">
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleGetLocation}
            className="btn btn-outline btn-sm"
          >
            📍 Use My Current Location
          </button>

          <div className="upload-row">
            <div className="upload-box">
              <span>📷 Add Image</span>
              <p>Drag & drop image here</p>
            </div>
            <div className="upload-box">
              <span>🎥 Add Video</span>
              <p>Drag & drop video here</p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            {loading ? 'Creating...' : 'CREATE RECORD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReportPage;
