// Facility Controller
const Facility = require('../models/facility.model');

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addFacility = async (req, res) => {
    try {
        const facility = await Facility.create(req.body);
        res.json(facility);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateFacility = async (req, res) => {
    try {
        const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(facility);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFacility = async (req, res) => {
    try {
        await Facility.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
