import { useEffect, useState } from 'react';
import ReportCard from '../components/ui/ReportCard';
import type { Report } from '../types';
import { getReports, deleteReport } from '../utilis/storage';
import '../styles/ReportCard.css';

const RecordsListPage = () => {
  const [reports, setReports] = useState<Report[]>([]);

  // Load reports from storage
  const loadReports = () => {
    const storedReports = getReports(); // ✅ Reads from 'ireporter_reports' key
    setReports(storedReports);
  };

  useEffect(() => {
    loadReports();

    // Optional: update reports if localStorage changes (multiple tabs)
    const handleStorageChange = () => loadReports();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDelete = (id: string) => {
    // Delete from storage
    deleteReport(id); // ✅ Uses storage.ts deleteReport
    // Update local state
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="records-list-page">
      <h1>All Reports</h1>
      {reports.length === 0 ? (
        <p>No reports created yet.</p>
      ) : (
        <div className="report-cards-container">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              showActions
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordsListPage;
