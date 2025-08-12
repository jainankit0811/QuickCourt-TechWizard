import axios from '../config/axios';

export const getCourts = async (params) => {
    const res = await axios.get('/courts', { params });
    return res.data;
};

export const createCourt = async (payload) => {
    const res = await axios.post('/courts', payload);
    return res.data;
};

export const updateCourt = async (id, payload) => {
    const res = await axios.put(`/courts/${id}`, payload);
    return res.data;
};

export const deleteCourt = async (id) => {
    const res = await axios.delete(`/courts/${id}`);
    return res.data;
};

export default { getCourts, createCourt, updateCourt, deleteCourt };
