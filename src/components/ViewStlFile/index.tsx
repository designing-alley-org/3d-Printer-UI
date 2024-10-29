import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StlViewer } from 'react-stl-viewer';
import './styles.css';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface ViewModelStlProps {
  fileUrl: string;
  onDimensionsCalculated?: (dimensions: ModelDimensions) => void;
}

const ViewModelStl: React.FC<ViewModelStlProps> = ({ fileUrl, onDimensionsCalculated }) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#808080');
  const viewerRef = useRef(null);

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const handleFinishLoading = useCallback((dimensions: any) => {
    setLoading(false);
    
    if (onDimensionsCalculated) {
      const modelDimensions: ModelDimensions = {
        height: (dimensions.height).toFixed(2),
        width: (dimensions.width).toFixed(2),
        length: (dimensions.length).toFixed(2)
      };
      onDimensionsCalculated(modelDimensions);
    }
  }, [onDimensionsCalculated]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  // Cleanup on unmount or when fileUrl changes
  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, [fileUrl]);

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      {loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1
        }}>
          <svg viewBox="25 25 50 50" style={{ width: '48px', height: '48px' }}>
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      )}
      <StlViewer
        style={style}
        orbitControls
        shadows
        url={fileUrl}
        onFinishLoading={handleFinishLoading}
        modelProps={{ 
          color,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
        }}
        ref={viewerRef}
      />
    </div>
  );
};

export default ViewModelStl;