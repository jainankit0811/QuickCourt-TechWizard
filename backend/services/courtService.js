import Court from '../models/Court.js';
import Facility from '../models/Facility.js';

const createCourtService = async (data, userId) => {
  const { facilityId, ...rest } = data; // Extract facilityId
  console.log('createCourtService - facilityId:', facilityId, 'userId:', userId);
  const facility = await Facility.findOne({ _id: facilityId, owner: userId });
  if (!facility) {
    console.error('Facility not found or unauthorized for facilityId:', facilityId, 'userId:', userId);
    throw new Error('Facility not found or unauthorized');
  }

  // Map facilityId to facility to match the Court schema
  const courtData = {
    ...rest,
    facility: facilityId, // Rename facilityId to facility
  };

  console.log('Saving court with data:', courtData); // Debug: Log court data
  const court = new Court(courtData);
  await court.save();
  return court;
};

const updateCourtService = async (id, data, userId) => {
  const court = await Court.findById(id).populate('facility');
  if (!court || court.facility.owner.toString() !== userId.toString()) throw new Error('Court not found or unauthorized');
  Object.assign(court, data);
  await court.save();
  return court;
};

const getAllCourtsByFacility = async (req, res) => {
  try {
    const { facilityId } = req.params;
    console.log('getAllCourtsByFacility - facilityId:', facilityId); // Debug
    const courts = await Court.find({ facility: facilityId }).populate('facility');
    console.log('Found courts:', courts); // Debug
    res.status(200).json(courts);
  } catch (error) {
    console.error('getAllCourtsByFacility error:', error.message); // Debug
    res.status(400).json({ message: error.message });
  }
};

const blockTimeSlot = async (courtId, slotData, userId) => {
  const court = await Court.findById(courtId).populate('facility');
  if (!court || court.facility.owner.toString() !== userId.toString()) throw new Error('Court not found or unauthorized');
  court.blockedSlots.push(slotData);
  await court.save();
  return court;
};

export { createCourtService, updateCourtService, blockTimeSlot,getAllCourtsByFacility };