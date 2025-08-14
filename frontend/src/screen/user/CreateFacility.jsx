import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { facilityService } from '../../services/auth.service.js';
import { useState } from 'react';

function CreateFacility() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await facilityService.createFacility({
        name: data.name,
        location: data.location,
        sportsSupported: data.sportsSupported.split(',').map((s) => s.trim()),
        photos: data.photos,
      });
      alert('Facility created successfully!');
      navigate('/owner');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Create Facility</h2>

        {/* Image directly below the title */}
        <img
          src="https://media.licdn.com/dms/image/v2/D4D12AQEHKcTId_Piiw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1726122594424?e=2147483647&v=beta&t=ooTXXTk4wJvboRKX91ubpRx-wNXNoxmlug8J5wAz-5E"
          alt="Facility Illustration"
          className="mb-6 rounded-lg w-full object-cover"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Facility Name"
            {...register('name', { required: 'Facility name is required' })}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Location"
            {...register('location', { required: 'Location is required' })}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

          <input
            type="text"
            placeholder="Sports Supported (comma-separated, e.g., badminton,tennis)"
            {...register('sportsSupported', { required: 'Sports supported is required' })}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.sportsSupported && <p className="text-red-500 text-sm">{errors.sportsSupported.message}</p>}

          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            {...register('photos')}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.photos && <p className="text-red-500 text-sm">{errors.photos.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Create Facility
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFacility;