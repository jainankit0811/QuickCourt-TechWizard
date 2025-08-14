import Booking from '../models/Booking.js';
import Court from '../models/Court.js';
import Facility from '../models/Facility.js';
import User from '../models/User.js';

const getOwnerCourtIds = async (userId) => {
  const facilities = await Facility.find({ owner: userId, status: 'approved' });
  const facilityIds = facilities.map(f => f._id);
  const courts = await Court.find({ facility: { $in: facilityIds } });
  return courts.map(c => c._id);
};

const getOwnerDashboard = async (userId) => {
  const courtIds = await getOwnerCourtIds(userId);

  const totalBookings = await Booking.countDocuments({ court: { $in: courtIds } });
  const activeCourts = courtIds.length;
  const earnings = (await Booking.aggregate([
    { $match: { court: { $in: courtIds } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]))[0]?.total || 0;

  const trends = await Booking.aggregate([
    { $match: { court: { $in: courtIds }, date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const earningsSummary = await Booking.aggregate([
    { $match: { court: { $in: courtIds } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$date' } }, total: { $sum: '$totalPrice' } } },
    { $sort: { _id: 1 } },
  ]);

  const peakHours = await Booking.aggregate([
    { $match: { court: { $in: courtIds } } },
    { $group: { _id: { $substr: ['$startTime', 0, 2] }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  return { totalBookings, activeCourts, earnings, trends, earningsSummary, peakHours };
};

const getAdminDashboard = async () => {
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalOwners = await User.countDocuments({ role: 'facility_owner' });
  const totalBookings = await Booking.countDocuments();
  const approvedFacilities = await Facility.find({ status: 'approved' }).select('_id');
  const activeCourts = await Court.countDocuments({ facility: { $in: approvedFacilities.map(f => f._id) } });

  const bookingActivity = await Booking.aggregate([
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const userRegistrations = await User.aggregate([
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const facilityApprovals = await Facility.aggregate([
    { $match: { status: 'approved' } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const mostActiveSports = await Booking.aggregate([
    { $lookup: { from: 'courts', localField: 'court', foreignField: '_id', as: 'court' } },
    { $unwind: '$court' },
    { $group: { _id: '$court.sportType', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const earnings = (await Booking.aggregate([
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]))[0]?.total || 0;

  return { totalUsers, totalOwners, totalBookings, activeCourts, bookingActivity, userRegistrations, facilityApprovals, mostActiveSports, earnings };
};

export { getOwnerDashboard, getAdminDashboard };