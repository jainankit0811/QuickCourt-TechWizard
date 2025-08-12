import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useState } from 'react';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      const role = response.user.role;
      alert('Login successful!');
      if (role === 'user') navigate('/user');
      else if (role === 'facility_owner') navigate('/owner');
      else if (role === 'admin') navigate('/admin');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>

        {/* Image directly below the title */}
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developing-development-secure-mobile-webapp-and-pack-design-illustrations-3783954.png"
          alt="Login Illustration"
          className="mb-6 rounded-lg w-full object-cover"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition text-black"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <a href="/Signup" className="text-blue-600 text-sm underline block mb-2">
            Already have an account?
          </a>

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;