import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';



import type { Report, ReportStatus } from '../types';
import { getReports, updateReport } from '../utilis/storage';


import { sendStatusChangeSMS } from '../utilis/smsNotification';
import { getUsers } from '../utilis/storage';



import { toast } from '../hooks/use-toast';


import '../styles/AdminPage.css';

const AdminPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'red-flag' | 'intervention'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | ReportStatus>('all');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = getReports();
    setReports(allReports.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    // Update report status
    updateReport(reportId, { status: newStatus });
    loadReports();

    // Send SMS notification to user
    const users = getUsers();
    const reportOwner = users.find(u => u.id === report.userId);
    
    if (reportOwner?.phone) {
      try {
        await sendStatusChangeSMS(
          reportOwner.phone,
          reportId,
          newStatus,
          report.title
        );
        toast({
          title: 'Status Updated',
          description: `SMS notification sent to user at ${reportOwner.phone}`,
        });
      } catch (error) {
        toast({
          title: 'Status Updated',
          description: 'Status changed but SMS notification failed',
        });
      }
    } else {
      toast({
        title: 'Status Updated',
        description: 'User has no phone number for SMS notification',
      });
    }
  };

  const filteredReports = reports.filter(report => {
    if (filterType !== 'all' && report.type !== filterType) return false;
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <div className="container">
          <div className="admin-header">
            <div>
              <h1>Admin Dashboard</h1>
              <p className="text-secondary">Manage all user reports</p>
            </div>
          </div>

          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{reports.length}</div>
                <div className="stat-label">Total Reports</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <div className="stat-value">
                  {reports.filter(r => r.status === 'draft').length}
                </div>
                <div className="stat-label">New/Draft</div>
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
          </div>

          <div className="admin-filters">
            <div className="filter-group">
              <label htmlFor="typeFilter">Filter by Type:</label>
              <select
                id="typeFilter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option value="red-flag">Red Flags</option>
                <option value="intervention">Interventions</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="under-investigation">Under Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                      No reports found
                    </td>
                  </tr>
                ) : (
                  filteredReports.map(report => (
                    <tr key={report.id}>
                      <td className="table-id">#{report.id}</td>
                      <td>
                        <span className={`badge badge-${report.type}`}>
                          {report.type === 'red-flag' ? '🚩' : '⚠️'}
                        </span>
                      </td>
                      <td className="table-title">{report.title}</td>
                      <td className="table-location">{report.location}</td>
                      <td className="table-date">{formatDate(report.createdAt)}</td>
                      <td>
                        <span className={`badge badge-${report.status}`}>
                          {report.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="table-actions">
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value as ReportStatus)}
                          className="status-select"
                        >
                          <option value="draft">Draft</option>
                          <option value="under-investigation">Under Investigation</option>
                          <option value="resolved">Resolved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;