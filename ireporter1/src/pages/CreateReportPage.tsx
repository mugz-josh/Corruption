import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';
import type { Report, ReportType } from '../types';
import { addReport } from '../utilis/storage';

// use storage function
import '../styles/CreateReportPage.css';

const CreateReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [type, setType] = useState<ReportType>('red-flag');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  if (!user) return <Navigate to="/login" />;

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (err) => setError('Unable to get location: ' + err.message)
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'image' && file.type.startsWith('image/')) setImage(file);
    else if (type === 'video' && file.type.startsWith('video/')) setVideo(file);
    else setError(`Please select a valid ${type} file`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      setLoading(false);
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      userId: user.email, // ✅ Use email as userId
      type,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: image ? [URL.createObjectURL(image)] : undefined,
      videos: video ? [URL.createObjectURL(video)] : undefined,
    };

    try {
      addReport(newReport); // save using storage.ts
      alert('Report created successfully!');
      navigate('/records'); // navigate to RecordsListPage
    } catch (err) {
      console.error(err);
      setError('Failed to create report. Please try again.');
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
            type="button"
            className={`type-btn ${type === 'red-flag' ? 'active' : ''}`}
            onClick={() => setType('red-flag')}
          >
            🚩 Red Flag
          </button>
          <button
            type="button"
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
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
          />

          <input
            type="text"
            placeholder="Location/Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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

          <button type="button" onClick={handleGetLocation} className="btn btn-outline btn-sm">
            📍 Use My Current Location
          </button>

          <div className="upload-row">
            <div className="upload-box">
              <label htmlFor="image-upload">
                <span>📷 {image ? 'Image Selected' : 'Add Image'}</span>
                <p>{image ? image.name : 'Click to upload image'}</p>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="upload-box">
              <label htmlFor="video-upload">
                <span>🎥 {video ? 'Video Selected' : 'Add Video'}</span>
                <p>{video ? video.name : 'Click to upload video'}</p>
              </label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Creating...' : 'CREATE RECORD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReportPage;
