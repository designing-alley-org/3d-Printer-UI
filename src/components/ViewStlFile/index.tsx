import React, { useRef, useState } from 'react';
import { StlViewer } from 'react-stl-viewer';
import './styles.css';
interface ViewModelStlProps {
  fileUrl: string;
}

const ViewModelStl: React.FC<ViewModelStlProps> = ({ fileUrl}) => {
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#808080');
  const viewerRef = useRef(null);

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };
  const handleFinishLoading = (dimensions: any) => {
  
    const height = Math.floor(dimensions.height);
    const width = Math.floor(dimensions.width);
    const length = Math.floor(dimensions.length);

    console.log('height: ',height,'widht :', width,'length :', length);
    console.log('STL Model Loaded with dimensions:', dimensions);

    setLoading(false);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      {loading && (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <svg viewBox="25 25 50 50">
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
        modelProps={{ scale: zoom, color }}
        ref={viewerRef}
      />

      {/* <div className="absolute bottom-4 right-4 flex space-x-2">
        <button onClick={handleZoomIn} className="zoom-btn">
          +
        </button>
        <button onClick={handleZoomOut} className="zoom-btn">
          -
        </button>
      </div> */}

      {/* <div className="absolute top-4 left-4">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="border rounded p-1"
          title="Pick a color"
        />
      </div> */}
    </div>
  );
};

export default ViewModelStl;
