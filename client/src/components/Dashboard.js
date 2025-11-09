import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import JobPostingForm from './JobPostingForm';
import JobPosted from './JobPosted';
import Profile from './Profile';
import CustomerAnalysis from './CustomerAnalysis';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<JobPostingForm />} />
          <Route path="/jobs" element={<JobPosted />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analysis" element={<CustomerAnalysis />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

