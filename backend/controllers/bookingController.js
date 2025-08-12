import { body, param, validationResult } from 'express-validator';

const validateAndCreateBooking = [
  body('courtId').isMongoId().withMessage('Invalid court ID'),
  body('date').isISO8601().toDate().withMessage('Invalid date'),
  body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid start time'),
  body('endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid end time'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const booking = await createBooking(req.body, req.user._id); // this is from bookingService
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

const getUserBookings = async (req, res) => {
  try {
    const bookings = await getUserBookings(req.user._id);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = [
  param('id').isMongoId().withMessage('Invalid booking ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    try {
      const booking = await cancelBooking(req.params.id, req.user._id);
      res.status(200).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

export { validateAndCreateBooking as createBooking, getUserBookings, cancelBooking };