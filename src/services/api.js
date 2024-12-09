import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadPhoto = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchPhotos = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/photos`);
  return response.data;
};

export const searchPhotoes = async (searchQuery) => {
  const response = await axios.get(`/api/photos/search?tags=${searchQuery}`);
  return response.data;
};

