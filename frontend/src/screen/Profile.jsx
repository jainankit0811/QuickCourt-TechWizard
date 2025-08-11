import { Building2, Edit2, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const profileData = {
        name: 'John Doe',
        email: 'john.doe@sportscourt.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Street, City, State 12345',
        businessName: 'SportsCourt Facilities',
        businessType: 'Sports Facility Management',
        description: 'Professional sports facility management company providing world-class court rental services.',
        joinDate: 'January 2023',
        totalFacilities: '3',
        totalCourts: '12',
        averageRating: '4.8'
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your account information and business details</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                        <p className="text-gray-600">{profileData.businessName}</p>
                        <p className="text-sm text-gray-500 mt-2">Facility Owner</p>
                        <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total Facilities</span>
                                <span className="font-medium">{profileData.totalFacilities}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total Courts</span>
                                <span className="font-medium">{profileData.totalCourts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Average Rating</span>
                                <span className="font-medium">{profileData.averageRating} ⭐</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="xl:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                    <form className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="w-4 h-4 inline mr-1" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={profileData.name}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={profileData.email}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue={profileData.phone}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={profileData.address}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Building2 className="w-4 h-4 inline mr-1" />
                                        Business Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={profileData.businessName}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Type
                                    </label>
                                    <select
                                        defaultValue={profileData.businessType}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                    >
                                        <option value="Sports Facility Management">Sports Facility Management</option>
                                        <option value="Recreation Center">Recreation Center</option>
                                        <option value="Private Club">Private Club</option>
                                        <option value="Community Center">Community Center</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business Description
                                </label>
                                <textarea
                                    rows={4}
                                    defaultValue={profileData.description}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 text-gray-600' : ''
                                        }`}
                                    placeholder="Describe your business..."
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsEditing(false)}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">New booking received for Tennis Court A</span>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">Updated facility information</span>
                        </div>
                        <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">Scheduled maintenance for Basketball Court</span>
                        </div>
                        <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">Added new court - Badminton Court B</span>
                        </div>
                        <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;