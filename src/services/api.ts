import axios from 'axios';
import { PhotoMetadata } from '@/types/PhotoMetadata';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadPhoto = async (formData: FormData) => {
  const response = await axios.post<any>(
    `${API_BASE_URL}/api/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const fetchPhotos = async () => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/api/photos`);
  return response.data;
};

export const searchPhotos = async (searchQuery: string) => {
  const response = await axios.get<PhotoMetadata[]>(
    `${API_BASE_URL}/api/photos/search?tags=${searchQuery}`
  );
  return response.data;
};

