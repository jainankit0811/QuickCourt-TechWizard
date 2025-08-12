import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';
import { useState } from 'react';

function CreateCourt() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await courtService.createCourt({
        name: data.name,
        facility: data.facility,
        sport: data.sport,
      });
      alert('Court created successfully!');
      navigate('/owner');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Court</h2>
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
            Create Court
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourt;
