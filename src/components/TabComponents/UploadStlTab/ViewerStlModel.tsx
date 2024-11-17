import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../ViewStlFile/index';
import { arrow_left, arrow_right, cross } from '../../../constants';
import * as styles from './ViewerStlModelStyles';



interface FileData {
  id: string;
  name: string;
  file: File;
  quantity: number;
}

interface ViewerStlModelProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileData[];
  activeFileId: string | null;
  onSetActiveFile: (fileId: string) => void;
  localBlobUrl?: string;
  fileURl?: string;
}

const ViewerStlModel: React.FC<ViewerStlModelProps> = React.memo(({ 
  isOpen, 
  onClose, 
  files, 
  activeFileId, 
  onSetActiveFile,
  localBlobUrl,
  fileURl
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
            {currentFileUrl && <ViewModelStl localBlobUrl={localBlobUrl} fileUrl={currentFileUrl} modelColor='' />}
          </Box>
          <Box sx={styles.navigationContainer}>
            <ButtonIcon
              svgPath={arrow_left}
              onClick={() => handleNavigate('previous')}
              disabled={files.length <= 1}
              width="3rem"
              height="3rem"
              style={{ opacity: files.length <= 1 ? 0.5 : 1 }}
            />
            <Typography sx={styles.fileName}>
              {currentFile.name}
            </Typography>
            <ButtonIcon
              svgPath={arrow_right}
              onClick={() => handleNavigate('next')}
              disabled={files.length <= 1}
              width="3rem"
              height="3rem"
              style={{ opacity: files.length <= 1 ? 0.5 : 1 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ViewerStlModel;