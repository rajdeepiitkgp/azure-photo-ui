import PhotoDetail from '@/components/PhotoDetail';
import PhotoGallery from '@/components/PhotoGallery';
import SearchPhotos from '@/components/SearchPhotos';
import UploadPhoto from '@/components/UploadPhoto';
import { GalleryHorizontal, Search, Upload } from 'lucide-react';

export const NavLinks = [
  {
    label: 'Upload Photo',
    href: '/',
    element: <UploadPhoto />,
    isNavLink: true,
    icon: (props: any) => <Upload {...props} />,
  },
  {
    label: 'Photo Gallery',
    href: '/gallery',
    element: <PhotoGallery />,
    isNavLink: true,
    icon: (props: any) => <GalleryHorizontal {...props} />,
  },
  {
    label: 'Photo Search',
    href: '/search',
    element: <SearchPhotos />,
    isNavLink: true,
    icon: (props: any) => <Search {...props} />,
  },
  {
    label: 'Photo Search',
    href: '/photo/:photoId',
    element: <PhotoDetail />,
    isNavLink: false,
    icon: null,
  },
];

