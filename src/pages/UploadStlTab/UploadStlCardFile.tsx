import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography,  CircularProgress,  Card, CardActions, IconButton } from '@mui/material';
import ViewModelStl from '../../components/ViewStlFile/index';
import * as styles from './UploadStlCardFileStyle';
import ViewerStlModel from './ViewerStlModel';
import { getFile } from '../../utils/indexedDB';
import {  Minus, Plus } from 'lucide-react';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

// Constants
const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 1000000000,
} as const;

// Types
interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  _id: string;
  fileName: string;
  dimensions: ModelDimensions;
  fileUrl?: string;
  fileBlob?: Blob;
  file?: File;
  unit?: string;
  quantity: number;
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
  convertDimensions: (
    dimensions: ModelDimensions,
    unit: string
  ) => ModelDimensions;
}

// Custom hooks
const useFileBlob = (file: FileData) => {
  const [state, setState] = useState<{
    blobUrl: string;
    isLoading: boolean;
    error: string | null;
  }>({
    blobUrl: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const setupFileUrl = async () => {
      try {
        let blob: Blob | null = null;

        if (file.file) {
          blob = file.file;
        } else if (file.fileBlob) {
          blob = file.fileBlob;
        } else if (file.fileUrl) {
          const storedBlob = await getFile(file.fileUrl);
          blob = storedBlob || (await (await fetch(file.fileUrl)).blob());
        }

        if (!blob) {
          throw new Error('No valid file source found');
        }

        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setState({
            blobUrl: url,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error:
              error instanceof Error ? error.message : 'Failed to load file',
          }));
        }
      }
    };

    setupFileUrl();

    return () => {
      isMounted = false;
      if (state.blobUrl) {
        URL.revokeObjectURL(state.blobUrl);
      }
    };
  }, [file]);

  return state;
};

const UploadStlCardFile: React.FC<UploadStlCardFileProps> = React.memo(
  ({
    file,
    onRemove,
    onSetActiveFile,
    onUpdateQuantity,
    onUpdateDimensions,
    activeFileId,
    selectedUnit,
    convertDimensions,
  }) => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const { blobUrl, isLoading, error } = useFileBlob(file);

    const handleQuantityChange = useCallback(
      (operation: 'set' | 'increase' | 'decrease', value?: number) => {
        let newQuantity = file.quantity;

        switch (operation) {
          case 'set':
            newQuantity = Math.max(
              Math.min(value ?? QUANTITY_LIMITS.MIN, QUANTITY_LIMITS.MAX),
              QUANTITY_LIMITS.MIN
            );
            break;
          case 'increase':
            newQuantity = Math.min(file.quantity + 1, QUANTITY_LIMITS.MAX);
            break;
          case 'decrease':
            newQuantity = Math.max(file.quantity - 1, QUANTITY_LIMITS.MIN);
            break;
        }

        if (newQuantity !== file.quantity) {
          onUpdateQuantity(file._id, newQuantity);
        }
      },
      [file.quantity, file._id, onUpdateQuantity]
    );

    const handleViewerOpen = useCallback(() => {
      setViewerOpen(true);
      onSetActiveFile(file._id);
    }, [onSetActiveFile, file._id]);

    const handleViewerClose = useCallback(() => {
      setViewerOpen(false);
    }, []);

    const handleRemove = useCallback(() => {
      onRemove(file._id);
    }, [onRemove, file._id]);

    const displayDimensions = useMemo(
      () => convertDimensions(file.dimensions, selectedUnit),
      [file.dimensions, selectedUnit, convertDimensions]
    );

    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={24} />
          <Typography sx={{ ml: 2 }}>Loading file...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ padding: '1rem', textAlign: 'center' }}>
          <Typography color="error" sx={styles.errorText}>
            Error: {error}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Card  sx={{borderRadius: '1rem' , padding: 2 , display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* STL Viewer Section */}
          <Box sx={styles.viewBox}>
            <Box sx={styles.viewContent}>
              {blobUrl ? (
                <ViewModelStl
                  localBlobUrl={blobUrl}
                  onDimensionsCalculated={(dimensions) =>
                    onUpdateDimensions(file._id, dimensions)
                  }
                  modelColor={activeFileId === file._id ? '#808080' : '#808080'}
                />
              ) : (
                <Typography sx={styles.errorText}>
                  Error loading file preview
                </Typography>
              )}
            </Box>
             <Typography  variant='h6' sx={{
              maxWidth: '9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
             }}>
              {file.fileName.split('-')[0]}
            </Typography>
          </Box>


          <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
          {/* File Info Section */}
           
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '1rem 0',
              }}
            >
              <Box display='flex' alignItems='center' gap='0.5rem'>
              <Typography >
                Size: 
              </Typography>
              <Typography fontWeight='700' variant='body1'>
                H x W x L
              </Typography>
              </Box>
              <Typography variant='body1' fontWeight='700'>
                {`${displayDimensions.height.toFixed(2)} × ${displayDimensions.width.toFixed(
                  2
                )} × ${displayDimensions.length.toFixed(2)} `}
                {selectedUnit}
              </Typography>
            </Box>
          
          {/* Quantity Control Section */}
          
          </Box>
             <CardActions sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem'
             }}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
              <CustomButton
               children={<Minus color='#ffff' size={20}/>}
                onClick={() => handleQuantityChange('decrease')}
                disabled={file.quantity <= QUANTITY_LIMITS.MIN}
                aria-label="Decrease quantity"
                variant='contained'
                sx={{
                     width: 'auto',
            borderRadius: '4px',
                }}
              />
              <CustomTextField
              onlyNumber={true}
              value={file.quantity}
              onChange={(e) => handleQuantityChange('set', parseInt(e.target.value))}
              type="text" 
              inputProps={{
                'aria-label': 'Quantity',
              }}
              inputStyle={1}
              />
              <CustomButton
                children={<Plus color='#ffff' size={20} />}
                onClick={() => handleQuantityChange('increase')}
                disabled={file.quantity >= QUANTITY_LIMITS.MAX}
                aria-label="Increase quantity"
                variant='contained'
                sx={{
                   width: 'auto',
            borderRadius: '4px',
                }}
              />
            </Box>
               <IconButton
                 aria-label="Remove file"
                 onClick={handleRemove}
               >
                 <DeleteOutlineRoundedIcon  />
               </IconButton>
             </CardActions>
        </Card>

        {/* 3D Viewer Modal */}
        <ViewerStlModel
          localBlobUrl={blobUrl}
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          files={[{ ...file }]}
          activeFileId={activeFileId}
          onSetActiveFile={onSetActiveFile}
        />
      </>
    );
  }
);

UploadStlCardFile.displayName = 'UploadStlCardFile';

export default UploadStlCardFile;
