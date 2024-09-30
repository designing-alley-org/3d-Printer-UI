import React, { useState, useEffect } from 'react';
import ViewModelStl from './ViewModelStl';
import './layout.css';

const Layout: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [modelInfo, setModelInfo] = useState({
    name: '',
    size: '',
    volume: '',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const fileURL = URL.createObjectURL(uploadedFile);
      setFileUrl(fileURL);
      setModelInfo({
        name: uploadedFile.name,
        size: '100 x 100 x 100 mm',
        volume: '500 mm³', // Dummy volume
      });
    }
  };

  // Clean up the object
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  return (
    <div className="container">
      <div className="main-content">
        <div className="upload-section">
          {!file ? (
            <div className="upload-box">
              <input
                type="file"
                accept=".stl"
                onChange={handleFileUpload}
                className="file-input"
              />
              <p className="upload-text">
                Drop your STL file here or{' '}
                <span className="browse-link">browse your computer</span>
              </p>
            </div>
          ) : (
            <div className="viewer-box">
              <ViewModelStl fileUrl={fileUrl} />
            </div>
          )}
          {file && (
            <button className="upload-btn" onClick={() => setFile(null)}>
              Upload New STL
            </button>
          )}
        </div>

        <div className="form-section">
          {file && (
            <div className="model-info-box">
              <p className="model-info">Name: {modelInfo.name}</p>
              <p className="model-info">Size: {modelInfo.size}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
