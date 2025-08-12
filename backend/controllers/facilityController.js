import {
  createFacility as createFacilityService,
  getAllVenues as getAllVenuesService,
  getVenueById as getVenueByIdService,
  updateFacility as updateFacilityService,
  approveFacility as approveFacilityService
} from '../services/facility.service.js';

import { body, param, validationResult } from 'express-validator';
import upload from '../middlewares/multerMiddleware.js';

const createFacility = [
  upload.array('photos', 5),
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const photos = req.files ? await Promise.all(req.files.map(file => uploadImage(file.path))) : [];
      const facility = await createFacilityService({ ...req.body, photos }, req.user._id);
      res.status(201).json(facility);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const getAllVenues = async (req, res) => {
  try {
    const venues = await getAllVenuesService(req.query);
    res.status(200).json(venues);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVenueById = [
  param('id').isMongoId().withMessage('Invalid facility ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const venue = await getVenueByIdService(req.params.id);
      res.status(200).json(venue);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const updateFacility = [
  upload.array('photos', 5),
  param('id').isMongoId().withMessage('Invalid facility ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const photos = req.files ? await Promise.all(req.files.map(file => uploadImage(file.path))) : undefined;
      const facility = await updateFacilityService(req.params.id, { ...req.body, photos }, req.user._id);
      res.status(200).json(facility);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const approveFacility = [
  param('id').isMongoId().withMessage('Invalid facility ID'),
  body('status').isIn(['approved', 'rejected']).withMessage('Invalid status'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { status, comments } = req.body;
      const facility = await approveFacilityService(req.params.id, status, comments);
      res.status(200).json(facility);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];


export { createFacility, getAllVenues, getVenueById, updateFacility, approveFacility };