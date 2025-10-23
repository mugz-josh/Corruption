import { useEffect, useState, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReportCard from '../components/ui/ReportCard';
import type { Report, ReportStatus } from '../types';
import { getReports, updateReport, getUsers } from '../utilis/storage';
import { sendStatusChangeSMS } from '../utilis/smsNotification';
import { toast } from '../hooks/use-toast';
import '../styles/AdminPage.css';

// Helper to format status
const formatStatusForDisplay = (status: ReportStatus | 'all') => {
  if (status === 'all') return 'All Records';
  return status.replace(/-/g, ' ').toUpperCase();
};

const AdminPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [contentView, setContentView] = useState<'all' | ReportStatus>('all'); // status filter
  const [activeType, setActiveType] = useState<'all' | 'red-flag' | 'intervention'>('all'); // type filter

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = getReports();
    setReports(
      allReports.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  };

  // --- Authorization ---
  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/dashboard" />;

  // --- Status Change Handler ---
  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    updateReport(reportId, { status: newStatus });
    loadReports();

    const users = getUsers();
    const reportOwner = users.find((u) => u.email === report.userId);

    if (reportOwner?.phone) {
      try {
        await sendStatusChangeSMS(reportOwner.phone, reportId, newStatus, report.title);
        toast({
          title: 'Status Updated',
          description: `SMS notification sent to user at ${reportOwner.phone}`,
        });
      } catch {
        toast({
          title: 'Status Updated',
          description: 'Status changed but SMS notification failed',
        });
      }
    } else {
      toast({
        title: 'Status Updated',
        description: 'Status updated. User has no phone number for SMS notification',
      });
    }
  };

  // --- Filtered Reports by status AND type ---
  const filteredReports = useMemo(() => {
    let list = reports;
    if (contentView !== 'all') list = list.filter((r) => r.status === contentView);
    if (activeType !== 'all') list = list.filter((r) => r.type === activeType);
    return list;
  }, [reports, contentView, activeType]);

  // --- Status Counts ---
  const statusCounts = useMemo(() => ({
    all: reports.length,
    'under-investigation': reports.filter((r) => r.status === 'under-investigation').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
    rejected: reports.filter((r) => r.status === 'rejected').length,
  }), [reports]);

  const mainStatuses: ReportStatus[] = ['under-investigation', 'resolved', 'rejected'];

  return (
    <div className="admin-page-wrapper">
      <div className="admin-content">
        <header className="admin-content-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>

          {/* Create Buttons */}
          <div className="create-buttons">
            <Link to="/create/red-flag" className="btn btn-red-flag">+ Red Flag</Link>
            <Link to="/create/intervention" className="btn btn-intervention">+ Intervention</Link>
          </div>
        </header>

        {/* Type Filter Buttons */}
        <div className="type-filter-buttons">
          <button
            className={`type-btn ${activeType === 'all' ? 'active' : ''}`}
            onClick={() => setActiveType('all')}
          >
            All Types
          </button>
          <button
            className={`type-btn ${activeType === 'red-flag' ? 'active' : ''}`}
            onClick={() => setActiveType('red-flag')}
          >
            Red Flags
          </button>
          <button
            className={`type-btn ${activeType === 'intervention' ? 'active' : ''}`}
            onClick={() => setActiveType('intervention')}
          >
            Interventions
          </button>
        </div>

        <h2 className="all-records-title">All Records</h2>

        {/* Status Filter Buttons */}
        <div className="status-filter-buttons">
          <button
            className={`status-btn all-status ${contentView === 'all' ? 'active' : ''}`}
            onClick={() => setContentView('all')}
          >
            All Records ({reports.length})
          </button>
          {mainStatuses.map((status) => (
            <button
              key={status}
              className={`status-btn status-${status} ${contentView === status ? 'active' : ''}`}
              onClick={() => setContentView(status)}
            >
              {formatStatusForDisplay(status)} ({statusCounts[status as keyof typeof statusCounts]})
            </button>
          ))}
        </div>

        <h3 className="current-view-title">{formatStatusForDisplay(contentView)} View</h3>

        {/* Reports Grid */}
        <div className="reports-grid">
          {filteredReports.length === 0 ? (
            <p className="no-reports-message">No records found for this view.</p>
          ) : (
            filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                highlight={activeType === 'all' || report.type === activeType}
                {...({ onStatusChange: handleStatusChange } as any)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
