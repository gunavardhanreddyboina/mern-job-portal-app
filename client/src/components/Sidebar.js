import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Job Portal</h2>
        {user && <p className="user-name">Welcome, {user.name}</p>}
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? 'active' : ''}`}>
          Job Posting Form
        </Link>
        <Link to="/dashboard/jobs" className={`nav-item ${location.pathname === '/dashboard/jobs' ? 'active' : ''}`}>
          Job Posted
        </Link>
        <Link to="/dashboard/profile" className={`nav-item ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}>
          Profile
        </Link>
        <Link to="/dashboard/analysis" className={`nav-item ${location.pathname === '/dashboard/analysis' ? 'active' : ''}`}>
          Customer Analysis
        </Link>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

