import React from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import * as styles from './UploadStlCardFileStyle'; // Import styles

const UploadStlCardFile = () => {
  return (
    <Box sx={styles.container}>
      {/* First Box with View and 3D Viewer */}
      <Box sx={styles.viewBox}>
        <Box sx={styles.viewContent}>View</Box>
        <Button sx={styles.viewerButton}>
          <Typography sx={styles.viewerButtonText}>3D VIEWER</Typography>
        </Button>
      </Box>

      {/* Second Box with STL file info */}
      <Box sx={styles.infoBox}>
        <Typography sx={styles.fileName}>Final 10000.stl</Typography>
        <Box sx={{ display: 'flex', padding: '1rem 0' }}>
          <Typography sx={styles.sizeLabel}>Size</Typography>
          <Typography sx={styles.sizeValue}>100mm x 120 mm x 320 mm</Typography>
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
          <Button>x</Button>
        </Box>
        <Box sx={styles.quantityValueBox}>
          <Typography sx={styles.quantityValue}>1</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCardFile;
