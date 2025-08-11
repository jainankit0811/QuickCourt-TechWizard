import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service'; // Adjust the import path as necessary
import { useState } from 'react';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await authService.register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role: data.role.toLowerCase(),
        avatar: data.avatar[0],
      });
      const role = response.user.role;
      alert('Signup successful!');
      if (role === 'user') navigate('/user');
      else if (role === 'facility_owner') navigate('/owner');
      else if (role === 'admin') navigate('/admin');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <select
            {...register('role', { required: 'User role is required' })}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="facility_owner">Facility Owner</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

          <input
            type="file"
            accept="image/jpeg,image/png"
            {...register('avatar')}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;