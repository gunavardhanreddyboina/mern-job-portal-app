import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="profile-content">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Name</label>
              <p>{user?.name || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user?.email || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>User ID</label>
              <p className="user-id">{user?.id || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <h3>Account Type</h3>
            <p>Job Poster</p>
          </div>
          <div className="stat-item">
            <h3>Status</h3>
            <p className="status-active">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

