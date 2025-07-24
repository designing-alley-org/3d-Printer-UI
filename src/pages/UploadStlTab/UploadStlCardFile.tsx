import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, TextField, CircularProgress, useMediaQuery } from '@mui/material';
import ViewModelStl from '../../components/ViewStlFile/index';
import * as styles from './UploadStlCardFileStyle';
import ViewerStlModel from './ViewerStlModel';
import { getFile } from '../../utils/indexedDB';
import MUIButton from '../../stories/MUIButton/Button';
import { Box as BoxIcon, Minus, Plus, X } from 'lucide-react';

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
    files,
    activeFileId,
    selectedUnit,
    convertDimensions,
  }) => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const { blobUrl, isLoading, error } = useFileBlob(file);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

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
          sx={styles.container}
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
        <Box sx={styles.container}>
          <Typography color="error" sx={styles.errorText}>
            Error: {error}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Box sx={styles.container}>
          <Typography sx={styles.fileNumber}>
            {files.indexOf(file) + 1}
          </Typography>

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
             
              <MUIButton
                btnVariant='icon-rounded'
                icon={<BoxIcon color='#ffffff' strokeWidth={1} />}
                onClick={handleViewerOpen}
                aria-label="Open 3D viewer"
                style={styles.viewButton as React.CSSProperties}
                />
            </Box>
          </Box>

    
          <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column ' : 'row', width: '80%' }}>
          {/* File Info Section */}
          <Box sx={styles.infoBox}>
            <Typography sx={styles.fileName}>
              {file.fileName.split('-')[0]}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '1rem 0',
              }}
            >
              <Typography sx={styles.dimensionLabel}>
                Size: H x W x L
              </Typography>
              <Typography sx={styles.dimensionsValue}>
                {`${displayDimensions.height.toFixed(2)} × ${displayDimensions.width.toFixed(
                  2
                )} × ${displayDimensions.length.toFixed(2)} `}
                {selectedUnit}
              </Typography>
            </Box>
          </Box>
          
          {/* Quantity Control Section */}
          <Box sx={styles.quantityBox}>
            <Box sx={styles.quantityHeader}>
              <Typography sx={styles.fileName}>Quantity</Typography>
            </Box>
            <Box sx={styles.quantityValueBox}>
              <MUIButton
                icon={<Minus color='#1E65F5' size={15}/>}
                onClick={() => handleQuantityChange('decrease')}
                disabled={file.quantity <= QUANTITY_LIMITS.MIN}
                aria-label="Decrease quantity"
                btnVariant='icon-rounded'
              />
              <TextField
              value={file.quantity}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and ensure it's within the limits
                if (/^\d*$/.test(value) && Number(value) <= QUANTITY_LIMITS.MAX && Number(value) >= QUANTITY_LIMITS.MIN) {
                handleQuantityChange('set', Number(value));
                }
              }}
              type="text" // Keep as 'text'
              inputProps={{
                'aria-label': 'Quantity',
              }}
              sx={{
                '& fieldset': {
                border: '1px solid #66A3FF',
                boxShadow: '0px 0px 4px 0px rgba(0, 71, 255, 1) inset',
                borderRadius: '2rem',
                },
                '& input': {
                textAlign: 'center',
                padding: '0.5rem',
                fontSize: isSmallScreen ? '.7rem' : '1rem',
                height: isSmallScreen ? '1rem' : '1.4rem',
                width: isSmallScreen ? '3rem' : '4rem',
                '&:focus': {
                  outline: 'none',
                },
                },
              }}
              />
              <MUIButton
                icon={<Plus color='#1E65F5' size={15} />}
                onClick={() => handleQuantityChange('increase')}
                disabled={file.quantity >= QUANTITY_LIMITS.MAX}
                aria-label="Increase quantity"
                btnVariant='icon-rounded'
              />
            </Box>
          </Box>
          </Box>
              <MUIButton
                icon={<X size={30} strokeWidth={1} />}
                onClick={handleRemove}
                aria-label="Remove file"
                size='small'
                btnVariant='icon-rounded'
                style={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none'
                }}
              />
        </Box>

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
