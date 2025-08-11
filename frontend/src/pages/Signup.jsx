import { useForm } from 'react-hook-form';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Signup data:', data);
    alert('Signup successful!');
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="text"
            placeholder="Mobile"
            {...register('mobile', { required: 'Mobile number is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <select
            {...register('type', { required: 'User type is required' })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Type</option>
            <option value="User">User</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                       font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;