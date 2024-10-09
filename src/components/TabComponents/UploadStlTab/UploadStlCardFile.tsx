import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeFile } from '../../../store/stlFile/actions'; // Action to remove file
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewerStlModel from './ViewerStlModel'; // The modal component for viewing 3D models
import * as styles from './UploadStlCardFileStyle'; // Your styles for the file card
import cross from '../../../assets/icons/cross.svg'; // Icon for removing the file
import ViewModelStl from '../../ViewStlFile/ViewModelStl'; // Your STL viewer component

interface UploadStlCardFileProps {
  file: {
    id: string;
    name: string;
    size: string;
    progress: number;
    data: Blob; // Assuming that the file data is stored as a Blob for STL rendering
  };
}

const UploadStlCardFile: React.FC<UploadStlCardFileProps> = React.memo(
  ({ file }) => {
    const [isViewerOpen, setViewerOpen] = useState(false); // Modal open/close state
    const dispatch = useDispatch();

    const handleViewerOpen = () => setViewerOpen(true);
    const handleViewerClose = () => setViewerOpen(false);
    const handleRemove = () => dispatch(removeFile(file.id)); // Dispatch remove action

    return (
      <>
        <Box sx={styles.container}>
          {/* View Box containing the 3D Viewer button */}
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
              {/* Placeholder for file preview, or later implementation */}
            </Box>
            <Button sx={styles.viewerButton} onClick={handleViewerOpen}>
              <Typography sx={styles.viewerButtonText}>3D VIEWER</Typography>
            </Button>
          </Box>

          {/* Info box containing file details */}
          <Box sx={styles.infoBox}>
            <Typography sx={styles.fileName}>{file.name}</Typography>
            <Box sx={{ display: 'flex', padding: '1rem 0' }}>
              <Typography sx={styles.sizeLabel}>Size</Typography>
              <Typography sx={styles.sizeValue}>{file.size}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={file.progress}
              sx={styles.progressBar}
            />
          </Box>

          {/* Quantity and remove button */}
          <Box sx={styles.quantityBox}>
            <Box sx={styles.quantityHeader}>
              <Typography sx={styles.fileName}>Quantity</Typography>
              <ButtonIcon
                width="4rem"
                height="3rem"
                svgPath={cross} // Cross icon for removing file
                onClick={handleRemove}
              />
            </Box>
            <Box sx={styles.quantityValueBox}>
              <Typography sx={styles.quantityValue}>1</Typography>
            </Box>
          </Box>
        </Box>

        {/* The modal popup for 3D Viewer */}
        <ViewerStlModel
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          fileName={file.name}
        />
      </>
    );
  }
);

export default UploadStlCardFile;
