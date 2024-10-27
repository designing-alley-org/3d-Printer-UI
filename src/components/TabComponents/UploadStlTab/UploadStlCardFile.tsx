
// UploadStlCardFile.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewerStlModel from './ViewerStlModel';
import * as styles from './UploadStlCardFileStyle';
import cross from '../../../assets/icons/cross.svg';
import plus from '../../../assets/icons/plus.svg';
import minus from '../../../assets/icons/minus.svg';
import vector from '../../../assets/icons/Vector.svg';
import ViewModelStl from '../../ViewStlFile/index';

interface FileData {
  id: string;
  name: string;
  size: string;
  progress: number;
  file: File;
  quantity: number;
}

interface UploadStlCardFileProps {
  file: FileData;
  onRemove: (fileId: string) => void;
  onSetActiveFile: (fileId: string) => void;
  onUpdateQuantity: (fileId: string, quantity: number) => void;
  files: FileData[];
  activeFileId: string | null;
}

const UploadStlCardFile: React.FC<UploadStlCardFileProps> = React.memo(
  ({ file, onRemove, onSetActiveFile, onUpdateQuantity, files, activeFileId }) => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState<string>('');

    useEffect(() => {
      const url = URL.createObjectURL(file.file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }, [file.file]);

    const handleQuantityChange = useCallback((operation: 'increase' | 'decrease') => {
      const minLimit = 1;
      const maxLimit = 999;
      const newQuantity = operation === 'increase' 
        ? Math.min(file.quantity + 1, maxLimit)
        : Math.max(file.quantity - 1, minLimit);
      
      if (newQuantity !== file.quantity) {
        onUpdateQuantity(file.id, newQuantity);
      }
    }, [file.quantity, file.id, onUpdateQuantity]);

    const handleViewerOpen = useCallback(() => {
      setViewerOpen(true);
      onSetActiveFile(file.id);
    }, [onSetActiveFile, file.id]);

    const handleViewerClose = useCallback(() => {
      setViewerOpen(false);
    }, []);

    const handleRemove = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove(file.id);
    }, [onRemove, file.id]);
   
    return (
      <>
        <Box sx={styles.container}>
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
              <ViewModelStl fileUrl={fileUrl} />
              <Box sx={styles.viewButton} onClick={handleViewerOpen}>
                <img src={vector} alt="View_stl_model" />
              </Box>
            </Box>
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
                width="3rem"
                height="3rem"
                svgPath={cross}
                onClick={handleRemove}
              />
            </Box>
            <Box sx={styles.quantityValueBox}>
              <ButtonIcon
                width="2rem"
                height="2rem" 
                bgColor='#DDE9FC'
                border='1px solid #66A3FF'
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                svgPath={minus}
                onClick={() => handleQuantityChange('decrease')}
                disabled={file.quantity <= 1}
              />
              <Typography sx={styles.quantityValue}>{file.quantity}</Typography>
              <ButtonIcon
                width="2rem"
                height="2rem"
                border='1px solid #66A3FF'
                bgColor='#DDE9FC'
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                svgPath={plus}
                onClick={() => handleQuantityChange('increase')}
                disabled={file.quantity >= 999}
              />
            </Box>
          </Box>
        </Box>
        <ViewerStlModel
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          files={files}
          activeFileId={activeFileId}
          onSetActiveFile={onSetActiveFile}
        />
      </>
    );
  }
);

export default UploadStlCardFile;