import { Ban, Eye, MoreHorizontal, Search, UserCheck } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/UI/Modal';
import { usersData } from '../../data/mockData';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const filteredUsers = usersData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setIsProfileModalOpen(true);
    };

    const handleViewBookings = (user) => {
        setSelectedUser(user);
        setIsBookingModalOpen(true);
    };

    const handleToggleBan = (userId) => {
        console.log('Toggle ban for user:', userId);
    };

    const mockBookings = [
        { id: 1, facility: 'City Sports Complex', sport: 'Basketball', date: '2024-01-20', time: '10:00 AM', status: 'completed' },
        { id: 2, facility: 'Tennis Academy', sport: 'Tennis', date: '2024-01-18', time: '2:00 PM', status: 'completed' },
        { id: 3, facility: 'Community Center', sport: 'Volleyball', date: '2024-01-22', time: '6:00 PM', status: 'upcoming' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#212121]">User Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="bg-[#e0f2fe] text-[#075985] px-3 py-1 rounded-full text-sm font-medium">
                        {filteredUsers.length} Users
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9e9e9e] h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                            />
                        </div>
                    </div>

                    <div>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full p-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Users</option>
                            <option value="facility_owner">Facility Owners</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full p-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e5e5e5] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#e5e5e5]">
                        <thead className="bg-[#fafafa]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    Activity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#e5e5e5]">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[#fafafa]">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={user.avatar}
                                                    alt={user.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-[#171717]">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-[#757575]">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'facility_owner'
                                            ? 'bg-[#e0f2fe] text-[#075985]'
                                            : 'bg-[#dcfce7] text-[#166534]'
                                            }`}>
                                            {user.role === 'facility_owner' ? 'Facility Owner' : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active'
                                            ? 'bg-[#dcfce7] text-[#166534]'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#757575]">
                                        {new Date(user.joinedDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#757575]">
                                        {user.role === 'user' ? `${user.bookings} bookings` : `${user.facilities} facilities`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleViewProfile(user)}
                                                className="text-[#0284c7] hover:text-[#0c4a6e] p-1"
                                                title="View Profile"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>

                                            {user.role === 'user' && (
                                                <button
                                                    onClick={() => handleViewBookings(user)}
                                                    className="text-[#16a34a] hover:text-[#14532d] p-1"
                                                    title="View Bookings"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleToggleBan(user.id)}
                                                className={`p-1 ${user.status === 'banned'
                                                    ? 'text-[#16a34a] hover:text-[#14532d]'
                                                    : 'text-red-600 hover:text-red-900'
                                                    }`}
                                                title={user.status === 'banned' ? 'Unban User' : 'Ban User'}
                                            >
                                                {user.status === 'banned' ? <UserCheck className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Profile Modal */}
            <Modal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                title="User Profile"
                size="md"
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-[#212121]">{selectedUser.name}</h3>
                                <p className="text-[#616161]">{selectedUser.email}</p>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${selectedUser.status === 'active'
                                    ? 'bg-[#dcfce7] text-[#166534]'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-[#212121]">Role</p>
                                <p className="text-[#616161]">{selectedUser.role === 'facility_owner' ? 'Facility Owner' : 'User'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#212121]">Joined Date</p>
                                <p className="text-[#616161]">{new Date(selectedUser.joinedDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#212121]">
                                    {selectedUser.role === 'user' ? 'Total Bookings' : 'Facilities Owned'}
                                </p>
                                <p className="text-[#616161]">
                                    {selectedUser.role === 'user' ? selectedUser.bookings : selectedUser.facilities}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Booking History Modal */}
            <Modal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                title="Booking History"
                size="lg"
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 pb-4 border-b border-[#e5e5e5]">
                            <img
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-[#212121]">{selectedUser.name}</h3>
                                <p className="text-sm text-[#616161]">Total bookings: {selectedUser.bookings}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {mockBookings.map((booking) => (
                                <div key={booking.id} className="bg-[#fafafa] p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-[#212121]">{booking.facility}</h4>
                                            <p className="text-sm text-[#616161]">{booking.sport}</p>
                                            <p className="text-sm text-[#757575]">{booking.date} at {booking.time}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'completed'
                                            ? 'bg-[#dcfce7] text-[#166534]'
                                            : 'bg-[#e0f2fe] text-[#075985]'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserManagement;