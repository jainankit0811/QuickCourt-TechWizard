import { Edit, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { addFacility, getFacilities } from '../../services/facility.service';
import { Link } from 'react-router-dom';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    sports: '',
    amenities: '',
    courts: '',
    status: 'Active',
    image: ''
  });

  useEffect(() => {
    // Fetch facilities from backend
    getFacilities().then(setFacilities);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFacility = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      sports: formData.sports.split(',').map(s => s.trim()),
      amenities: formData.amenities.split(',').map(a => a.trim()),
      courts: Number(formData.courts)
    };
    const newFacility = await addFacility(payload);
    setFacilities([...facilities, newFacility]);
    setShowForm(false);
    setFormData({
      name: '',
      location: '',
      description: '',
      sports: '',
      amenities: '',
      courts: '',
      status: 'Active',
      image: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facility Management</h1>
<button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 mt-5 border-2 border-black focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">                      <Link to="/facilities/create"><h2 className='text-gray-900 text-2xl'>Create</h2></Link>
</button>

          <p className="text-gray-600 mt-1">Manage your sports facilities and their details</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Facility
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Add Facility </h2> 
            <button onClick={() => setShowForm(false)}>
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 " onSubmit={handleAddFacility}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Facility Name" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sports (comma separated)</label>
              <input name="sports" value={formData.sports} onChange={handleChange} placeholder="Sports (comma separated)" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
              <input name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Courts</label>
              <input name="courts" value={formData.courts} onChange={handleChange} placeholder="Number of Courts" className="border w-md bg-transparent p-2 rounded text-black" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border w-md bg-transparent p-2 rounded text-black" />
            </div>
            <Button type="submit" className="col-span-2">Add Facility</Button>
          </form>
        </div>
      )}

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
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${facility.status === 'Active'
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