import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { facilityService } from '../../services/auth.service.js';

function ApproveFacility() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
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
      } catch (err) {
        setError(err);
      }
    };
    fetchFacility();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await facilityService.approveFacility(id, {
        status: data.status,
        comments: data.comments,
      });
      alert('Facility approval updated successfully!');
      navigate('/admin');
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
        <h2 className="text-3xl font-bold mb-6 text-center">Approve Facility: {facility.name}</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select
            {...register('status', { required: 'Status is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            <option value="">Select Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

          <textarea
            placeholder="Comments (optional)"
            {...register('comments')}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.comments && <p className="text-red-500 text-sm">{errors.comments.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Submit Approval
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApproveFacility;