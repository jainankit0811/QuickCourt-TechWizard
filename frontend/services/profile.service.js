import axios from '../src/config/axios';

export const getProfile = async (userId) => {
    const res = await axios.get('/profile/owner-profile', { params: { userId } });
    return res.data;
};

export const upsertProfile = async (profile) => {
    const res = await axios.put('/profile/owner-profile', profile);
    return res.data;
};
