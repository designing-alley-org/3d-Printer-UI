import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeFile, setActiveFile } from '../../../store/stlFile/actions';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewerStlModel from './ViewerStlModel';
import * as styles from './UploadStlCardFileStyle';
import cross from '../../../assets/icons/cross.svg';
import ViewModelStl from '../../ViewStlFile/ViewModelStl';

interface UploadStlCardFileProps {
  file: {
    id: string;
    name: string;
    size: string;
    progress: number;
    file: File;
  };
}

const UploadStlCardFile: React.FC<UploadStlCardFileProps> = React.memo(
  ({ file }) => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const dispatch = useDispatch();

    const handleViewerOpen = () => {
      setViewerOpen(true);
      dispatch(setActiveFile(file.id));
    };
    const handleViewerClose = () => setViewerOpen(false);
    const handleRemove = () => dispatch(removeFile(file.id));

    return (
      <>
        <Box sx={styles.container}>
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
              {/* Priview Stl file */}
              <ViewModelStl fileUrl={URL.createObjectURL(file.file)} />
            </Box>
            <Button sx={styles.viewerButton} onClick={handleViewerOpen}>
              <Typography sx={styles.viewerButtonText}>3D VIEWER</Typography>
            </Button>
          </Box>
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
          <Box sx={styles.quantityBox}>
            <Box sx={styles.quantityHeader}>
              <Typography sx={styles.fileName}>Quantity</Typography>
              <ButtonIcon
                width="4rem"
                height="3rem"
                svgPath={cross}
                onClick={handleRemove}
              />
            </Box>
            <Box sx={styles.quantityValueBox}>
              <Typography sx={styles.quantityValue}>1</Typography>
            </Box>
          </Box>
        </Box>
        {/* POP up STl */}
        <ViewerStlModel
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          fileName={file.name}
          data={file}
        />
      </>
    );
  }
);

export default UploadStlCardFile;
