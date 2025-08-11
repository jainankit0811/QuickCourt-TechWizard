import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, Check, Eye, MapPin, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Modal from '../../components/UI/Modal';
import { pendingFacilities } from '../../data/mockData';

const schema = yup.object({
  action: yup.string().required('Action is required'),
  comments: yup.string().when('action', {
    is: 'reject',
    then: (schema) => schema.required('Comments are required for rejection'),
    otherwise: (schema) => schema.notRequired()
  })
});

const FacilityApproval = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const actionValue = watch('action');

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
    setSelectedImageIndex(0);
    reset();
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data, 'Facility:', selectedFacility.id);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#212121]">Facility Approval</h1>
        <div className="bg-[#ffedd5] text-[#9a3412] px-3 py-1 rounded-full text-sm font-medium">
          {pendingFacilities.length} Pending
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingFacilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow-sm border border-[#bae6fd] overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video bg-[#bae6fd] overflow-hidden">
              <img
                src={facility.images[0]}
                alt={facility.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#212121] mb-2">{facility.name}</h3>
              <p className="text-sm text-[#616161] mb-4">Owner: {facility.owner}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-[#616161]">
                  <MapPin className="h-4 w-4 mr-2" />
                  {facility.location}
                </div>
                <div className="flex items-center text-sm text-[#616161]">
                  <Users className="h-4 w-4 mr-2" />
                  {facility.courts} Courts
                </div>
                <div className="flex items-center text-sm text-[#616161]">
                  <Calendar className="h-4 w-4 mr-2" />
                  {facility.submittedDate}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {facility.sports.map((sport) => (
                  <span
                    key={sport}
                    className="bg-[#e0f2fe] text-[#075985] text-xs px-2 py-1 rounded-full"
                  >
                    {sport}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleFacilityClick(facility)}
                className="w-full bg-[#0284c7] text-white py-2 px-4 rounded-lg hover:bg-[#0369a1] transition-colors duration-200 flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Review Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Facility Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Facility Review"
        size="lg"
      >
        {selectedFacility && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-[#bae6fd] rounded-lg overflow-hidden">
                <img
                  src={selectedFacility.images[selectedImageIndex]}
                  alt={`${selectedFacility.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {selectedFacility.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {selectedFacility.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-[#bae6fd] rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? 'border-[#0ea5e9]' : 'border-transparent'
                        }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details and Action Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#212121] mb-2">
                  {selectedFacility.name}
                </h3>
                <p className="text-[#616161]">{selectedFacility.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-[#212121]">Owner</p>
                  <p className="text-[#616161]">{selectedFacility.owner}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#212121]">Location</p>
                  <p className="text-[#616161]">{selectedFacility.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#212121]">Courts</p>
                  <p className="text-[#616161]">{selectedFacility.courts}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#212121]">Operating Hours</p>
                  <p className="text-[#616161]">{selectedFacility.operatingHours}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#212121] mb-2">Sports</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFacility.sports.map((sport) => (
                    <span
                      key={sport}
                      className="bg-[#e0f2fe] text-[#075985] text-sm px-3 py-1 rounded-full"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#212121] mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFacility.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-[#dcfce7] text-[#166534] text-sm px-3 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4 border-t border-[#bae6fd]">
                <div>
                  <label className="block text-sm font-medium text-[#424242] mb-2">
                    Action
                  </label>
                  <select
                    {...register('action')}
                    className="w-full p-3 border border-[#bae6fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                  >
                    <option value="">Select action...</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                  {errors.action && (
                    <p className="text-red-500 text-sm mt-1">{errors.action.message}</p>
                  )}
                </div>

                {actionValue && (
                  <div>
                    <label className="block text-sm font-medium text-[#424242] mb-2">
                      Comments {actionValue === 'reject' && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      {...register('comments')}
                      rows={3}
                      placeholder={actionValue === 'approve' ? 'Optional approval notes...' : 'Please provide reason for rejection...'}
                      className="w-full p-3 border border-[#bae6fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                    />
                    {errors.comments && (
                      <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>
                    )}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={!actionValue}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${actionValue === 'approve'
                        ? 'bg-[#bbf7d0] hover:bg-[#15803d] text-white'
                        : actionValue === 'reject'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-[#d4d4d4] text-[#737373] cursor-not-allowed'
                      }`}
                  >
                    {actionValue === 'approve' && <Check className="h-4 w-4 mr-2" />}
                    {actionValue === 'reject' && <X className="h-4 w-4 mr-2" />}
                    {actionValue ? `${actionValue.charAt(0).toUpperCase() + actionValue.slice(1)} Facility` : 'Select Action'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FacilityApproval;