import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="sidebar">
      <h2>iReporter</h2>
      <nav>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/report/create" className="nav-link">Create Report</NavLink>
        {isAdmin && <NavLink to="/admin" className="nav-link">Admin Panel</NavLink>}
        <NavLink to="/login" className="nav-link">Logout</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
