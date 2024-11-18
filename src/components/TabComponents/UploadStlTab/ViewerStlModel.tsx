import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../ViewStlFile/index';
import { arrow_left, arrow_right, cross } from '../../../constants';
import * as styles from './ViewerStlModelStyles';

// Interface for the file data coming from CustomizeTab
interface FileData {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  weight: number;
  unit: string;
  dimensions: {
    height: number;
    length: number;
    width: number;
  };
}

// Interface for local file data
interface LocalFileData {
  id: string;
  name: string;
  file: File;
  quantity: number;
}

interface ViewerStlModelProps {
  isOpen: boolean;
  onClose: () => void;
  files?: FileData[] | LocalFileData[];
  activeFileId?: string | null;
  onSetActiveFile?: (fileId: string) => void;
  localBlobUrl?: string;
  fileUrl?: string;
}

const ViewerStlModel: React.FC<ViewerStlModelProps> = React.memo(({ 
  isOpen, 
  onClose, 
  files = [], 
  activeFileId, 
  onSetActiveFile,
  localBlobUrl,
  fileUrl
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

  // Type guard to check if we're dealing with FileData
  const isFileData = (file: FileData | LocalFileData): file is FileData => {
    return '_id' in file && 'fileUrl' in file;
  };

  useEffect(() => {
    if (isOpen && files.length > 0) {
      const index = activeFileId 
        ? files.findIndex((file) => isFileData(file) ? file._id === activeFileId : file.id === activeFileId)
        : 0;
      if (index !== -1) {
        setCurrentIndex(index);
        // If we're dealing with LocalFileData, create blob URL
        const currentFile = files[index];
        if (!isFileData(currentFile) && 'file' in currentFile) {
          const url = URL.createObjectURL(currentFile.file);
          setCurrentFileUrl(url);
          return () => {
            if (url) URL.revokeObjectURL(url);
          };
        }
      }
    }
  }, [isOpen, activeFileId, files]);

  const handleNavigate = useCallback((direction: 'next' | 'previous') => {
    if (files.length > 0) {
      const newIndex = direction === 'next'
        ? (currentIndex + 1) % files.length
        : (currentIndex - 1 + files.length) % files.length;

      setCurrentIndex(newIndex);
      
      const currentFile = files[newIndex];
      if (!isFileData(currentFile) && 'file' in currentFile) {
        const url = URL.createObjectURL(currentFile.file);
        setCurrentFileUrl((prevUrl) => {
          if (prevUrl) URL.revokeObjectURL(prevUrl);
          return url;
        });
      }
      
      if (onSetActiveFile) {
        onSetActiveFile(isFileData(currentFile) ? currentFile._id : currentFile.id);
      }
    }
  }, [currentIndex, files, onSetActiveFile]);

  const handleClose = useCallback(() => {
    if (currentFileUrl) {
      URL.revokeObjectURL(currentFileUrl);
      setCurrentFileUrl(null);
    }
    onClose();
  }, [currentFileUrl, onClose]);

  if (!isOpen) return null;

  // Handle single file view with localBlobUrl
  if (localBlobUrl) {
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
              <ViewModelStl localBlobUrl={localBlobUrl} fileUrl={fileUrl} modelColor="" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Handle no files case
  if (files.length === 0) return null;

  const currentFile = files[currentIndex];
  const fileToShow = isFileData(currentFile) 
    ? { 
        url: currentFile.fileUrl, 
        name: currentFile.fileName,
        color: currentFile.color 
      }
    : { 
        url: currentFileUrl!, 
        name: currentFile.name,
        color: '' 
      };

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
            <ViewModelStl 
              fileUrl={fileToShow.url}
              modelColor={fileToShow.color}
              localBlobUrl={!isFileData(currentFile) ? currentFileUrl || undefined : undefined}
            />
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
              {fileToShow.name}
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

ViewerStlModel.displayName = 'ViewerStlModel';

export default ViewerStlModel;