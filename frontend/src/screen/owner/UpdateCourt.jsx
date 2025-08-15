
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';

function UpdateCourt() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [court, setCourt] = useState(null);

  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const response = await courtService.getCourtById(id); // Assume endpoint exists
        setCourt(response);
        setValue('name', response.name);
        setValue('facility', response.facility);
        setValue('sport', response.sport);
      } catch (err) {
        setError(err);
      }
    };
    fetchCourt();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await courtService.updateCourt(id, {
        name: data.name,
        facility: data.facility,
        sport: data.sport,
      });
      alert('Court updated successfully!');
      navigate('/owner');
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!court) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Court</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Court Name"
            {...register('name', { required: 'Court name is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Facility ID"
            {...register('facility', { required: 'Facility ID is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.facility && <p className="text-red-500 text-sm">{errors.facility.message}</p>}

          <input
            type="text"
            placeholder="Sport (e.g., badminton)"
            {...register('sport', { required: 'Sport is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.sport && <p className="text-red-500 text-sm">{errors.sport.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Update Court
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourt;