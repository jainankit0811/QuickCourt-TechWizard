import { useForm } from 'react-hook-form';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';
import { useState } from 'react';

function BlockTimeSlot() {
  const { courtId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const facility = state?.facility;
  const court = state?.court;
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const slotData = {
        date: data.date, // ISO8601 date (e.g., "2025-08-17")
        time: data.time, // Time string (e.g., "14:00")
        status: 'maintenance', // Set status to maintenance
      };
      console.log('Blocking time slot with data:', slotData); // Debug
      await courtService.blockTimeSlot(courtId, slotData);
      alert('Time slot blocked successfully!');
      navigate(`/owner/court/${facility._id}`, { state: { facility } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Failed to block time slot';
      console.error('Block time slot error:', err.response?.data); // Debug
      setError(errorMessage);
    }
  };

  if (!court || !facility) {
    return (
      <div className="text-red-500 text-center mt-10">
        Court or facility information not found. Please select a court from the facility.
        <button
          onClick={() => navigate('/owner')}
          className="mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
        >
          Go to Facility List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Block Time Slot for {court.name}</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('date', { required: 'Date is required' })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time (e.g., 14:00)</label>
            <input
              type="time"
              {...register('time', {
                required: 'Time is required',
                pattern: {
                  value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                  message: 'Invalid time format (e.g., 14:00)',
                },
              })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Block Time Slot
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlockTimeSlot;