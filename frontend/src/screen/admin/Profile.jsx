import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, Edit2, Mail, Save, Shield, User, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { adminProfile } from '../../data/mockData';

const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
});

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: adminProfile.name,
            email: adminProfile.email,
        }
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset({
            name: adminProfile.name,
            email: adminProfile.email,
        });
    };

    const handleSave = (data) => {
        console.log('Saving profile:', data);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-urbanGray-800">Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <img
                                    src={adminProfile.avatar}
                                    alt={adminProfile.name}
                                    className="h-24 w-24 rounded-full object-cover mx-auto"
                                />
                                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors duration-200">
                                    <Edit2 className="h-3 w-3" />
                                </button>
                            </div>

                            <h3 className="text-lg font-semibold text-urbanGray-800 mt-4">
                                {adminProfile.name}
                            </h3>
                            <p className="text-urbanGray-600">{adminProfile.role}</p>

                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-center text-sm text-urbanGray-500">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Joined {new Date(adminProfile.joinedDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mt-6">
                        <h4 className="text-lg font-semibold text-urbanGray-800 mb-4">Permissions</h4>
                        <div className="space-y-3">
                            {adminProfile.permissions.map((permission) => (
                                <div key={permission} className="flex items-center">
                                    <Shield className="h-4 w-4 text-secondary-600 mr-2" />
                                    <span className="text-sm text-urbanGray-600">
                                        {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-urbanGray-800">Profile Information</h3>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleSubmit(handleSave)}
                                        className="flex items-center bg-secondary-600 text-white px-3 py-1 rounded-md hover:bg-secondary-700 text-sm font-medium"
                                    >
                                        <Save className="h-4 w-4 mr-1" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center bg-neutral-300 text-urbanGray-700 px-3 py-1 rounded-md hover:bg-neutral-400 text-sm font-medium"
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-urbanGray-700 mb-2">
                                        <User className="h-4 w-4 inline mr-2" />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-urbanGray-800 bg-neutral-50 p-3 rounded-lg">
                                            {adminProfile.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-urbanGray-700 mb-2">
                                        <Mail className="h-4 w-4 inline mr-2" />
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-urbanGray-800 bg-neutral-50 p-3 rounded-lg">
                                            {adminProfile.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-urbanGray-700 mb-2">
                                        <Shield className="h-4 w-4 inline mr-2" />
                                        Role
                                    </label>
                                    <p className="text-urbanGray-800 bg-neutral-50 p-3 rounded-lg">
                                        {adminProfile.role}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-urbanGray-700 mb-2">
                                        <Calendar className="h-4 w-4 inline mr-2" />
                                        Member Since
                                    </label>
                                    <p className="text-urbanGray-800 bg-neutral-50 p-3 rounded-lg">
                                        {new Date(adminProfile.joinedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mt-6">
                        <h3 className="text-lg font-semibold text-urbanGray-800 mb-4">Security</h3>
                        <div className="space-y-4">
                            <button className="w-full md:w-auto bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors duration-200 font-medium">
                                Change Password
                            </button>
                            <div className="text-sm text-urbanGray-600">
                                <p>Last password change: January 1, 2024</p>
                                <p className="mt-1">We recommend changing your password regularly for security.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;