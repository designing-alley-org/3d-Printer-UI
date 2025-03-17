import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ButtonIcon from '../../stories/BottonIcon/ButtonIcon';
import ViewModelStl from '../../components/ViewStlFile/index';
import { arrow_left, arrow_right, cross } from '../../constants';
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
  color?: string;
}

const DEFAULT_COLOR = '#808080';

const ViewerStlModel: React.FC<ViewerStlModelProps> = React.memo(
  ({
    isOpen,
    onClose,
    files = [],
    activeFileId,
    onSetActiveFile,
    localBlobUrl,
    fileUrl,
    color,
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isFileData = (file: FileData | LocalFileData): file is FileData => {
      return '_id' in file && 'fileUrl' in file;
    };

    useEffect(() => {
      if (isOpen && files.length > 0) {
        const index = activeFileId
          ? files.findIndex((file) =>
              isFileData(file)
                ? file._id === activeFileId
                : file.id === activeFileId
            )
          : 0;

        if (index !== -1) {
          setCurrentIndex(index);

          const currentFile = files[index];
          if (!isFileData(currentFile) && 'file' in currentFile) {
            const url = URL.createObjectURL(currentFile.file);
            setCurrentFileUrl(url);
            return () => {
              URL.revokeObjectURL(url);
            };
          }
        }
      }
    }, [isOpen, activeFileId, files]);

    const handleNavigate = useCallback(
      (direction: 'next' | 'previous') => {
        if (files.length <= 1) return;

        const newIndex =
          direction === 'next'
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
          onSetActiveFile(
            isFileData(currentFile) ? currentFile._id : currentFile.id
          );
        }
      },
      [currentIndex, files, onSetActiveFile]
    );

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
          <Box sx={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Box sx={styles.closeButton}>
              <ButtonIcon svgPath={cross} onClick={handleClose} imagePadding={isSmallScreen ? '2px' : '0px'}/>
            </Box>
            <Typography sx={styles.modalTitle}>3D VIEWER</Typography>
            <Box sx={styles.viewerContent}>
              <Box sx={styles.viewModel}>
                <ViewModelStl
                  localBlobUrl={localBlobUrl}
                  fileUrl={fileUrl}
                  modelColor={color || DEFAULT_COLOR}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }

    if (files.length === 0) return null;

    const currentFile = files[currentIndex];
    const fileToShow = isFileData(currentFile)
      ? {
          url: currentFile.fileUrl,
          name: currentFile.fileName,
          modelColor: color || currentFile.color || DEFAULT_COLOR,
        }
      : {
          url: currentFileUrl!,
          name: currentFile.name,
          modelColor: color || DEFAULT_COLOR,
        };

    return (
      <Box sx={styles.modalContainer}>
        <Box sx={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <Box sx={styles.closeButton}>
            <ButtonIcon svgPath={cross} onClick={handleClose} />
          </Box>
          <Typography sx={styles.modalTitle}>3D VIEWER</Typography>
          <Box sx={styles.viewerContent}>
            <Box sx={styles.viewModel}>
              <ViewModelStl
                fileUrl={fileToShow.url}
                modelColor={fileToShow.modelColor}
                localBlobUrl={
                  !isFileData(currentFile)
                    ? currentFileUrl || undefined
                    : undefined
                }
              />
            </Box>
            {files.length > 1 && (
              <Box sx={styles.navigationContainer}>
                <ButtonIcon
                  svgPath={arrow_left}
                  onClick={() => handleNavigate('previous')}
                  disabled={false}
                  width="3rem"
                  height="3rem"
                />
                <Typography sx={styles.fileName}>{fileToShow.name}</Typography>
                <ButtonIcon
                  svgPath={arrow_right}
                  onClick={() => handleNavigate('next')}
                  disabled={false}
                  width="3rem"
                  height="3rem"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

ViewerStlModel.displayName = 'ViewerStlModel';

export default ViewerStlModel;
