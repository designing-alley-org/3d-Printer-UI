import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadStlCardFile from './UploadStlCardFile';
import * as styles from './styles'; // Import styles as 'styles'
import uploadIcon from '../../../assets/icons/upload2.svg';

interface UploadStlCardProps {}

const UploadStlCard: React.FC<UploadStlCardProps> = () => {
  const [selectedUnit, setSelectedUnit] = useState<'MM' | 'IN'>('MM'); // Unit selection state

  const handleUnitClick = (unit: 'MM' | 'IN') => {
    setSelectedUnit(unit);
  };

  return (
    <Box>
      <Typography sx={styles.infoText}>
        Set the required quantities for each file and if their sizes appear too
        small, change the unit of measurement to inches. <br />
        Click on 3D Viewer for a 360° preview of your files.
      </Typography>
      <Box sx={styles.unitContainer}>
        <Box sx={styles.unitSection}>
          <Typography sx={styles.unitText}>Unit of Measurement</Typography>
          <Button
            onClick={() => handleUnitClick('MM')}
            sx={{
              ...styles.unitButton,
              ...(selectedUnit === 'MM' && styles.activeButton),
            }}
          >
            MM
          </Button>
          <Button
            onClick={() => handleUnitClick('IN')}
            sx={{
              ...styles.unitButton,
              ...(selectedUnit === 'IN' && styles.activeButton),
            }}
          >
            IN
          </Button>
        </Box>
        <Box sx={styles.fileCountSection}>
          <Typography sx={styles.fileText}>Files</Typography>
          <Box sx={styles.filesBox}>
            <Typography sx={styles.fileBoxText}>5</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={styles.fileUploadContainer}>
          <Box sx={styles.uploadBox}>
            {/* Icon centered within the box */}
            <img
              src={uploadIcon}
              alt={`Upload`}
              style={styles.uploadIcon as React.CSSProperties}
            />
            <input
              type="file"
              style={styles.hiddenInput as React.CSSProperties}
            />
          </Box>
          <Typography sx={styles.uploadText}>Upload STL Files</Typography>
        </Box>
        <Box sx={styles.fileCardContainer}>
          <UploadStlCardFile />
          <UploadStlCardFile />
          <UploadStlCardFile />
          <UploadStlCardFile />
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCard;
