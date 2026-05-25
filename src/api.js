import axios from 'axios';

const API = axios.create({ baseURL: 'https://brain-center-backend-sahk.onrender.com/api' });

export const fetchUnits = () => API.get('/units');
export const addUnit = (unitData) => API.post('/units/add', unitData);