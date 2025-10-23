import React, { useEffect, useState } from 'react';
import type { Report } from '../types';


import Sidebar from '../components/Sidebar';
import { getAllReports, updateReport, isAdminUser } from '../utils/storage';

import './AdminPage.css';

const AdminPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!isAdminUser()) {
      alert('Access denied');
      window.location.href = '/login';
      return;
    }

    const allReports = getAllReports();
    setReports(allReports);
  }, []);

  const handleStatusChange = (id: string, status: string) => {
    const updatedReports = reports.map((r) =>
      r.id === id ? { ...r, status: status as Report['status'] } : r
    );
    updateReport({ ...reports.find((r) => r.id === id)!, status: status as Report['status'] });
    setReports(updatedReports);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        <div className="admin-container">
          <h2>Admin Panel</h2>
          {reports.length === 0 ? (
            <p>No reports available.</p>
          ) : (
            <ul className="admin-report-list">
              {reports.map((report) => (
                <li key={report.id} className="admin-report-card">
                  <h3>{report.title}</h3>
                  <p><strong>User:</strong> {report.createdBy}</p>
                  <p><strong>Type:</strong> {report.type}</p>
                  <p><strong>Status:</strong> {report.status}</p>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="under investigation">Under Investigation</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
