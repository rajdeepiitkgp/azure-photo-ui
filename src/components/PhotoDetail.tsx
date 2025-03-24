import { deletePhotoById, getPhotoById } from '@/services/api';
import { PhotoMetadata } from '@/types/PhotoMetadata';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { Skeleton } from './ui/skeleton';

const PhotoDetail = () => {
  const { photoId } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<PhotoMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const fetchPhotoDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPhotoById(photoId!);
      setPhoto(data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Photo not found.');
        } else {
          setError(err.message || 'Failed to fetch photo details.');
        }
      } else {
        setError('An unexpected error occurred.');
      }

      toast.error('Failed to load photo details.');
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async () => {
    if (!photo) return;

    try {
      const link = document.createElement('a');
      link.href = photo.PhotoUrl;
      link.setAttribute('download', photo.PhotoUrl.split('/').slice(-1)[0]);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Photo downloaded!');
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Failed to download photo.');
    }
  };
  const handleDeleteConfirm = async () => {
    if (!photo) return;

    setDeleting(true);
    try {
      await deletePhotoById(photo.PhotoId);

      toast.success('Photo deleted!');
      setDeleteSuccess(true);

      setTimeout(() => {
        setDeleteModalOpen(false);
        navigate('/gallery');
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    fetchPhotoDetails();
  }, [photoId]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-6 sm:px-6 lg:px-8'>
      {loading && (
        <div className='w-full max-w-2xl space-y-4'>
          <Skeleton className='aspect-video w-full rounded-md' />
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-4 w-3/4' />
          <div className='flex gap-4'>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-24' />
          </div>
        </div>
      )}

      {error && (
        <div className='text-center space-y-4'>
          <p className='text-destructive text-lg font-semibold'>{error}</p>
          <Button variant='outline' onClick={fetchPhotoDetails}>
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && photo && (
        <div className='w-full max-w-2xl space-y-6'>
          <Card className='overflow-hidden rounded-lg shadow-md'>
            <AspectRatio ratio={16 / 9}>
              <img
                src={photo.PhotoUrl}
                alt={`Photo ${photo.PhotoId}`}
                className='object-cover w-full h-full'
              />
            </AspectRatio>
          </Card>

          <div className='space-y-2'>
            <h2 className='text-xl font-semibold text-center mb-10 capitalize'>
              {photo.Caption}
            </h2>
            <div className='flex flex-wrap gap-2 justify-center'>
              {photo.Tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Button onClick={handleDownload} className='flex-1 text-base py-6'>
              Download
            </Button>

            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
              <DialogTrigger asChild>
                <Button variant='destructive' className='flex-1 text-base py-6'>
                  Delete
                </Button>
              </DialogTrigger>

              <DialogContent>
                {!deleteSuccess ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Photo Deletion Confirmation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this photo? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        onClick={() => setDeleteModalOpen(false)}
                        disabled={deleting}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant='destructive'
                        onClick={handleDeleteConfirm}
                        disabled={deleting}
                      >
                        {deleting ? 'Deleting...' : 'Delete'}
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className='flex flex-col items-center justify-center space-y-4 py-8'>
                    <CheckCircle className='h-16 w-16 text-green-500 animate-scale-in' />
                    <p className='text-lg font-semibold text-center'>
                      Photo deleted successfully!
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;

