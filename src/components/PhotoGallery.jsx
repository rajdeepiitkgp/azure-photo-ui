import { useEffect, useState } from 'react';
import { fetchPhotos } from '../services/api';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const photoUrls = await fetchPhotos();
        setPhotos(photoUrls);
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };
    getPhotos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Photo ${index + 1}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
