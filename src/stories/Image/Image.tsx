import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ borderRadius: '10px', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          display: imageLoaded ? 'block' : 'none',
        }}
        className='image'
      />
    </div>
  );
};

export default Image;
