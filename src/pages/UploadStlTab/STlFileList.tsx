import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardActions,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Minus, Plus } from 'lucide-react';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { FileData, ModelDimensions } from '../../types/uploadFiles';

// Constants
const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 1000000000,
} as const;

interface Props {
  file: FileData;
  onRemove: (fileId: string) => void;
  onUpdateQuantity: (fileId: string, quantity: number) => void;
  selectedUnit: string;
  convertDimensions: (
    dimensions: ModelDimensions,
    unit: string
  ) => ModelDimensions;
}

const STlFileList: React.FC<Props> = React.memo(
  ({ file, onRemove, onUpdateQuantity, selectedUnit, convertDimensions }) => {
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

    const handleRemove = useCallback(() => {
      onRemove(file._id);
    }, [onRemove, file._id]);

    const displayDimensions = useMemo(
      () => convertDimensions(file.dimensions, selectedUnit),
      [file.dimensions, selectedUnit, convertDimensions]
    );

    return (
      <Card
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: { xs: '100%', sm: '268px' },
        }}
      >
        {/* Thumbnail Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              border: '1px solid #3E424733',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {file.thumbnailUrl ? (
              <img
                src={file.thumbnailUrl}
                alt={`${file.fileName} thumbnail`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: 'scale(4)',
                }}
              />
            ) : file.isUploading ? (
              <Typography>{file.uploadProgress}%</Typography>
            ) : (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                No Preview
              </Typography>
            )}
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              flexShrink: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '150px',
            }}
          >
            {file.fileName.split('-')[0]}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
          {/* File Info Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.1rem',
            }}
          >
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography>Size:</Typography>
              <Typography fontWeight="700" variant="body1">
                H x W x L
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="700">
              {`${displayDimensions.height.toFixed(2)} × ${displayDimensions.width.toFixed(
                2
              )} × ${displayDimensions.length.toFixed(2)} `}
              {selectedUnit}
            </Typography>
          </Box>

          {/* Quantity Control Section */}
        </Box>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0em',
            width: '100%',
          }}
        >
          <Box display="flex" alignItems="center" gap="0.5rem">
            <CustomButton
              children={<Minus color="#ffff" size={20} />}
              onClick={() => handleQuantityChange('decrease')}
              disabled={file.quantity <= QUANTITY_LIMITS.MIN}
              aria-label="Decrease quantity"
              variant="contained"
              sx={{
                borderRadius: '4px',
                padding: '6px 10px',
                minWidth: '0rem !important',
              }}
            />
            <CustomTextField
              onlyNumber={true}
              value={file.quantity}
              onChange={(e) =>
                handleQuantityChange('set', parseInt(e.target.value))
              }
              type="text"
              inputProps={{
                'aria-label': 'Quantity',
              }}
              inputStyle={1}
              sx={{
                '& .MuiInputBase-input': {
                  textAlign: 'center',
                },
              }}
            />
            <CustomButton
              children={<Plus color="#ffff" size={15} />}
              onClick={() => handleQuantityChange('increase')}
              disabled={file.quantity >= QUANTITY_LIMITS.MAX}
              aria-label="Increase quantity"
              variant="contained"
              sx={{
                borderRadius: '4px',
                padding: '9px 13px',
                minWidth: '0rem !important',
              }}
            />
          </Box>
          <IconButton aria-label="Remove file" onClick={handleRemove}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
);

STlFileList.displayName = 'STlFileList';

export default STlFileList;
