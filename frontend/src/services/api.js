import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Savings Plan APIs
export const createSavingsPlan = async (planData) => {
  const response = await api.post('/plans', planData);
  return response.data;
};

export const getSavingsPlan = async (planCode) => {
  const response = await api.get(`/plans/${planCode}`);
  return response.data;
};

export const addContribution = async (planCode, contributionData) => {
  const response = await api.post(`/plans/${planCode}/contributions`, contributionData);
  return response.data;
};

export const getContributions = async (planCode) => {
  const response = await api.get(`/plans/${planCode}/contributions`);
  return response.data;
};

export default api;
