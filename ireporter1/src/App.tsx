import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import CreateReportPage from './pages/CreateReportPage';
import EditReportPage from './pages/EditReportPage';
import SingleReportPage from './pages/SingleReportPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/report/create" element={<CreateReportPage />} />
        <Route path="/report/edit/:id" element={<EditReportPage />} />
        <Route path="/report/:id" element={<SingleReportPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
