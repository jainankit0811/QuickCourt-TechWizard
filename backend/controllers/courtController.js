// import {
//   blockTimeSlot as blockTimeSlotService
// } from '../services/courtService.js';
import {
  createCourtService,
  updateCourtService,
  blockTimeSlotService
} from '../services/courtService.js';
import TimeSlot from '../models/TimeSlot.js';
import { body, param, validationResult } from 'express-validator';

const createCourt = [
  body('name').notEmpty().withMessage('Name is required'),
  body('sportType').notEmpty().withMessage('Sport type is required'),
  body('pricePerHour').isFloat({ min: 0 }).withMessage('Invalid price'),
  body('facilityId').isMongoId().withMessage('Invalid facility ID'),
  async (req, res) => {
    console.log('Received createCourt request:', req.body);
    console.log('User ID:', req.user?._id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const court = await createCourtService(req.body, req.user._id);
      res.status(201).json(court);
    } catch (error) {
      console.error('createCourt error:', error.message);
      res.status(400).json({ message: error.message });
    }
  }
];


const updateCourt = [
  param('id').isMongoId().withMessage('Invalid court ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('sportType').optional().notEmpty().withMessage('Sport type cannot be empty'),
  body('pricePerHour').optional().isFloat({ min: 0 }).withMessage('Invalid price'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const court = await updateCourtService(req.params.id, req.body, req.user._id);
      res.status(200).json(court);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];


const blockTimeSlot = [
  param('courtId').isMongoId().withMessage('Invalid court ID'),
  body('date').isISO8601().toDate().withMessage('Invalid date'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format'),
  body('status').optional().isIn(['available', 'booked', 'maintenance']).withMessage('Invalid status'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const timeSlot = await blockTimeSlotService(req.params.courtId, req.body, req.user._id);
      res.status(201).json(timeSlot);
    } catch (error) {
      console.error('blockTimeSlot error:', error.message);
      res.status(400).json({ message: error.message });
    }
  }
];

const getTimeSlotsByCourt = [
  param('courtId').isMongoId().withMessage('Invalid court ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { courtId } = req.params;
      console.log('getTimeSlotsByCourt - courtId:', courtId);
      const timeSlots = await getTimeSlotsByCourtService(courtId);
      console.log('Found time slots:', timeSlots);
      res.status(200).json(timeSlots);
    } catch (error) {
      console.error('getTimeSlotsByCourt error:', error.message);
      res.status(400).json({ message: error.message });
    }
  }
];

// const getAllCourtsByFacilityPublic = async (req, res) => {
//   try {
//     const { facilityId } = req.params;
//     const facility = await Facility.findById(facilityId);
//     if (!facility || facility.status !== 'approved') {
//       throw new Error('Facility not found or not approved');
//     }
//     const courts = await Court.find({ facility: facilityId });
//     res.status(200).json(courts);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getTimeSlotsByCourtPublic = async (req, res) => {
//   try {
//     const { courtId } = req.params;
//     const court = await Court.findById(courtId).populate('facility');
//     if (!court || court.facility.status !== 'approved') {
//       throw new Error('Court not found or facility not approved');
//     }
//     const timeSlots = await TimeSlot.find({ court: courtId });
//     res.status(200).json(timeSlots);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


export { createCourt,blockTimeSlot, updateCourt, getTimeSlotsByCourt };