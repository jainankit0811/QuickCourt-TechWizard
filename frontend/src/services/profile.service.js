import axios from '../config/axios';

export const getProfile = async () => {
    const res = await axios.get('/profile');
    return res.data;
};

export const upsertProfile = async (profile) => {
    const res = await axios.post('/profile', profile);
    return res.data;
};
