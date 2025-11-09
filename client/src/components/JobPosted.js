import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPosted.css';

const JobPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    lastDateForApplication: '',
    companyName: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        if (response.data.success) {
          setMessage({ type: 'success', text: 'Job deleted successfully!' });
          fetchJobs();
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to delete job'
        });
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setEditFormData({
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      lastDateForApplication: job.lastDateForApplication.split('T')[0],
      companyName: job.companyName
    });
    setMessage({ type: '', text: '' });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setEditFormData({
      jobTitle: '',
      jobDescription: '',
      lastDateForApplication: '',
      companyName: ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/jobs/${id}`, editFormData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Job updated successfully!' });
        setEditingJob(null);
        fetchJobs();
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update job'
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="job-posted-container">
      <div className="job-posted-header">
        <h2>Posted Jobs</h2>
        <p className="job-count">Total Jobs: {jobs.length}</p>
      </div>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <p>No jobs posted yet. Post your first job from the Job Posting Form.</p>
        </div>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              {editingJob === job._id ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={editFormData.jobTitle}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, jobTitle: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Description</label>
                    <textarea
                      value={editFormData.jobDescription}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          jobDescription: e.target.value
                        })
                      }
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        value={editFormData.companyName}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            companyName: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Date</label>
                      <input
                        type="date"
                        value={editFormData.lastDateForApplication}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            lastDateForApplication: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="edit-actions">
                    <button
                      onClick={() => handleUpdate(job._id)}
                      className="btn-save"
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="job-header">
                    <h3>{job.jobTitle}</h3>
                    <div className="job-actions">
                      <button
                        onClick={() => handleEdit(job)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="job-details">
                    <p className="company-name">
                      <strong>Company:</strong> {job.companyName}
                    </p>
                    <p className="job-description">{job.jobDescription}</p>
                    <p className="last-date">
                      <strong>Last Date for Application:</strong>{' '}
                      {formatDate(job.lastDateForApplication)}
                    </p>
                    <p className="posted-date">
                      Posted on: {formatDate(job.createdAt)}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPosted;

