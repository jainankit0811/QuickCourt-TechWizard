
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';
import { useState } from 'react';

function BlockTimeSlot() {
  const { courtId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await courtService.blockTimeSlot(courtId, {
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      });
      alert('Time slot blocked successfully!');
      navigate('/owner');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Block Time Slot</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="datetime-local"
            {...register('startTime', { required: 'Start time is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}

          <input
            type="datetime-local"
            {...register('endTime', { required: 'End time is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}

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
