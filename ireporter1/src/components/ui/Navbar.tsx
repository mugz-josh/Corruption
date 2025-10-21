import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaTachometerAlt,
  FaFlag,
  FaTools,
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          <span>iReporter</span>
        </Link>
        <Link to="/create-report" className="btn-create">CREATE RECORD</Link>
      </div>

      <nav className="sidebar-nav">
        {user ? (
          <>
            {/* ✅ Dashboard now links to "/" */}
            <Link to="/" className="nav-link">
              <FaTachometerAlt className="nav-icon" />
              Dashboard
            </Link>

            <Link to="/red-flags" className="nav-link">
              <FaFlag className="nav-icon" />
              Red Flags
            </Link>
            <Link to="/interventions" className="nav-link">
              <FaTools className="nav-icon" />
              Interventions
            </Link>

            {user.isAdmin && (
              <Link to="/admin" className="nav-link">
                <FaUserShield className="nav-icon" />
                Admin
              </Link>
            )}

            {/* Optional: Remove these if About/Contact pages were deleted */}
            {/* <Link to="/about" className="nav-link">
              <FaInfoCircle className="nav-icon" />
              About
            </Link>
            <Link to="/contact" className="nav-link">
              <FaEnvelope className="nav-icon" />
              Contact
            </Link> */}

            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                <FaSignOutAlt className="nav-icon" />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">
              <FaTachometerAlt className="nav-icon" />
              Home
            </Link>
            <Link to="/login" className="nav-link">
              <FaSignInAlt className="nav-icon" />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              <FaUserPlus className="nav-icon" />
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Navbar;
