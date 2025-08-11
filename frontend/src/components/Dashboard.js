// src/pages/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data - In real app, fetch from API
const mockStats = {
  totalUsers: 1500,
  totalFacilityOwners: 200,
  totalBookings: 5000,
  totalActiveCourts: 300,
};

const mockBookingData = [
  { name: 'Jan', bookings: 400 },
  { name: 'Feb', bookings: 300 },
  { name: 'Mar', bookings: 500 },
  { name: 'Apr', bookings: 700 },
  { name: 'May', bookings: 600 },
  { name: 'Jun', bookings: 800 },
];

const mockUserRegistrationData = [
  { name: 'Jan', users: 100 },
  { name: 'Feb', users: 150 },
  { name: 'Mar', users: 200 },
  { name: 'Apr', users: 250 },
  { name: 'May', users: 300 },
  { name: 'Jun', users: 350 },
];

const mockFacilityApprovalData = [
  { name: 'Jan', approvals: 20 },
  { name: 'Feb', approvals: 30 },
  { name: 'Mar', approvals: 25 },
  { name: 'Apr', approvals: 40 },
  { name: 'May', approvals: 35 },
  { name: 'Jun', approvals: 50 },
];

const mockSportsData = [
  { name: 'Badminton', value: 400 },
  { name: 'Tennis', value: 300 },
  { name: 'Football', value: 300 },
  { name: 'Basketball', value: 200 },
];

const mockEarningsData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 7000 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 8000 },
];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // Simulate API fetch
    // axios.get('/api/admin/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>Total Facility Owners</h3>
          <p>{stats.totalFacilityOwners}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>Total Active Courts</h3>
          <p>{stats.totalActiveCourts}</p>
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2>Booking Activity Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockBookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2>User Registration Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockUserRegistrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2>Facility Approval Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockFacilityApprovalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="approvals" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2>Most Active Sports</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockSportsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Earnings Simulation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockEarningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="earnings" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;