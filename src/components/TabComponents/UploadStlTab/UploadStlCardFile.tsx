import React, { useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import * as styles from './UploadStlCardFileStyle'; // Import styles
import ViewerStlModel from './ViewerStlModel'; // Import the 3D Viewer popup component
import cross from '../../../assets/icons/cross.svg';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';

const UploadStlCardFile: React.FC = () => {
  const [isViewerOpen, setViewerOpen] = useState(false); // Popup state

  const handleViewerOpen = () => {
    setViewerOpen(true); // Open popup
  };

  const handleViewerClose = () => {
    setViewerOpen(false); // Close popup
  };

  // For testing
  const testFor = () => {
    alert('press');
  };

  return (
    <>
      <Box sx={styles.container}>
        {/* First Box with View and 3D Viewer */}
        <Box sx={styles.viewBox}>
          <Box sx={styles.viewContent}>View</Box>
          <Button sx={styles.viewerButton} onClick={handleViewerOpen}>
            <Typography sx={styles.viewerButtonText}>3D VIEWER</Typography>
          </Button>
        </Box>

        {/* Second Box with STL file info */}
        <Box sx={styles.infoBox}>
          <Typography sx={styles.fileName}>Final 10000.stl</Typography>
          <Box sx={{ display: 'flex', padding: '1rem 0' }}>
            <Typography sx={styles.sizeLabel}>Size</Typography>
            <Typography sx={styles.sizeValue}>
              100mm x 120 mm x 320 mm
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={styles.progressBar}
          />
        </Box>

        {/* Third Box for Quantity */}
        <Box sx={styles.quantityBox}>
          <Box sx={styles.quantityHeader}>
            <Typography sx={styles.fileName}>Quantity</Typography>
            <ButtonIcon
              width="4rem"
              height="3rem"
              svgPath={cross}
              onClick={testFor}
            />
          </Box>
          <Box sx={styles.quantityValueBox}>
            <Typography sx={styles.quantityValue}>1</Typography>
          </Box>
        </Box>
      </Box>

      {/* Viewer popup */}
      <ViewerStlModel
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        fileName="Final 10000.stl" // Pass the file name
      />
    </>
  );
};

export default UploadStlCardFile;
