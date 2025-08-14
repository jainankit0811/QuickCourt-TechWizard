import Booking from '../models/Booking.js';
import Court from '../models/Court.js';
import redisClient from './redis.service.js';

const createBooking = async ({ courtId, date, startTime, endTime }, userId) => {
  const court = await Court.findById(courtId).populate('facility');
  if (!court) throw new Error('Court not found');
  if (court.facility.status !== 'approved') throw new Error('Facility not approved');

  const existingBookings = await Booking.find({
    court: courtId,
    date,
    $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
  });
  if (existingBookings.length > 0) throw new Error('Slot not available');

  const duration = (new Date(`2000-01-01 ${endTime}`) - new Date(`2000-01-01 ${startTime}`)) / (1000 * 60 * 60);
  const totalPrice = duration * court.pricePerHour;

  const booking = new Booking({
    user: userId,
    court: courtId,
    date,
    startTime,
    endTime,
    totalPrice,
  });
  await booking.save();

  await redisClient.del(`bookings:${userId}`);
  return booking;
};

const getUserBookings = async (userId) => {
  const cacheKey = `bookings:${userId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const bookings = await Booking.find({ user: userId }).populate('court facility');
  await redisClient.setex(cacheKey, 3600, JSON.stringify(bookings));
  return bookings;
};

const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new Error('Booking not found');
  if (booking.status !== 'confirmed') throw new Error('Cannot cancel this booking');
  booking.status = 'cancelled';
  await booking.save();

  await redisClient.del(`bookings:${userId}`);
  return booking;
};

export { createBooking, getUserBookings, cancelBooking };