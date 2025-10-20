import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';

import type { ReportType } from '../types';
import { getReportById, updateReport } from '../utilis/storage';
import "../styles/ReportCard.css"; // example




const EditReportPage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [type, setType] = useState<ReportType>('red-flag');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const report = getReportById(id);
      if (!report) {
        setNotFound(true);
        return;
      }
      
      if (report.userId !== user?.id) {
        setNotFound(true);
        return;
      }

      setType(report.type);
      setTitle(report.title);
      setDescription(report.description);
      setLocation(report.location);
      setLatitude(report.latitude?.toString() || '');
      setLongitude(report.longitude?.toString() || '');
    }
  }, [id, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (notFound) {
    return <Navigate to="/dashboard" />;
  }

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
      if (!id) return;
      
      updateReport(id, {
        type,
        title,
        description,
        location,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <div className="container">
          <div className="form-card">
            <div className="form-header">
              <h1>Edit Report</h1>
              <p>Update your report details</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="report-form">
              <div className="form-group">
                <label htmlFor="type">Report Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as ReportType)}
                  required
                >
                  <option value="red-flag">🚩 Red Flag (Corruption)</option>
                  <option value="intervention">⚠️ Intervention (Infrastructure)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Brief, descriptive title"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Provide detailed information about the incident..."
                  rows={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g., City Hall, Nairobi"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    id="latitude"
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="-1.2864"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    id="longitude"
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="36.8172"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="btn btn-outline btn-sm"
              >
                📍 Use My Current Location
              </button>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReportPage;