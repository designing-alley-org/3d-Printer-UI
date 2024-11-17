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
  fileBlob?: Blob;
  onDimensionsCalculated?: (dimensions: ModelDimensions) => void;
  modelColor: string;
}

const ViewModelStl: React.FC<ViewModelStlProps> = ({
  fileUrl,
  fileBlob,
  onDimensionsCalculated,
  modelColor,
}) => {
  const [loading, setLoading] = useState(true);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const viewerRef = useRef(null);

  const style = {
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    let isMounted = true;
    let blobUrl: string | null = null;

    const loadFile = async () => {
      try {
        if (fileBlob) {
          // If fileBlob is provided, create an object URL
          blobUrl = URL.createObjectURL(fileBlob);
        } else if (fileUrl) {
          // If fileUrl is provided, retrieve the file from IndexedDB
          const blob = await getFile(fileUrl);
          if (blob) {
            blobUrl = URL.createObjectURL(blob);
          } else {
            console.error('File not found in IndexedDB');
          }
        }

        if (isMounted && blobUrl) {
          setObjectUrl(blobUrl);
        }
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };

    loadFile();

    return () => {
      isMounted = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [fileUrl, fileBlob]);

  const handleFinishLoading = useCallback(
    (dimensions: any) => {
      setLoading(false);
      if (onDimensionsCalculated) {
        const modelDimensions: ModelDimensions = {
          height: parseFloat(dimensions.height.toFixed(2)),
          width: parseFloat(dimensions.width.toFixed(2)),
          length: parseFloat(dimensions.length.toFixed(2)),
        };
        onDimensionsCalculated(modelDimensions);
      }
    },
    [onDimensionsCalculated]
  );

  return (
    <div style={style}>
      {loading && (
        <div className="loading-overlay">
          {/* Add your loading indicator here */}
        </div>
      )}
      {objectUrl && (
        <StlViewer
          style={style}
          url={objectUrl}
          modelProps={{ color: modelColor || '#808080' }}
          onFinishLoading={handleFinishLoading}
          ref={viewerRef}
        />
      )}
    </div>
  );
};

export default ViewModelStl;