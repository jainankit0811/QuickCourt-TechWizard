import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CourtBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [price, setPrice] = useState(50);
  const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];

  const onSubmit = (data) => {
    // Simulate payment
    setTimeout(() => {
      alert('Booking confirmed!');
      navigate('/my-bookings');
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book a Court</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Court</span>
          </label>
          <select
            {...register('court', { required: 'Court is required' })}
            className="select select-bordered w-full"
          >
            <option value="">Select a court</option>
            <option value="Court 1">Court 1</option>
            <option value="Court 2">Court 2</option>
          </select>
          {errors.court && <p className="text-error">{errors.court.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Time Slot</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <label key={slot} className="btn btn-outline">
                <input
                  type="radio"
                  {...register('timeSlot', { required: 'Time slot is required' })}
                  value={slot}
                />
                {slot}
              </label>
            ))}
          </div>
          {errors.timeSlot && <p className="text-error">{errors.timeSlot.message}</p>}
        </div>

        <div>
          <p><strong>Price:</strong> ${price}/hr</p>
          <p><strong>Total:</strong> ${price}</p>
        </div>

        <button type="submit" className="btn btn-secondary">Confirm Booking</button>
      </form>
    </div>
  );
}

export default CourtBooking;