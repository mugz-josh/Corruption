// src/components/ui/Nav.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Nav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          iReporter
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            {user.isAdmin && (
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
            )}
            {!user.isAdmin && (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
