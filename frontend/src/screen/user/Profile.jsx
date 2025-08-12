import { useForm } from 'react-hook-form';

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  const onSubmit = (data) => {
    console.log('Profile updated:', data);
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <button type="submit" className="btn btn-secondary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;