import { useState } from 'react';
import { searchPhotos } from '../services/api';
import './SearchPage.css';
import { PhotoMetadata } from '../types/PhotoMetadata';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [error, setError] = useState('');

  const searchPhotosFromApi = async () => {
    setError('');
    try {
      const data = await searchPhotos(searchQuery);
      setPhotos(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An Unexpected error occured.');
      }
      setPhotos([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchPhotosFromApi();
    }
  };

  return (
    <div className='search-page'>
      <h1>Search Photos by Tags</h1>
      <input
        type='text'
        placeholder='Enter tags (comma-separated)'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className='search-box'
      />
      <div className='error-message'>{error && <p>{error}</p>}</div>
      <div className='photo-results'>
        {photos.length > 0 ? (
          <ul>
            {photos.map((photo) => (
              <li key={photo.PhotoId}>
                <img src={photo.PhotoUrl} alt='Photo' />
                <p>Tags: {photo.Tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No photos to display.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

