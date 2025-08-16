import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Users, Shield, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { authService } from '../../services/auth.service';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const watchedRole = watch('role');

  const onSubmit = async (data) => {
    try {
      setError('');
      const response = await authService.register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role: data.role.toLowerCase(),
        avatar: data.avatar[0],
      });
      const role = response.user.role;
      
      setIsSuccess(true);
      
      setTimeout(() => {
        if (role === 'user') navigate('/user');
        else if (role === 'facility_owner') navigate('/owner');
        else if (role === 'admin') navigate('/admin');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const roleIcons = {
    user: User,
    facility_owner: Shield,
    admin: Users,
  };

  const roleColors = {
    user: 'from-green-100 to-emerald-100',
    facility_owner: 'from-orange-100 to-red-100',
    admin: 'from-purple-100 to-indigo-100',
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-purple-100 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-100 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-100 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-10 left-10 w-18 h-18 bg-pink-100 rounded-full animate-bounce opacity-60 animation-delay-1000"></div>
        <div className="absolute top-1/2 right-5 w-12 h-12 bg-cyan-100 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute top-1/3 left-5 w-14 h-14 bg-emerald-100 rounded-full animate-bounce opacity-50 animation-delay-3000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-purple-200 to-blue-200 rotate-45 animate-spin-slow opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-pink-200 to-indigo-200 rotate-12 animate-float opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-10 h-10 bg-gradient-to-r from-cyan-200 to-purple-200 rounded-full animate-pulse opacity-30 animation-delay-4000"></div>
      </div>

      <div className="w-1/2 max-w-1/3 relative z-10 px-6 py-4 min-h-screen ">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg animate-pulse">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Join Us Today</h1>
          <p className="text-gray-600 text-lg">Create your account and get started</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-all duration-500">
          {/* Hero Image */}
          <div className="mb-6 relative overflow-hidden rounded-2xl">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Signup illustration"
              className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-medium text-sm">Account created successfully! Redirecting...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl animate-shake">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register('fullName', { 
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs ml-1 animate-fade-in">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { 
                      value: /^\S+@\S+$/i, 
                      message: 'Please enter a valid email address' 
                    },
                  })}
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs ml-1 animate-fade-in">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { 
                      value: 6, 
                      message: 'Password must be at least 6 characters' 
                    },
                  })}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs ml-1 animate-fade-in">{errors.password.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Account Type</label>
              <select
                {...register('role', { required: 'Please select an account type' })}
                className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
              >
                <option value="" className="bg-white text-gray-800">Choose your role</option>
                <option value="user" className="bg-white text-gray-800">Regular User</option>
                <option value="facility_owner" className="bg-white text-gray-800">Facility Owner</option>
                <option value="admin" className="bg-white text-gray-800">Administrator</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs ml-1 animate-fade-in">{errors.role.message}</p>
              )}
              
              {/* Role Description */}
              {watchedRole && (
                <div className={`p-2 rounded-lg bg-gradient-to-r ${roleColors[watchedRole]} border border-gray-200 animate-fade-in`}>
                  <div className="flex items-center space-x-2">
                    {roleIcons[watchedRole] && 
                      React.createElement(roleIcons[watchedRole], { className: "w-3 h-3 text-gray-700" })
                    }
                    <span className="text-gray-700 text-xs font-medium">
                      {watchedRole === 'user' && 'Access to booking and basic features'}
                      {watchedRole === 'facility_owner' && 'Manage facilities and bookings'}
                      {watchedRole === 'admin' && 'Full system administration access'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Upload */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Profile Picture (Optional)</label>
              <div 
                className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  {...register('avatar')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-xs">
                    Drop your image here, or <span className="text-purple-600 font-medium">browse</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                {...register('terms', { required: 'Please accept the terms and conditions' })}
                className="w-4 h-4 text-purple-500 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-0.5"
              />
              <div className="text-xs text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors duration-200 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors duration-200 font-medium">
                  Privacy Policy
                </a>
              </div>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs ml-1 animate-fade-in">{errors.terms.message}</p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none text-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 text-xs">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
            >
              <span>Sign In Instead</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;