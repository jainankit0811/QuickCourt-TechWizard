// Profile Controller
const Profile = require('../models/profile.model');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.upsertProfile = async (req, res) => {
    try {
        const data = req.body;
        let profile = await Profile.findOne();
        if (profile) {
            await Profile.updateOne({}, data);
            profile = await Profile.findOne();
        } else {
            profile = await Profile.create(data);
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
