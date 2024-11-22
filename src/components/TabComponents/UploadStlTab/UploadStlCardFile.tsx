// src/components/TabComponents/UploadStlTab/UploadStlCardFile.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField} from '@mui/material';
import ViewModelStl from '../../ViewStlFile/index';
import { cross, plus, minus, vector } from '../../../constants';
import * as styles from './UploadStlCardFileStyle';
import ViewerStlModel from './ViewerStlModel';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  id: string;
  name: string;
  dimensions: ModelDimensions;
  fileUrl: string;
  quantity: number;
  file: File;
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
    const [localBlobUrl, setLocalBlobUrl] = useState<string>('');

    useEffect(() => {
      // Create a local URL for immediate rendering
      if (file.file) {
        const url = URL.createObjectURL(file.file);
        setLocalBlobUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    }, [file.file]);

    const handleQuantityChange = useCallback((operation: 'set' | 'increase' | 'decrease', value?: number) => {
      // const minLimit = 1;
      const maxLimit = 999;
      let newQuantity = 0;
      if (operation === 'set') {
        newQuantity = Math.max(Math.min(value || 0, maxLimit), 0);
      } else {
        newQuantity = operation === 'increase' 
          ? Math.min(file.quantity + 1, maxLimit)
          : Math.max(file.quantity - 1, 1);
      }
      
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

    const handleRemove = useCallback(() => {
        onRemove(file.id);
      },
      [onRemove, file.id]
    );

    const displayDimensions = convertDimensions(file.dimensions, selectedUnit);
   
    return (
      <>
        <Box sx={styles.container}>
          <Typography sx={styles.fileNumber}> {files.indexOf(file) + 1}</Typography>
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
              {localBlobUrl ? (
                <ViewModelStl
                  localBlobUrl={localBlobUrl}
                  fileUrl={file.fileUrl} // Pass fileUrl if available
                  onDimensionsCalculated={(dimensions) => onUpdateDimensions(file.id, dimensions)}
                  modelColor={activeFileId === file.id ? '#808080' : '#808080'}
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
                {`${displayDimensions.height} x ${displayDimensions.width} x ${displayDimensions.length} ${selectedUnit}`}
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
              <TextField
                value={file.quantity}
                onChange={(e) => handleQuantityChange('set', Number(e.target.value))}
                type="text"
                sx={{
                  '& fieldset': {
                    border:'1px solid #66A3FF',
                    boxShadow: '0px 0px 4px 0px rgba(0, 71, 255, 1) inset',
                    borderRadius: '2rem',
                    

                  },
                  '& input': {
                    textAlign: 'center',
                    padding: '0.5rem',
                    height: '2rem',
                    width:'4rem',
                    '&:focus': {
                      outline: 'none',                      
                    },
                  },
                }}
                inputProps={{
                  min: 1,
                  max: 999,
                  step: 1
                }}
              />
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
        localBlobUrl={localBlobUrl}
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