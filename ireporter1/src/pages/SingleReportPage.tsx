import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';
import type { Report } from '../types';
import { getReportById } from '../utilis/storage';

import '../styles/SingleReportPage.css';

const SingleReportPage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (id) {
      const foundReport = getReportById(id);
      if (foundReport) {
        setReport(foundReport);
      }
    }
  }, [id]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!report) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Report not found</h2>
          <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOwner = report.userId === user.id;

  return (
    <div>
      <Navbar />
      <div className="single-report-container">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>

          <div className="report-detail-card">
            <div className="report-detail-header">
              <div className="report-badges">
                <span className={`badge badge-${report.type}`}>
                  {report.type === 'red-flag' ? '🚩 Red Flag' : '⚠️ Intervention'}
                </span>
                <span className={`badge badge-${report.status}`}>
                  {report.status.replace('-', ' ')}
                </span>
              </div>
              
              {isOwner && (
                <div className="report-detail-actions">
                  <Link to={`/edit-report/${report.id}`} className="btn btn-outline btn-sm">
                    Edit Report
                  </Link>
                </div>
              )}
            </div>

            <h1 className="report-detail-title">{report.title}</h1>

            <div className="report-meta">
              <div className="meta-item">
                <strong>Created:</strong> {formatDate(report.createdAt)}
              </div>
              <div className="meta-item">
                <strong>Last Updated:</strong> {formatDate(report.updatedAt)}
              </div>
              <div className="meta-item">
                <strong>Report ID:</strong> {report.id}
              </div>
            </div>

            <div className="report-section">
              <h2>Description</h2>
              <p className="report-detail-description">{report.description}</p>
            </div>

            <div className="report-section">
              <h2>Location</h2>
              <div className="location-info">
                <div className="location-text">
                  📍 {report.location}
                </div>
                {report.latitude && report.longitude && (
                  <div className="coordinates-detail">
                    <div><strong>Latitude:</strong> {report.latitude}</div>
                    <div><strong>Longitude:</strong> {report.longitude}</div>
                  </div>
                )}
              </div>
            </div>

            {report.latitude && report.longitude && (
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p>Map integration placeholder</p>
                <small>Location: {report.latitude}, {report.longitude}</small>
              </div>
            )}

            <div className="report-section">
              <h2>Status History</h2>
              <div className="status-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <strong>Current Status:</strong> {report.status.replace('-', ' ')}
                    <div className="timeline-date">{formatDate(report.updatedAt)}</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <strong>Report Created</strong>
                    <div className="timeline-date">{formatDate(report.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReportPage;