import { useState } from 'react';
import { searchPhotos } from '@/services/api';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { PhotoMetadata } from '@/types/PhotoMetadata';

const sanitizeTag = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '')
    .trim();

const SearchPage = () => {
  const [inputTag, setInputTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addTag = () => {
    const sanitizedTag = sanitizeTag(inputTag);
    if (!sanitizedTag || tags.includes(sanitizedTag)) return;

    setTags((prevTags) => [...prevTags, sanitizedTag]);
    setInputTag('');
  };

  const removeTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const editTag = (tag: string) => {
    setInputTag(tag);
    removeTag(tag);
  };

  const handleSearch = async (searchTags: string[] | null) => {
    if (!searchTags) searchTags = tags;
    if (searchTags.length === 0) {
      toast.warning('Please add at least one tag.');
      return;
    }

    const searchQuery = searchTags.join(',');
    setLoading(true);
    setError(null);

    try {
      const data = await searchPhotos(searchQuery);
      setPhotos(data);
      if (data.length === 0) {
        toast.info('No results found.');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to fetch photos. Please try again.');
      toast.error('Failed to fetch photos.');
    } finally {
      setLoading(false);
    }
  };

  const addTagFromResults = (tag: string) => {
    if (!(tags.length === 1 && tags[0] === tag)) {
      setTags([tag]);
      handleSearch([tag]);
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-4 space-y-6 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-semibold text-center'>Search Photos</h1>
      <div className='flex flex-col gap-4 max-w-lg mx-auto'>
        <div className='flex items-center border border-input rounded-md p-2'>
          <Input
            type='text'
            placeholder='Enter a tag...'
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            className='flex-1 border-none outline-none focus:ring-0'
          />
          <Button onClick={addTag} size='sm' className='ml-2 cursor-pointer'>
            <Plus className='w-5 h-5' />
          </Button>
        </div>

        {tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <div
                key={tag}
                className='group relative flex items-center bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-all'
                onClick={() => editTag(tag)}
              >
                {tag}
                <div
                  className='absolute -top-2 -right-2 bg-background rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                >
                  <X className='w-3 h-3 text-muted-foreground hover:text-foreground cursor-pointer' />
                </div>
              </div>
            ))}
          </div>
        )}

        <Button onClick={() => handleSearch(null)} disabled={tags.length === 0}>
          Search
        </Button>
      </div>

      {error && (
        <div className='text-center space-y-4'>
          <p className='text-destructive'>{error}</p>
          <Button variant='outline' onClick={() => handleSearch(null)}>
            Retry
          </Button>
        </div>
      )}

      {loading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className='aspect-square w-full rounded-md animate-pulse bg-muted'
            />
          ))}
        </div>
      )}

      {!loading && !error && photos.length === 0 && (
        <div className='flex flex-col items-center justify-center text-muted-foreground'>
          <p className='text-lg font-medium'>No photos found.</p>
        </div>
      )}

      {!loading && !error && photos.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {photos.map((photo) => (
            <Card
              key={photo.PhotoId}
              className='group overflow-hidden rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer'
              onClick={() => navigate(`/photo/${photo.PhotoId}`)}
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={photo.PhotoUrl}
                  alt={photo.Caption}
                  className='object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-90'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium'>
                  View Details
                </div>
              </AspectRatio>
              <div className='p-2'>
                <p className='text-sm font-semibold capitalize'>
                  {photo.Caption}
                </p>
                <div className='flex flex-wrap gap-1 mt-5'>
                  {photo.Tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        addTagFromResults(tag);
                      }}
                      className='cursor-pointer bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs hover:bg-foreground hover:text-background transition-all'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

