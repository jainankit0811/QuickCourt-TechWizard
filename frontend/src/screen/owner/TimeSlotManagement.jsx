import axios from 'axios';
import { AlertTriangle, Clock, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

const TimeSlotManagement = () => {
  const [selectedCourt, setSelectedCourt] = useState('Tennis Court A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const courts = [
    'Tennis Court A',
    'Tennis Court B',
    'Basketball Court',
    'Badminton Court'
  ];

  // Fetch slots function for reuse
  const fetchTimeSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/timeslots`, {
        params: {
          courtName: selectedCourt,
          date: selectedDate
        }
      });
      setTimeSlots(res.data.filter(slot => slot.status === 'available'));
    } catch (err) {
      setError('Failed to fetch time slots');
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [selectedCourt, selectedDate]);

  const getSlotColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'booked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSlotIcon = (status) => {
    switch (status) {
      case 'maintenance':
        return <Settings className="w-4 h-4" />;
      case 'booked':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Booking handler
  const handleBookSlot = async (slotId) => {
    try {
      await axios.post('/bookings', { slotId });
      await fetchTimeSlots(); // Refresh slots after booking
    } catch (err) {
      alert('Booking failed!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Time Slot Management</h1>
        <p className="text-gray-600 mt-1">Manage court availability and schedule maintenance</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Court
            </label>
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              {courts.map((court) => (
                <option key={court} value={court}>{court}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-700">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-sm text-gray-700">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedCourt} - {new Date(selectedDate).toLocaleDateString()}
          </h3>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {timeSlots.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No available slots</div>
          ) : (
            timeSlots.map((slot, index) => (
              <div key={index} className={`p-3 border rounded-lg text-center transition-colors duration-200 hover:shadow-md ${getSlotColor(slot.status)}`}>
                <div className="flex flex-col items-center space-y-1">
                  {getSlotIcon(slot.status)}
                  <span className="text-xs font-medium">{slot.time}</span>
                  <span className="text-xs capitalize">{slot.status}</span>
                </div>
                {slot.status === 'available' && (
                  <Button variant="primary" size="sm" className="mt-2" onClick={() => handleBookSlot(slot._id)}>
                    Book
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManagement;