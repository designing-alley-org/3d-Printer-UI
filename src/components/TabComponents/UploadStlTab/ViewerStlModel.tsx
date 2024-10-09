import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFile } from '../../../store/stlFile/actions';
import { RootState } from '../../../store/store';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../ViewStlFile/ViewModelStl';
import arrow_left from '../../../assets/icons/arrow_left.svg';
import arrow_right from '../../../assets/icons/arrow_right.svg';
import cross from '../../../assets/icons/cross.svg';
import * as styles from './ViewerStlModelStyles';

interface ViewerStlModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewerStlModel: React.FC<ViewerStlModelProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileState.files);
  const activeFileId = useSelector(
    (state: RootState) => state.fileState.activeFileId
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFile, setCurrentFile] = useState<{
    id: string;
    name: string;
    file: File;
  } | null>(null);

  useEffect(() => {
    const index = files.findIndex((file) => file.id === activeFileId);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentFile(files[index]);
    }
  }, [activeFileId, files]);

  const handleNext = () => {
    if (files.length > 0) {
      const nextIndex = (currentIndex + 1) % files.length;
      dispatch(setActiveFile(files[nextIndex].id));
    }
  };

  const handlePrevious = () => {
    if (files.length > 0) {
      const previousIndex = (currentIndex - 1 + files.length) % files.length;
      dispatch(setActiveFile(files[previousIndex].id));
    }
  };

  if (!isOpen || !currentFile) return null;

  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.modalContent}>
        <Box sx={styles.closeButton}>
          <ButtonIcon svgPath={cross} onClick={onClose} />
        </Box>
        <Typography sx={styles.modalTitle}>3D VIEWER</Typography>
        <Box sx={styles.viewerContent}>
          <Box sx={styles.viewModel}>
            <ViewModelStl fileUrl={URL.createObjectURL(currentFile.file)} />
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
            <ButtonIcon
              svgPath={arrow_left}
              onClick={handlePrevious}
              disabled={files.length <= 1}
            />
            <Typography sx={styles.fileName}>{currentFile.name}</Typography>
            <ButtonIcon
              svgPath={arrow_right}
              onClick={handleNext}
              disabled={files.length <= 1}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewerStlModel;
