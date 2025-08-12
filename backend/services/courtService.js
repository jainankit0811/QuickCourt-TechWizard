import Court from '../models/Court.js';
import Facility from '../models/Facility.js';

const createCourt = async (data, userId) => {
  const { facilityId } = data;
  const facility = await Facility.findOne({ _id: facilityId, owner: userId });
  if (!facility) throw new Error('Facility not found or unauthorized');

  const court = new Court(data);
  await court.save();
  return court;
};

const updateCourt = async (id, data, userId) => {
  const court = await Court.findById(id).populate('facility');
  if (!court || court.facility.owner.toString() !== userId.toString()) throw new Error('Court not found or unauthorized');
  Object.assign(court, data);
  await court.save();
  return court;
};

const blockTimeSlot = async (courtId, slotData, userId) => {
  const court = await Court.findById(courtId).populate('facility');
  if (!court || court.facility.owner.toString() !== userId.toString()) throw new Error('Court not found or unauthorized');
  court.blockedSlots.push(slotData);
  await court.save();
  return court;
};

export { createCourt, updateCourt, blockTimeSlot };