import React, { useState } from 'react';
import axios from 'axios';
import './JobPostingForm.css';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    lastDateForApplication: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Job posted successfully!' });
        setFormData({
          jobTitle: '',
          jobDescription: '',
          lastDateForApplication: '',
          companyName: ''
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to post job'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-posting-container">
      <div className="job-posting-card">
        <h2>Post a New Job</h2>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe the job requirements, responsibilities, and qualifications..."
              rows="6"
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Tech Corp"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Date for Application</label>
              <input
                type="date"
                name="lastDateForApplication"
                value={formData.lastDateForApplication}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;

