import { useParams } from 'react-router';

const PhotoDetail = () => {
  const params = useParams();
  return <div>PhotoDetail {params?.photoId}</div>;
};

export default PhotoDetail;
