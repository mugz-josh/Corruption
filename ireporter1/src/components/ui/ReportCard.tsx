import { Link } from 'react-router-dom';
import type { Report } from '../../types';
import '../../styles/ReportCard.css';

interface ReportCardProps {
  report: Report;
  showActions?: boolean; // allows edit/delete buttons
  onDelete?: (id: string) => void; // callback for deleting a report
  highlight?: boolean; // NEW: highlights the card
}

const ReportCard: React.FC<ReportCardProps> = ({ report, showActions = false, onDelete, highlight = false }) => {
  // format createdAt date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`report-card ${highlight ? 'highlight' : ''}`}>
      <div className="report-card-header">
        <div>
          <span className={`badge badge-${report.type}`}>
            {report.type === 'red-flag' ? '🚩 Red Flag' : '⚠️ Intervention'}
          </span>
          <span className={`badge badge-${report.status}`}>
            {report.status.replace('-', ' ')}
          </span>
        </div>
        <span className="report-date">{formatDate(report.createdAt)}</span>
      </div>

      <h3 className="report-title">{report.title}</h3>
      <p className="report-description">
        {report.description.length > 150
          ? report.description.substring(0, 150) + '...'
          : report.description}
      </p>

      <div className="report-location">
        📍 {report.location}
        {report.latitude !== undefined && report.longitude !== undefined && (
          <span className="coordinates">
            ({report.latitude.toFixed(4)}, {report.longitude.toFixed(4)})
          </span>
        )}
      </div>

      <div className="report-card-actions">
        {/* View details link */}
        <Link to={`/report/${report.id}`} className="btn btn-sm btn-primary">
          View Details
        </Link>

        {/* Show edit/delete buttons if allowed */}
        {showActions && (
          <>
            <Link to={`/edit-report/${report.id}`} className="btn btn-sm btn-outline">
              Edit
            </Link>
            <button
              onClick={() => onDelete && onDelete(report.id)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
