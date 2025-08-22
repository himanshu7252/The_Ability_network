import axios from 'axios';

const API_BASE_URL = 'https://stg-api.abilitynetwork.in/api';

const DEFAULT_TIMEOUT = 10000; // 10s

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/search`, { timeout: DEFAULT_TIMEOUT });
    return response.data;
  } catch (error: any) {
    console.error('API Error (fetchServices):', error?.message || error);
    // Return empty array as a safe fallback so UI doesn't stay in loading state indefinitely
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