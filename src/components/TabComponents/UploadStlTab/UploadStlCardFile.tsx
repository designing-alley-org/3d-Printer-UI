import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import ViewerStlModel from './ViewerStlModel';
import * as styles from './UploadStlCardFileStyle';
import { cross, plus, minus, vector } from '../../../constants';
import ViewModelStl from '../../ViewStlFile/index';
import { getFile } from '../../../utils/indexedDB';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  id: string;
  name: string;
  dimensions: ModelDimensions;
  file: File;
  quantity: number;
  fileUrl: string;
}

interface UploadStlCardFileProps {
  file: FileData;
  onRemove: (fileId: string) => void;
  onSetActiveFile: (fileId: string) => void;
  onUpdateQuantity: (fileId: string, quantity: number) => void;
  onUpdateDimensions: (fileId: string, dimensions: ModelDimensions) => void;
  files: FileData[];
  activeFileId: string | null;
  selectedUnit: string;
  convertDimensions: (dimensions: ModelDimensions, unit: string) => ModelDimensions;
}

const UploadStlCardFile: React.FC<UploadStlCardFileProps> = React.memo(
  ({ 
    file, 
    onRemove, 
    onSetActiveFile, 
    onUpdateQuantity, 
    onUpdateDimensions,
    files, 
    activeFileId,
    selectedUnit,
    convertDimensions
  }) => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    useEffect(() => {
      const url = URL.createObjectURL(file.file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }, [file.file]);

    useEffect(() => {
      let isMounted = true;
    
      const loadFile = async () => {
        try {
          const blob = await getFile(file.fileUrl);
          if (blob && isMounted) {
            setFileBlob(blob);
          } else {
            console.error('File not found in IndexedDB');
          }
        } catch (error) {
          console.error('Error retrieving file from IndexedDB:', error);
        }
      };
    
      loadFile();
    
      return () => {
        isMounted = false;
      };
    }, [file.fileUrl]);

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

    const displayDimensions = convertDimensions(file.dimensions, selectedUnit);
   
    return (
      <>
        <Box sx={styles.container}>
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
            {fileBlob ? (
              <ViewModelStl 
              fileBlob={fileBlob} 
                onDimensionsCalculated={(dimensions) => onUpdateDimensions(file.id, dimensions)}
                modelColor=''
              />
            ) : (
              <div>Loading...</div>
            )}
              <Box sx={styles.viewButton} onClick={handleViewerOpen}>
                <img src={vector} alt="View_stl_model" />
              </Box>
            </Box>
          </Box>
          <Box sx={styles.infoBox}>
            <Typography sx={styles.fileName}>{file.name}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem 0' }}>
              <Typography sx={styles.dimensionLabel}>Size: H x W x L </Typography>
              <Typography sx={styles.dimensionsValue}>
              ({selectedUnit}) : {displayDimensions.height} x  {displayDimensions.width} x  {displayDimensions.length}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.quantityBox}>
            <Box sx={styles.quantityHeader}>
              <Typography sx={styles.fileName}>Quantity</Typography>
              <ButtonIcon
                width="3rem"
                height="3rem"
                svgPath={cross}
                onClick={() => handleRemove}
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