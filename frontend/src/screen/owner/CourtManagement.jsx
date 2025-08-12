import { Clock, DollarSign, Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { deleteCourt, getCourts } from '../../services/court.service';

const CourtManagement = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourts();
        setCourts(data);
      } catch (e) {
        setError('Failed to load courts');
      } finally {
        setLoading(false);
      }
    };
    loadCourts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this court?')) return;
    try {
      await deleteCourt(id);
      setCourts((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Court Management</h1>
          <p className="text-gray-600 mt-1">Manage courts, pricing, and operating hours</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Court
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sport Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Hour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operating Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="text-center py-6 text-gray-500">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="7" className="text-center py-6 text-red-500">{error}</td></tr>
              ) : courts.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-6 text-gray-500">No courts found</td></tr>
              ) : courts.map((court) => (
                <tr key={court.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{court.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof court.facility === 'object' ? court.facility?.name : court.facility}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {court.sportType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{court.pricePerHour}/hr</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{court.operatingHours?.start && court.operatingHours?.end ? `${court.operatingHours.start} - ${court.operatingHours.end}` : (court.operatingHours || '-')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${court.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : court.status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {court.status || 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(court._id || court.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourtManagement;