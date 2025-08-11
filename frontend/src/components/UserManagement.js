// src/pages/admin/UserManagement.js
import React, { useState, useEffect } from 'react';

// Mock data - In real app, fetch from API
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Facility Owner', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Banned' },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    // axios.get('/api/admin/users').then(res => setUsers(res.data));
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    ) && (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === statusFilter : true);
  });

  const handleBan = (id) => {
    // axios.post(`/api/admin/ban-user/${id}`);
    alert(`Banned user ${id}`);
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Banned' } : u));
  };

  const handleUnban = (id) => {
    // axios.post(`/api/admin/unban-user/${id}`);
    alert(`Unbanned user ${id}`);
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u));
  };

  const viewBookingHistory = (id) => {
    // Fetch and display history
    alert(`Viewing booking history for user ${id}`);
  };

  return (
    <div>
      <h1>User Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Facility Owner">Facility Owner</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Banned">Banned</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {user.status === 'Active' ? (
                  <button onClick={() => handleBan(user.id)}>Ban</button>
                ) : (
                  <button onClick={() => handleUnban(user.id)}>Unban</button>
                )}
                <button onClick={() => viewBookingHistory(user.id)}>View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;