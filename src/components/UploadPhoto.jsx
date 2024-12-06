import { useState } from 'react';
import { uploadPhoto } from '../services/api';

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await uploadPhoto(formData);
      setMessage('Photo uploaded successfully!');
      setFile(null);
    } catch (error) {
      setMessage('Error uploading photo.' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload a Photo</h1>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPhoto;

