import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET /api/bookings/booking-routes?search=&status=
router.get('/booking-routes', async (req, res) => {
    try {
        const { search, status } = req.query;

        const matchStage = {};
        if (status && status !== 'All') {
            matchStage.status = status.toLowerCase();
        }

        const pipeline = [
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $lookup: { from: 'courts', localField: 'court', foreignField: '_id', as: 'court' } },
            { $unwind: '$court' },
            { $lookup: { from: 'facilities', localField: 'court.facility', foreignField: '_id', as: 'facility' } },
            { $unwind: '$facility' },
            {
                $addFields: {
                    bookingId: { $toString: '$_id' },
                    userName: { $ifNull: ['$user.fullName', '$user.email'] },
                    userEmail: '$user.email',
                    courtName: '$court.name',
                    facilityName: '$facility.name',
                    timeRange: { $concat: ['$startTime', ' - ', '$endTime'] },
                    statusTitle: { $concat: [{ $toUpper: { $substrCP: ['$status', 0, 1] } }, { $substrCP: ['$status', 1, { $strLenCP: '$status' }] }] },
                    price: '$totalPrice',
                    paymentStatus: { $literal: 'Paid' }
                }
            },
        ];

        if (search) {
            const regex = new RegExp(search, 'i');
            pipeline.push({
                $match: {
                    $or: [
                        { bookingId: regex },
                        { userName: regex },
                        { userEmail: regex },
                        { courtName: regex },
                        { facilityName: regex },
                        { timeRange: regex },
                    ]
                }
            });
        }

        pipeline.push({
            $project: {
                _id: 0,
                id: '$bookingId',
                bookingId: 1,
                date: 1,
                userName: 1,
                userEmail: 1,
                courtName: 1,
                facility: '$facilityName',
                time: '$timeRange',
                status: '$statusTitle',
                price: 1,
                paymentStatus: 1,
            }
        });

        const result = await Booking.aggregate(pipeline);
        return res.json(result);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default router;
