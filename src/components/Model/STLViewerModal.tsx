import React, { useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, LinearProgress } from '@mui/material';
import ResponsiveModal from './ResponsiveModal';
import STLViewer from '../STLViewer';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface STLViewerModalProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
}

const STLViewerModal: React.FC<STLViewerModalProps> = ({
  open,
  onClose,
  fileUrl,
  fileName
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [stlGeometry, setStlGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadAndParseSTL = useCallback(async (url: string) => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch STL file: ${response.status}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        if (total > 0) {
          const progress = (receivedLength / total) * 100;
          setDownloadProgress(Math.round(progress));
        }
      }

      // Combine chunks into single array buffer
      const arrayBuffer = new ArrayBuffer(receivedLength);
      const uint8Array = new Uint8Array(arrayBuffer);
      let position = 0;
      for (const chunk of chunks) {
        uint8Array.set(chunk, position);
        position += chunk.length;
      }

      // Parse the STL data
      const stlLoader = new STLLoader();
      const geometry = stlLoader.parse(arrayBuffer);
      
      setStlGeometry(geometry);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading/parsing STL file:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsDownloading(false);
    }
  }, []);

  const handleModalOpen = useCallback(() => {
    if (open && fileUrl && !stlGeometry && !isDownloading) {
      downloadAndParseSTL(fileUrl);
    }
  }, [open, fileUrl, stlGeometry, isDownloading, downloadAndParseSTL]);

  React.useEffect(() => {
    handleModalOpen();
  }, [handleModalOpen]);

  const handleClose = () => {
    setStlGeometry(null);
    setDownloadProgress(0);
    setError(null);
    onClose();
  };

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title={`3D Model Viewer - ${fileName}`}
      maxWidth="lg"
    >
      <Box sx={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        {error && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="error" variant="body1">
              Error loading STL file: {error}
            </Typography>
          </Box>
        )}
        
        {isDownloading && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Downloading STL file... {downloadProgress}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={downloadProgress} 
              sx={{ width: '100%', maxWidth: '400px', mx: 'auto' }}
            />
          </Box>
        )}
        
        {stlGeometry && !isDownloading && !error && (
          <Box sx={{ flex: 1, minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <STLViewer 
              geometry={stlGeometry}
              size={500}
              enableControls={true}
              autoRotate={false}
            />
          </Box>
        )}
        
        {!isDownloading && !stlGeometry && !error && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1">
              Ready to load 3D model...
            </Typography>
          </Box>
        )}
      </Box>
    </ResponsiveModal>
  );
};

export default STLViewerModal;
