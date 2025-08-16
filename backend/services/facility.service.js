import Facility from '../models/Facility.js';
import redisClient from './redis.service.js';

const createFacility = async (data, userId) => {
  const facility = new Facility({
    ...data,
    owner: userId,
    status: 'pending',
  });
  await facility.save();
  return facility;
};

const getAllVenues = async (filters = {}) => {
  const cacheKey = `venues:${JSON.stringify(filters)}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // ✅ Sanitize filters
  const allowedFilters = ['location', 'sportsSupported'];
  const sanitizedFilters = {};

  for (const key of allowedFilters) {
    if (filters[key]) {
      sanitizedFilters[key] = filters[key];
    }
  }

  const query = { status: 'approved', ...sanitizedFilters };
  const venues = await Facility.find(query).populate('owner');
  await redisClient.setex(cacheKey, 3600, JSON.stringify(venues));
  return venues;
};

const getVenueById = async (id) => {
  const cacheKey = `venue:${id}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const venue = await Facility.findById(id).populate('owner'); // ✅ fixed
  if (!venue) throw new Error('Venue not found');
  await redisClient.setex(cacheKey, 3600, JSON.stringify(venue));
  return venue;
};

const updateFacility = async (id, data, userId) => {
  const facility = await Facility.findOne({ _id: id, owner: userId });
  if (!facility) throw new Error('Facility not found or unauthorized');
  Object.assign(facility, { ...data, photos: data.photos || facility.photos });
  await facility.save();
  await redisClient.del(`venue:${id}`);
  return facility;
};

const approveFacility = async (id, status, comments = '') => {
  const facility = await Facility.findById(id);
  if (!facility) throw new Error('Facility not found');
  facility.status = status;
  facility.rejectionComments = comments;
  await facility.save();
  await redisClient.del(`venue:${id}`);
  await redisClient.del(`venues:`);
  return facility;
};

export { createFacility, getAllVenues, getVenueById, updateFacility, approveFacility };