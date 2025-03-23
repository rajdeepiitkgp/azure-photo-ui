import { useEffect, useState } from 'react';
import { fetchPhotosV2 } from '@/services/api';
import { PhotoDetail } from '@/types/PhotoDetail';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<PhotoDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const getPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      const photoUrls = await fetchPhotosV2();
      if (!Array.isArray(photoUrls)) {
        throw new Error('Unexpected API response. Expected an array.');
      }
      setPhotos(photoUrls);
    } catch (error: any) {
      console.error('Error fetching photos:', error);
      setError(error.message || 'An unexpected error occurred.');
      setPhotos([]);
      toast.error('Unable to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);
  const handlePhotoClick = (id: string) => {
    navigate(`/photo/${id}`);
  };
  return (
    <div className='flex flex-col min-h-screen p-4 space-y-4 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-semibold text-center'>Photo Gallery</h1>
      {error && (
        <div className='flex flex-col items-center justify-center py-12 space-y-4'>
          <p className='text-destructive text-sm font-medium'>{error}</p>
          <Button variant='outline' onClick={getPhotos}>
            Retry
          </Button>
        </div>
      )}
      {!error && loading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} className='aspect-video w-full rounded-md' />
          ))}
        </div>
      )}

      {!error && !loading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {photos.map((photo) => (
            <Card
              key={photo.PhotoId}
              className={cn(
                'relative group cursor-pointer overflow-hidden rounded-md shadow-md transition-transform duration-200 flex justify-center items-center',
                'hover:scale-105'
              )}
              onClick={() => handlePhotoClick(photo.PhotoId)}
            >
              <div className='aspect-video w-full bg-muted relative'>
                <img
                  src={photo.PhotoUrl}
                  alt={`Photo ${photo.PhotoId}`}
                  className='object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-90'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium'>
                  View Details
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;

