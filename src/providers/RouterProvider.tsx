import PhotoGallery from '@/components/PhotoGallery';
import SearchPage from '@/components/SearchPage';
import UploadPhoto from '@/components/UploadPhoto';

export const NavLinks = [
  { label: 'Upload Photo', href: '/', element: <UploadPhoto /> },
  { label: 'Photo Gallery', href: '/gallery', element: <PhotoGallery /> },
  { label: 'Photo Search', href: '/search', element: <SearchPage /> },
];

