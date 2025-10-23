import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Report } from '../types';

import Sidebar from '../components/Sidebar';
import { getAllReports, updateReport } from '../utils/storage';
import './EditReportPage.css';

const EditReportPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const reports = getAllReports();
    const found = reports.find((r) => r.id === id);
    if (found) setReport(found);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (report) {
      setReport({ ...report, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = () => {
    if (report) {
      updateReport(report);
      navigate('/dashboard');
    }
  };

  if (!report) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        <div className="edit-report-container">
          <h2>Edit Report</h2>
          <input name="title" value={report.title} onChange={handleChange} />
          <textarea name="description" value={report.description} onChange={handleChange} />
          <select name="type" value={report.type} onChange={handleChange}>
            <option value="red-flag">Red Flag</option>
            <option value="intervention">Intervention</option>
          </select>
          <input name="latitude" value={report.latitude} onChange={handleChange} />
          <input name="longitude" value={report.longitude} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditReportPage;
