import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Navbar from '../components/ui/Navbar';
import ReportCard from '../components/ui/ReportCard';

import type { Report } from '../types';
import { getReportsByUser, deleteReport } from '../utilis/storage';
import { useAuth } from '../context/AuthContext';


import "../styles/Dashboard.css";


const DashboardPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (user) {
      const userReports = getReportsByUser(user.id);
      setReports(userReports.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteReport(id);
      setReports(reports.filter(r => r.id !== id));
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>My Dashboard</h1>
              <p className="text-secondary">Welcome back, {user.name}</p>
            </div>
            <Link to="/create-report" className="btn btn-primary">
              Create New Report
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{reports.length}</div>
                <div className="stat-label">Total Reports</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <div className="stat-value">
                  {reports.filter(r => r.status === 'under-investigation').length}
                </div>
                <div className="stat-label">Under Investigation</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">
                  {reports.filter(r => r.status === 'resolved').length}
                </div>
                <div className="stat-label">Resolved</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🚩</div>
              <div className="stat-content">
                <div className="stat-value">
                  {reports.filter(r => r.type === 'red-flag').length}
                </div>
                <div className="stat-label">Red Flags</div>
              </div>
            </div>
          </div>

          <div className="reports-section">
            <h2>Your Reports</h2>
            {reports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No reports yet</h3>
                <p>Create your first report to get started</p>
                <Link to="/create-report" className="btn btn-primary">
                  Create Report
                </Link>
              </div>
            ) : (
              <div className="reports-grid">
                {reports.map(report => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    showActions={true}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;