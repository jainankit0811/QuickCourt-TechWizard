// src/pages/admin/Reports.js
import React, { useState, useEffect } from 'react';

// Mock data - In real app, fetch from API
const mockReports = [
  { id: 1, user: 'John Doe', facility: 'Sports Arena', description: 'Inappropriate behavior', status: 'Pending' },
  { id: 2, user: 'Jane Smith', facility: 'Turf Ground', description: 'Facility not clean', status: 'Pending' },
];

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    // axios.get('/api/admin/reports').then(res => setReports(res.data));
    setReports(mockReports);
  }, []);

  const handleAction = (id, action) => {
    // axios.post(`/api/admin/report-action/${id}`, { action });
    alert(`Took action "${action}" on report ${id}`);
    setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
  };

  return (
    <div>
      <h1>Reports & Moderation</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reports.map(report => (
          <li key={report.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>User:</strong> {report.user}</p>
            <p><strong>Facility:</strong> {report.facility}</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Status:</strong> {report.status}</p>
            {report.status === 'Pending' && (
              <div>
                <button onClick={() => handleAction(report.id, 'Warn User')}>Warn User</button>
                <button onClick={() => handleAction(report.id, 'Ban User')}>Ban User</button>
                <button onClick={() => handleAction(report.id, 'Flag Facility')}>Flag Facility</button>
                <button onClick={() => handleAction(report.id, 'Dismiss')}>Dismiss</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;