// src/components/AdminLayout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <h2>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/facility-approval">Facility Approval</Link></li>
            <li><Link to="/admin/user-management">User Management</Link></li>
            <li><Link to="/admin/reports">Reports & Moderation</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;