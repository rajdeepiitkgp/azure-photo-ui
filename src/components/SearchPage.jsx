import { useState } from 'react';
import { searchPhotoes } from '../services/api';
import './SearchPage.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  const searchPhotos = async () => {
    setError('');
    try {
      const data = await searchPhotoes(searchQuery);
      setPhotos(data);
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPhotos();
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

