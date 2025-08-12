import {
  createCourt as createCourtService,
  updateCourt as updateCourtService,
  blockTimeSlot as blockTimeSlotService
} from '../services/courtService.js';
import { body, param, validationResult } from 'express-validator';

const createCourt = [
  body('name').notEmpty().withMessage('Name is required'),
  body('sportType').notEmpty().withMessage('Sport type is required'),
  body('pricePerHour').isFloat({ min: 0 }).withMessage('Invalid price'),
  body('facilityId').isMongoId().withMessage('Invalid facility ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const court = await createCourtService(req.body, req.user._id);
      res.status(201).json(court);
    } catch (error) {
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
  body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid start time'),
  body('endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid end time'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const court = await blockTimeSlotService(req.params.courtId, req.body, req.user._id);
      res.status(200).json(court);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

export { createCourt, updateCourt, blockTimeSlot };