// src/components/ViewStlFile/index.tsx

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StlViewer } from 'react-stl-viewer';
import { getFile } from '../../utils/indexedDB';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface ViewModelStlProps {
  fileUrl?: string;
  localBlobUrl?: string;
  onDimensionsCalculated?: (dimensions: ModelDimensions) => void;
  modelColor: string;
}

const ViewModelStl: React.FC<ViewModelStlProps> = ({
  fileUrl,
  localBlobUrl,
  onDimensionsCalculated,
  modelColor,
}) => {
  const [loading, setLoading] = useState(true);
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    const loadFile = async () => {
      if (localBlobUrl) {
        // Use the local blob URL directly
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
  }, [fileUrl, localBlobUrl]); // Removed fileBlobUrl from dependencies to prevent infinite loops

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
        <div className="loading-overlay">
          {/* Loading spinner or message */}
          Loading...
        </div>
      )}
      {fileBlobUrl && (
        <StlViewer
          style={style}
          orbitControls
          shadows
          url={fileBlobUrl}
          modelProps={{
            color: modelColor || '#808080',
          }}
          onFinishLoading={handleFinishLoading}
          ref={viewerRef}
        />
      )}
    </div>
  );
};

export default ViewModelStl;