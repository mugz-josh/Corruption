import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import MapPicker from '../components/MapPicker';
import Sidebar from '../components/Sidebar';
import { saveReport, getLoggedInUserId } from '../utils/storage';
import './CreateReportPage.css'; // Make sure this path is correct

const CreateReportPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = getLoggedInUserId();

  // ✅ Make sure "type" is properly typed
  const [form, setForm] = useState<{
    title: string;
    description: string;
    type: 'red-flag' | 'intervention';
    latitude: string;
    longitude: string;
  }>({
    title: '',
    description: '',
    type: 'red-flag',
    latitude: '0',
    longitude: '0',
  });

  const [media, setMedia] = useState<string[]>([]);

  // ✅ Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value as 'red-flag' | 'intervention' });
  };

  // ✅ Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setMedia(urls);
    }
  };

  // ✅ Handle map location update
  const handleLocationChange = (lat: number, lng: number) => {
    setForm({ ...form, latitude: lat.toString(), longitude: lng.toString() });
  };

  // ✅ Handle form submit
  const handleSubmit = () => {
    if (!userId) {
      alert('You must be logged in to submit a report.');
      navigate('/login');
      return;
    }

    // Create the report object matching your Report type
    const newReport: Report = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      type: form.type,
      latitude: form.latitude,
      longitude: form.longitude,
      status: 'draft',
      createdBy: userId,
      media,
    };

    saveReport(newReport);
    alert('Report created successfully!');
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        <div className="create-report-container">
          <h2>Create Report</h2>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="red-flag">Red Flag</option>
            <option value="intervention">Intervention</option>
          </select>

          <h4>Pick Location</h4>
          <MapPicker
            lat={parseFloat(form.latitude)}
            lng={parseFloat(form.longitude)}
            onLocationChange={handleLocationChange}
          />

          <h4>Upload Media</h4>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />

          <button onClick={handleSubmit}>Submit Report</button>
        </div>
      </div>
    </div>
  );
};

export default CreateReportPage;
