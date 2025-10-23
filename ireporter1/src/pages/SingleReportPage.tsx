import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Report } from '../types';

import Sidebar from '../components/Sidebar';
import { getAllReports } from '../utils/storage';
import './SingleReportPage.css';

const SingleReportPage: React.FC = () => {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const reports = getAllReports();
    const found = reports.find((r) => r.id === id);
    if (found) setReport(found);
  }, [id]);

  if (!report) return <p>Report not found.</p>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        <div className="single-report-container">
          <h2>{report.title}</h2>
          <p><strong>Type:</strong> {report.type}</p>
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <p><strong>Location:</strong> {report.latitude}, {report.longitude}</p>
          {report.media && report.media.length > 0 && (
            <div>
              <h4>Media:</h4>
              {report.media.map((url, index) => (
                <div key={index}>
                  {url.endsWith('.mp4') ? (
                    <video src={url} controls width="300" />
                  ) : (
                    <img src={url} alt="report media" width="300" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReportPage;
