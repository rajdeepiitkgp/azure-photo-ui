import { useState } from 'react';
import { uploadPhoto } from '@/services/api';

const UploadPhoto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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
      if (error instanceof Error) {
        setMessage('Error uploading photo.' + error.message);
      } else {
        setMessage('An Unexpected error occured.');
      }
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

