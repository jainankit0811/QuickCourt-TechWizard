// Facility Service
const Facility = require('../models/facility.model');

exports.getFacilities = async () => {
    return await Facility.find();
};

exports.addFacility = async (data) => {
    return await Facility.create(data);
};

exports.updateFacility = async (id, data) => {
    return await Facility.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteFacility = async (id) => {
    await Facility.findByIdAndDelete(id);
    return { success: true };
};
