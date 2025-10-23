import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';

import Sidebar from '../components/Sidebar';
import {
  getReportsByUser,
  deleteReport,
  getLoggedInUserId,
} from '../utils/storage';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();
  const userId = getLoggedInUserId();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const userReports = getReportsByUser(userId);
    setReports(userReports);
  }, [userId, navigate]);

  const handleDelete = (id: string) => {
    deleteReport(id);
    const updatedReports = getReportsByUser(userId!);
    setReports(updatedReports);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        <div className="dashboard-container">
          <h2>Your Reports</h2>
          <button onClick={() => navigate('/report/create')}>Create New Report</button>
          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            <ul className="report-list">
              {reports.map((report) => (
                <li key={report.id} className="report-card">
                  <h3>{report.title}</h3>
                  <p><strong>Type:</strong> {report.type}</p>
                  <p><strong>Status:</strong> {report.status}</p>
                  <p><strong>Location:</strong> {report.latitude}, {report.longitude}</p>
                  <div className="report-actions">
                    <button onClick={() => navigate(`/report/${report.id}`)}>View</button>
                    <button onClick={() => navigate(`/report/edit/${report.id}`)}>Edit</button>
                    <button onClick={() => handleDelete(report.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
