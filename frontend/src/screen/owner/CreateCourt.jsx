import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';
import { useState,useEffect } from 'react';

function CreateCourt() {
const [error, setError] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const facility = state?.facility;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      facilityId: facility?._id || '',
      sportType: facility?.sportsSupported?.length === 1 ? facility.sportsSupported[0] : '',
    },
  });

  useEffect(() => {
    if (facility) {
      setValue('facilityId', facility._id);
      if (facility.sportsSupported?.length === 1) {
        setValue('sportType', facility.sportsSupported[0]);
      }
    }
  }, [facility, setValue]);

  const onSubmit = async (data) => {
    const courtData = {
      name: data.name,
      sportType: data.sportType,
      pricePerHour: parseFloat(data.pricePerHour),
      facilityId: data.facilityId,
      operatingHours: {
        start: data.startTime,
        end: data.endTime,
      },
    };
    console.log('Submitting court data:', courtData);
    console.log('User:', localStorage.getItem('user'));
    console.log('Token:', localStorage.getItem('token'));
    try {
      await courtService.createCourt(courtData);
      alert('Court created successfully!');
      navigate(`/owner/court/${facility._id}`, { state: { facility } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Failed to create court';
      console.error('Server error response:', err.response?.data);
      setError(errorMessage);
    }
  };

  if (!facility) {
    return <div className="text-red-500 text-center mt-10">No facility selected. Please select a facility from the list.</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Court for {facility.name}</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Court Name</label>
            <input
              type="text"
              placeholder="Court Name"
              {...register('name', { required: 'Court name is required' })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facility</label>
            <input
              type="text"
              value={`${facility.name} — ${facility.location}`}
              readOnly
              className="w-full px-4 py-2 border rounded-md text-black bg-gray-100"
            />
            <input
              type="hidden"
              {...register('facilityId', { required: 'Facility ID is required' })}
              value={facility._id}
            />
            {errors.facilityId && <p className="text-red-500 text-sm">{errors.facilityId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sport Type</label>
            {facility.sportsSupported?.length > 1 ? (
              <select
                {...register('sportType', { required: 'Sport type is required' })}
                className="w-full px-4 py-2 border rounded-md text-black"
              >
                <option value="">Select Sport</option>
                {facility.sportsSupported.map((sport, index) => (
                  <option key={index} value={sport}>{sport}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                {...register('sportType', { required: 'Sport type is required' })}
                value={facility.sportsSupported?.[0] || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-md text-black bg-gray-100"
              />
            )}
            {errors.sportType && <p className="text-red-500 text-sm">{errors.sportType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
            <input
              type="number"
              step="0.01"
              placeholder="Price per hour"
              {...register('pricePerHour', { required: 'Price is required', min: { value: 0, message: 'Price must be non-negative' } })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.pricePerHour && <p className="text-red-500 text-sm">{errors.pricePerHour.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time (e.g., 09:00 AM)</label>
            <input
              type="text"
              placeholder="Start Time (e.g., 09:00 AM)"
              {...register('startTime', {
                pattern: {
                  value: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
                  message: 'Invalid time format (e.g., 09:00 AM)',
                },
              })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Time (e.g., 05:00 PM)</label>
            <input
              type="text"
              placeholder="End Time (e.g., 05:00 PM)"
              {...register('endTime', {
                pattern: {
                  value: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
                  message: 'Invalid time format (e.g., 05:00 PM)',
                },
              })}
              className="w-full px-4 py-2 border rounded-md text-black"
            />
            {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Create Court
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourt;