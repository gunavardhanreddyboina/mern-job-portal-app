import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './CustomerAnalysis.css';

const CustomerAnalysis = () => {
  // Dummy data for demonstration
  const jobApplicationsData = [
    { month: 'Jan', applications: 45, jobs: 12 },
    { month: 'Feb', applications: 52, jobs: 15 },
    { month: 'Mar', applications: 48, jobs: 18 },
    { month: 'Apr', applications: 61, jobs: 20 },
    { month: 'May', applications: 55, jobs: 22 },
    { month: 'Jun', applications: 67, jobs: 25 }
  ];

  const jobCategoriesData = [
    { name: 'Software', value: 35, color: '#667eea' },
    { name: 'Marketing', value: 25, color: '#764ba2' },
    { name: 'Sales', value: 20, color: '#f093fb' },
    { name: 'Design', value: 15, color: '#4facfe' },
    { name: 'Other', value: 5, color: '#43e97b' }
  ];

  const companyPerformanceData = [
    { company: 'Tech Corp', jobs: 15, applications: 120 },
    { company: 'Dev Solutions', jobs: 12, applications: 95 },
    { company: 'Innovate Inc', jobs: 10, applications: 78 },
    { company: 'Code Masters', jobs: 8, applications: 65 },
    { company: 'Digital Plus', jobs: 6, applications: 45 }
  ];

  const statsData = [
    { label: 'Total Jobs Posted', value: '87' },
    { label: 'Total Applications', value: '1,240' },
    { label: 'Active Jobs', value: '45' },
    { label: 'Avg. Applications/Job', value: '14.3' }
  ];

  return (
    <div className="analysis-container">
      <h2>Customer Analysis</h2>
      
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Job Applications Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={jobApplicationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#667eea"
                strokeWidth={2}
                name="Applications"
              />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#764ba2"
                strokeWidth={2}
                name="Jobs Posted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Jobs by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobCategoriesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {jobCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>Company Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#667eea" name="Jobs Posted" />
              <Bar dataKey="applications" fill="#764ba2" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysis;

