
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { facilityService } from '../../services/auth.service.js';

function UpdateFacility() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await facilityService.getVenueById(id);
        setFacility(data);
        setValue('name', data.name);
        setValue('location', data.location);
        setValue('sportsSupported', data.sportsSupported.join(', '));
      } catch (err) {
        setError(err);
      }
    };
    fetchFacility();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await facilityService.updateFacility(id, {
        name: data.name,
        location: data.location,
        sportsSupported: data.sportsSupported.split(',').map((s) => s.trim()),
        photos: data.photos,
      });
      alert('Facility updated successfully!');
      navigate('/owner');
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!facility) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Facility</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Facility Name"
            {...register('name', { required: 'Facility name is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Location"
            {...register('location', { required: 'Location is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

          <input
            type="text"
            placeholder="Sports Supported (comma-separated, e.g., badminton,tennis)"
            {...register('sportsSupported', { required: 'Sports supported is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.sportsSupported && <p className="text-red-500 text-sm">{errors.sportsSupported.message}</p>}

          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            {...register('photos')}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.photos && <p className="text-red-500 text-sm">{errors.photos.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Update Facility
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFacility;
