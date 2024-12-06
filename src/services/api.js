import axios from 'axios';

const API_BASE_URL = 'https://<your-api-endpoint>'; // Replace with your backend API endpoint

export const uploadPhoto = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchPhotos = async () => {
  const response = await axios.get(`${API_BASE_URL}/photos`);
  return response.data; // Assumes the API returns an array of photo URLs
};
