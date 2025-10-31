import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Switch,
} from '@mui/material';
import ResponsiveModal from './ResponsiveModal';
import STLViewer from '../STLViewer';
import * as THREE from 'three';
import { ModelDimensions } from '../../types/uploadFiles';

interface STLViewerModalProps {
  open: boolean;
  onClose: () => void;
  fileUrl?: string;
  isDownloading: boolean;
  downloadProgress: number;
  stlGeometry: THREE.BufferGeometry | null;
  error: string | null;
  color: string;
  fileName: string;
  dimensions: ModelDimensions;
}

const STLViewerModal: React.FC<STLViewerModalProps> = ({
  open,
  color = '#c0c0c0 ',
  stlGeometry,
  isDownloading,
  downloadProgress,
  error,
  onClose,
  fileName,
  dimensions,
}) => {
  const [showWireframe, setShowWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const isZoomNeeded = dimensions.height_mm < 2 && dimensions.length_mm < 2;

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title={`3D Model Viewer - ${fileName}`}
      maxWidth="md"
    >
      <Box
        sx={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}
      >
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
          <Box
            sx={{
              flex: 1,
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mb={2}
              px={2}
            >
              <Box display="flex" alignItems="center" width="100%">
                <Typography variant="body2">Show wireframe</Typography>
                <Switch
                  checked={showWireframe}
                  onChange={(e) => setShowWireframe(e.target.checked)}
                  color="primary"
                  inputProps={{ 'aria-label': 'Show wireframe' }}
                />
              </Box>
              <Switch
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
                color="primary"
                inputProps={{ 'aria-label': 'Auto Rotate' }}
              />
              <Typography variant="body2"> Rotate</Typography>
            </Box>
            <STLViewer
              color={color}
              geometry={stlGeometry}
              size={600}
              showWireframe={showWireframe}
              enableControls={true}
              autoRotate={autoRotate}
              defaultZoom={isZoomNeeded ? 1 : 75}
            />
          </Box>
        )}

        {!isDownloading && !stlGeometry && !error && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1">Ready to load 3D model...</Typography>
          </Box>
        )}
      </Box>
    </ResponsiveModal>
  );
};

export default STLViewerModal;
