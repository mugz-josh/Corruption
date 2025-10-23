import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/ui/Navbar';
import { getReportById } from '../utilis/storage';
import type { Report } from '../types';
import '../styles/SingleReportPage.css';

const SingleReportPage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (id) {
      const foundReport = getReportById(id);
      if (foundReport) setReport(foundReport);
    }
  }, [id]);

  if (!user) return <Navigate to="/login" />;

  if (!report)
    return (
      <div>
        <Navbar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Report not found</h2>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const isOwner = report.userId === user.email; // ✅ match email

  return (
    <div>
      <Navbar />
      <div className="single-report-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="report-detail-card">
          <div className="report-detail-header">
            <div className="report-badges">
              <span className={`badge badge-${report.type}`}>
                {report.type === 'red-flag' ? '🚩 Red Flag' : '⚠️ Intervention'}
              </span>
              <span className={`badge badge-${report.status}`}>{report.status.replace('-', ' ')}</span>
            </div>
            {isOwner && (
              <Link to={`/edit-report/${report.id}`} className="btn btn-outline btn-sm">
                Edit Report
              </Link>
            )}
          </div>

          <h1>{report.title}</h1>
          <p>{report.description}</p>
          <p>
            📍 {report.location} ({report.latitude}, {report.longitude})
          </p>
          <p>Status: {report.status}</p>
          <p>Created: {formatDate(report.createdAt)}</p>
          <p>Updated: {formatDate(report.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleReportPage;
