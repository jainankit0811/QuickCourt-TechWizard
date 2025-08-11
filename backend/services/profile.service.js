// Profile Service
const Profile = require('../models/profile.model');

exports.getProfile = async () => {
    return await Profile.findOne();
};

exports.upsertProfile = async (data) => {
    let profile = await Profile.findOne();
    if (profile) {
        await Profile.updateOne({}, data);
        profile = await Profile.findOne();
    } else {
        profile = await Profile.create(data);
    }
    return profile;
};
