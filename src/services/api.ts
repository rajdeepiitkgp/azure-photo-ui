import axios from 'axios';
import { PhotoMetadata } from '@/types/PhotoMetadata';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadPhoto = async (
  formData: FormData,
  onProgress?: (percent: number) => void
) => {
  const response = await axios.post<any>(
    `${API_BASE_URL}/api/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) onProgress(percent);
      },
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

