import { useRef, useState } from 'react';
import { uploadPhoto } from '@/services/api';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';

const UploadPhoto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    } else {
      toast.error('Please select a valid image file');
    }
  };
  const clearPhoto = () => {
    setFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleUpload = async () => {
    if (!file) {
      toast.warning('No file selected. Please select an image to upload.');
      return;
    }
    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('photo', file);
      await uploadPhoto(formData, (percent) => {
        setProgress(percent);
      });
      toast.success(`Photo ${file.name} uploaded successfully!`);
      clearPhoto();
    } catch (error) {
      toast.error('Upload dailed. Please try again', {
        action: {
          label: 'Retry',
          onClick: () => handleUpload(),
        },
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-6 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-semibold text-center'>Upload Your Photo</h1>

      <div className='w-full max-w-md space-y-4'>
        <Input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          disabled={isUploading}
          ref={fileInputRef}
        />

        {previewUrl ? (
          <div className='relative w-full aspect-video border border-dashed border-muted-foreground rounded-md flex items-center justify-center overflow-hidden bg-muted'>
            <img
              src={previewUrl}
              alt='Preview'
              className='object-cover w-full h-full'
            />
            <button
              onClick={clearPhoto}
              className='absolute top-2 right-2 bg-foreground p-2 rounded-full shadow-md cursor-pointer hover:bg-foreground/70 focus:outline-none'
            >
              <X className='w-5 h-5 text-background' />
            </button>
          </div>
        ) : (
          <Skeleton className='w-full aspect-video rounded-md' />
        )}
        {isUploading && <Progress value={progress} className='w-full h-2' />}
        <Button
          onClick={handleUpload}
          disabled={isUploading || !file}
          className='w-full py-6 text-base cursor-pointer'
        >
          {isUploading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Uploading...
            </>
          ) : (
            'Upload'
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadPhoto;

