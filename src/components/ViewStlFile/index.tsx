import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StlViewer } from 'react-stl-viewer';
import { getFile } from '../../utils/indexedDB';
import { Loader } from 'lucide-react';
import { useMediaQuery } from '@mui/material';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface ViewModelStlProps {
  fileUrl?: string;
  localBlobUrl?: string;
  onDimensionsCalculated?: (dimensions: ModelDimensions) => void;
  modelColor?: string;
}

const DEFAULT_COLOR = '#808080';

const ViewModelStl: React.FC<ViewModelStlProps> = ({
  fileUrl,
  localBlobUrl,
  onDimensionsCalculated,
  modelColor,
}) => {
  const [loading, setLoading] = useState(true);
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
  const viewerRef = useRef(null);
  const isSmallScreen = useMediaQuery('(max-width:762px)');
  useEffect(() => {
    const loadFile = async () => {
      if (localBlobUrl) {
        setFileBlobUrl(localBlobUrl);
        setLoading(false);
      } else if (fileUrl) {
        try {
          const blob = await getFile(fileUrl);
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            setFileBlobUrl(blobUrl);
          } else {
            console.error('File not found in IndexedDB');
          }
        } catch (error) {
          console.error('Error retrieving file from IndexedDB:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadFile();

    return () => {
      if (fileBlobUrl && !localBlobUrl) {
        URL.revokeObjectURL(fileBlobUrl);
      }
    };
  }, [fileUrl]);

  const handleFinishLoading = useCallback(
    (dimensions: any) => {
      setLoading(false);
      if (onDimensionsCalculated) {
        const modelDimensions: ModelDimensions = {
          height: +dimensions.height.toFixed(2),
          width: +dimensions.width.toFixed(2),
          length: +dimensions.length.toFixed(2),
        };
        onDimensionsCalculated(modelDimensions);
      }
    },
    [onDimensionsCalculated]
  );

  const style = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="relative" style={style}>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
          <Loader color='#1e6fff' size={isSmallScreen ? 30 : 50} />
        </div>
      )}
      {fileBlobUrl && (
        <StlViewer
          style={style}
          orbitControls
          shadows
          url={fileBlobUrl}
          modelProps={{
            color: modelColor || DEFAULT_COLOR,
          }}
          onFinishLoading={handleFinishLoading}
          ref={viewerRef}
        />
      )}
    </div>
  );
};

export default ViewModelStl;