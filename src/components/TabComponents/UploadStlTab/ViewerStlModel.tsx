import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import * as styles from './ViewerStlModelStyles'; // Import your CSS styles here
import arrow_left from '../../../assets/icons/arrow_left.svg';
import arrow_right from '../../../assets/icons/arrow_right.svg';
import cross from '../../../assets/icons/cross.svg';

interface ViewerStlModelProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

const ViewerStlModel: React.FC<ViewerStlModelProps> = ({
  isOpen,
  onClose,
  fileName,
}) => {
  if (!isOpen) return null; // Return null if the popup is not open

  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.modalContent}>
        <Box sx={styles.closeButton}>
          <ButtonIcon svgPath={cross} onClick={onClose} />
        </Box>

        <Typography sx={styles.modalTitle}>3D VIEWER</Typography>
        <Box sx={styles.viewerContent}>
          <Box sx={styles.viewModel}>
            {/* 3D Viewer Component logic goes here */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '80%',
              height: '15%',
            }}
          >
            <ButtonIcon svgPath={arrow_left} onClick={''} />
            <Typography sx={styles.fileName}>{fileName}</Typography>
            <ButtonIcon svgPath={arrow_right} onClick={''} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewerStlModel;
