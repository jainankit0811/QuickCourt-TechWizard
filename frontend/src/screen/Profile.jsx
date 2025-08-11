import { Building2, Edit2, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { getProfile, upsertProfile } from '../services/profile.service';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        businessName: '',
        businessType: '',
        description: '',
        joinDate: '',
        totalFacilities: '',
        totalCourts: '',
        averageRating: ''
    });

    useEffect(() => {
        getProfile().then((data) => {
            setProfileData({
                name: data.fullName || '',
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
                businessName: data.businessName || '',
                businessType: data.businessType || '',
                description: data.description || '',
                joinDate: data.joinDate || '',
                totalFacilities: data.totalFacilities || '',
                totalCourts: data.totalCourts || '',
                averageRating: data.averageRating || ''
            });
        });
    }, []);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await upsertProfile({
            fullName: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address,
            businessName: profileData.businessName,
            businessType: profileData.businessType,
            description: profileData.description,
            joinDate: profileData.joinDate,
            totalFacilities: profileData.totalFacilities,
            totalCourts: profileData.totalCourts,
            averageRating: profileData.averageRating
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6 text-black">
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
                    <form className="space-y-6" onSubmit={handleSave}>
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
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
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
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
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
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
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
                                        name="address"
                                        value={profileData.address}
                                        onChange={handleChange}
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
                                        name="businessName"
                                        value={profileData.businessName}
                                        onChange={handleChange}
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
                                        name="businessType"
                                        value={profileData.businessType}
                                        onChange={handleChange}
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
                                    name="description"
                                    value={profileData.description}
                                    onChange={handleChange}
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
                                <Button variant="outline" onClick={() => setIsEditing(false)} className="text-white">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button type="submit">
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