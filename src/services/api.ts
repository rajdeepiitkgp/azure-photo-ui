import axios from 'axios';
import { PhotoMetadata } from '@/types/PhotoMetadata';
import { PhotoDetail } from '@/types/PhotoDetail';

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
/**
 *
 * @deprecated This method is deprecated. use fetchPhotosV2() instead
 */
export const fetchPhotos = async () => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/api/photos`);
  return response.data;
};

export const searchPhotos = async (searchQuery: string) => {
  const response = await axios.get<PhotoMetadata[]>(
    `${API_BASE_URL}/api/photos/search`,
    { params: { tags: searchQuery } }
  );
  return response.data;
};

export const fetchPhotosV2 = async () => {
  const response = await axios.get<PhotoDetail[]>(
    `${API_BASE_URL}/api/photosV2`
  );
  return response.data;
};

export const fetchPhotoById = async (id: string) => {
  const response = await axios.get<PhotoMetadata>(
    `${API_BASE_URL}/api/photosV2/search`,
    { params: { id } }
  );
  return response.data;
};

