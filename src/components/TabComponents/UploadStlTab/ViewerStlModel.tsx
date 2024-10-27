// ViewerStlModel.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../ViewStlFile/index';
import arrow_left from '../../../assets/icons/arrow_left.svg';
import arrow_right from '../../../assets/icons/arrow_right.svg';
import cross from '../../../assets/icons/cross.svg';
import * as styles from './ViewerStlModelStyles';

interface FileData {
  id: string;
  name: string;
  size: string;
  progress: number;
  file: File;
  quantity: number;
}

interface ViewerStlModelProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileData[];
  activeFileId: string | null;
  onSetActiveFile: (fileId: string) => void;
}

const ViewerStlModel: React.FC<ViewerStlModelProps> = React.memo(({ 
  isOpen, 
  onClose, 
  files, 
  activeFileId, 
  onSetActiveFile 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && files.length > 0) {
      const index = activeFileId 
        ? files.findIndex((file) => file.id === activeFileId)
        : 0;
      if (index !== -1) {
        setCurrentIndex(index);
        const url = URL.createObjectURL(files[index].file);
        setCurrentFileUrl(url);
        return () => {
          if (url) URL.revokeObjectURL(url);
        };
      }
    }
  }, [isOpen, activeFileId, files]);

  const handleNavigate = useCallback((direction: 'next' | 'previous') => {
    if (files.length > 0) {
      const newIndex = direction === 'next'
        ? (currentIndex + 1) % files.length
        : (currentIndex - 1 + files.length) % files.length;

      setCurrentIndex(newIndex);
      const url = URL.createObjectURL(files[newIndex].file);
      setCurrentFileUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
      onSetActiveFile(files[newIndex].id);
    }
  }, [currentIndex, files, onSetActiveFile]);

  const handleClose = useCallback(() => {
    if (currentFileUrl) {
      URL.revokeObjectURL(currentFileUrl);
    }
    setCurrentFileUrl(null);
    onClose();
  }, [currentFileUrl, onClose]);

  if (!isOpen || !currentFileUrl || files.length === 0) return null;

  const currentFile = files[currentIndex];

  return (
    <Box sx={styles.modalContainer}>
      <Box 
        sx={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={styles.closeButton}>
          <ButtonIcon svgPath={cross} onClick={handleClose} />
        </Box>
        <Typography sx={styles.modalTitle}>3D VIEWER</Typography>
        <Box sx={styles.viewerContent}>
          <Box sx={styles.viewModel}>
            {currentFileUrl && <ViewModelStl fileUrl={currentFileUrl} />}
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '80%',
            height: '15%',
          }}>
            <ButtonIcon
              svgPath={arrow_left}
              onClick={() => handleNavigate('previous')}
              disabled={files.length <= 1}
            />
            <Typography sx={styles.fileName}>
              {currentFile.name}
            </Typography>
            <ButtonIcon
              svgPath={arrow_right}
              onClick={() => handleNavigate('next')}
              disabled={files.length <= 1}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ViewerStlModel;