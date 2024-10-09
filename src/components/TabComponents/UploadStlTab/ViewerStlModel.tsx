import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFile } from '../../../store/stlFile/actions';
import { RootState } from '../../../store/store';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../ViewStlFile/ViewModelStl'; // Your STL viewer component
import arrow_left from '../../../assets/icons/arrow_left.svg';
import arrow_right from '../../../assets/icons/arrow_right.svg';
import cross from '../../../assets/icons/cross.svg';
import * as styles from './ViewerStlModelStyles';

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
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileState.files);
  const activeFileId = useSelector(
    (state: RootState) => state.fileState.activeFileId
  );
  const currentIndex = files.findIndex((file) => file.id === activeFileId);
  const activeFile = files[currentIndex];

  // Handle file navigation
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % files.length;
    dispatch(setActiveFile(files[nextIndex].id));
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + files.length) % files.length;
    dispatch(setActiveFile(files[previousIndex].id));
  };

  if (!isOpen) return null;

  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.modalContent}>
        <Box sx={styles.closeButton}>
          <ButtonIcon svgPath={cross} onClick={onClose} />
        </Box>

        <Typography sx={styles.modalTitle}>3D VIEWER</Typography>

        <Box sx={styles.viewerContent}>
          {/* STL File Viewer */}
          <Box sx={styles.viewModel}>
            {activeFile && activeFile.data && (
              <ViewModelStl fileUrl={URL.createObjectURL(activeFile.data)} />
            )}
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '80%',
              height: '15%',
            }}
          >
            <ButtonIcon svgPath={arrow_left} onClick={handlePrevious} />
            <Typography sx={styles.fileName}>{fileName}</Typography>
            <ButtonIcon svgPath={arrow_right} onClick={handleNext} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewerStlModel;
