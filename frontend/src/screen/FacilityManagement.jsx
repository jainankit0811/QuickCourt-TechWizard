import { Edit, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';

const FacilityManagement = () => {
  const [facilities] = useState([
    {
      id: 1,
      name: 'Downtown Sports Center',
      location: '123 Main St, Downtown',
      description: 'Modern sports facility with multiple courts',
      sports: ['Tennis', 'Basketball', 'Badminton'],
      amenities: ['Parking', 'Changing Rooms', 'Cafeteria'],
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400',
      courts: 5,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Westside Tennis Club',
      location: '456 Oak Ave, Westside',
      description: 'Premium tennis facility',
      sports: ['Tennis'],
      amenities: ['Pro Shop', 'Parking', 'Lounge'],
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
      courts: 3,
      status: 'Active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facility Management</h1>
          <p className="text-gray-600 mt-1">Manage your sports facilities and their details</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Facility
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <img 
              src={facility.image} 
              alt={facility.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  facility.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {facility.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{facility.location}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{facility.description}</p>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Sports:</p>
                <div className="flex flex-wrap gap-1">
                  {facility.sports.map((sport) => (
                    <span key={sport} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{facility.courts} courts</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityManagement;