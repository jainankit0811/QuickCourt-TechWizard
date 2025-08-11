import axios from '../config/axios';

export const getFacilities = async () => {
    const res = await axios.get('/facilities');
    return res.data;
};

export const addFacility = async (facility) => {
    const res = await axios.post('/facilities', facility);
    return res.data;
};

export const updateFacility = async (id, facility) => {
    const res = await axios.put(`/facilities/${id}`, facility);
    return res.data;
};

export const deleteFacility = async (id) => {
    const res = await axios.delete(`/facilities/${id}`);
    return res.data;
};
