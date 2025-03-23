import PhotoDetail from '@/components/PhotoDetail';
import PhotoGallery from '@/components/PhotoGallery';
import SearchPage from '@/components/SearchPage';
import UploadPhoto from '@/components/UploadPhoto';

export const NavLinks = [
  {
    label: 'Upload Photo',
    href: '/',
    element: <UploadPhoto />,
    isNavLink: true,
  },
  {
    label: 'Photo Gallery',
    href: '/gallery',
    element: <PhotoGallery />,
    isNavLink: true,
  },
  {
    label: 'Photo Search',
    href: '/search',
    element: <SearchPage />,
    isNavLink: true,
  },
  {
    label: 'Photo Search',
    href: '/photo/:photoId',
    element: <PhotoDetail />,
    isNavLink: false,
  },
];

