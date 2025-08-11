import { Calendar, Clock, Filter, MapPin, Search, User } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button';

const BookingOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const bookings = [
    {
      id: 1,
      bookingId: 'BK001',
      userName: 'John Smith',
      userEmail: 'john.smith@email.com',
      courtName: 'Tennis Court A',
      facility: 'Downtown Sports Center',
      date: '2024-01-15',
      time: '2:00 PM - 3:00 PM',
      status: 'Confirmed',
      price: 50,
      paymentStatus: 'Paid'
    },
    {
      id: 2,
      bookingId: 'BK002',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@email.com',
      courtName: 'Basketball Court',
      facility: 'Downtown Sports Center',
      date: '2024-01-15',
      time: '4:00 PM - 5:00 PM',
      status: 'Confirmed',
      price: 40,
      paymentStatus: 'Paid'
    },
    {
      id: 3,
      bookingId: 'BK003',
      userName: 'Mike Wilson',
      userEmail: 'mike.w@email.com',
      courtName: 'Tennis Court B',
      facility: 'Westside Tennis Club',
      date: '2024-01-14',
      time: '6:00 PM - 7:00 PM',
      status: 'Completed',
      price: 60,
      paymentStatus: 'Paid'
    },
    {
      id: 4,
      bookingId: 'BK004',
      userName: 'Emily Davis',
      userEmail: 'emily.d@email.com',
      courtName: 'Badminton Court',
      facility: 'Downtown Sports Center',
      date: '2024-01-16',
      time: '10:00 AM - 11:00 AM',
      status: 'Pending',
      price: 35,
      paymentStatus: 'Pending'
    }
  ];

  const getStatusBadge = (status) => {
    const colors = {
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`;
  };

  const getPaymentBadge = (status) => {
    const colors = {
      'Paid': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Refunded': 'bg-gray-100 text-gray-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`;
  };

  // Handler for View button
  const handleView = (booking) => {
    // TODO: Implement modal or navigation to booking details
    alert(`Viewing booking ${booking.bookingId}`);
  };

  // Handler for Confirm button
  const handleConfirm = async (booking) => {
    // TODO: Integrate with backend API to confirm booking
    alert(`Confirm booking ${booking.bookingId}`);
    // Example: await bookingService.confirmBooking(booking.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Overview</h1>
        <p className="text-gray-600 mt-1">View and manage all court bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <User className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$2,450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Button variant="outline" className="text-white">
              <Filter className="w-4 h-4 mr-2 text-white" />
              <span className="text-white">More Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">#{booking.bookingId}</p>
                      <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.userName}</p>
                      <p className="text-sm text-gray-500">{booking.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.courtName}</p>
                      <p className="text-sm text-gray-500">{booking.facility}</p>
                      <p className="text-sm text-gray-500">{booking.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">${booking.price}</p>
                      <span className={getPaymentBadge(booking.paymentStatus)}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(booking)}>
                        View
                      </Button>
                      {booking.status === 'Pending' && (
                        <Button size="sm" onClick={() => handleConfirm(booking)}>
                          Confirm
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;