import axios from 'axios';

const API_BASE_URL = 'privacy';

const DEFAULT_TIMEOUT = 10000; // 10s

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/search`, { timeout: DEFAULT_TIMEOUT });
    return response.data;
  } catch (error: any) {
    console.error('API Error (fetchServices):', error?.message || error);
   
    return [];
  }
};

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
