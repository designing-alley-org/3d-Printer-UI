import React, { useRef } from 'react';
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ResponsiveModal from './ResponsiveModal';
import CustomButton from '../../stories/button/CustomButton';
import {
  returnValidationSchema,
  ReturnFormValues,
} from '../../validation/returnValidation';
import CustomInputLabelField from '../../stories/inputs/CustomInputLabelField';

interface ImagePreview {
  file: File;
  url: string;
}

interface CreateReturnModelProps {
  open: boolean;
  onClose: () => void;
  onSave: (returnData: ReturnFormValues & { imageFiles: File[] }) => void;
  loading?: boolean;
  orderId: string;
  shipmentId: string;
}

const CreateReturnModel: React.FC<CreateReturnModelProps> = ({
  open,
  onClose,
  onSave,
  loading = false,
  orderId,
  shipmentId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<ReturnFormValues & { imageFiles: File[] }>({
    initialValues: {
      returnReason: '',
      images: [],
      imageFiles: [],
    },
    validationSchema: returnValidationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentImages = formik.values.imageFiles;
    const newFiles = Array.from(files);
    
    // Check if adding new files would exceed the limit
    if (currentImages.length + newFiles.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImagePreviews: ImagePreview[] = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImageFiles = [...currentImages, ...newFiles];
    const updatedImages = [...formik.values.images, ...newImagePreviews];

    formik.setFieldValue('imageFiles', updatedImageFiles);
    formik.setFieldValue('images', updatedImages);
  };

  const handleImageRemove = (index: number) => {
    const updatedImageFiles = formik.values.imageFiles.filter((_, i) => i !== index);
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    
    // Clean up URL to prevent memory leaks
    if (formik.values.images[index]) {
      URL.revokeObjectURL((formik.values.images[index] as ImagePreview).url);
    }

    formik.setFieldValue('imageFiles', updatedImageFiles);
    formik.setFieldValue('images', updatedImages);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const actions = (
    <Stack direction="row" spacing={2}>
      <CustomButton
        variant="outlined"
        onClick={handleClose}
        disabled={loading}
      >
        Cancel
      </CustomButton>
      <CustomButton
        variant="contained"
        onClick={() => formik.handleSubmit()}
        loading={loading}
        disabled={
          formik.values.imageFiles.length < 2 || 
          getWordCount(formik.values.returnReason) < 10 ||
          loading
        }
      >
        Request Return
      </CustomButton>
    </Stack>
  );

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title="Request Product Return"
      actions={actions}
      maxWidth="md"
      disableBackdropClick={loading}
    >
      <Box sx={{ width: '100%' }}>
        {/* Order ID - Read Only */}
        <Box mb={3}>
          <CustomInputLabelField
            fullWidth
            label="Order ID"
            value={orderId}
            name="orderId"
            disable={true}
            onChange={() => {}}
          />
        </Box>

        {/* Shipment ID - Read Only */}
        <Box mb={3}>
          <CustomInputLabelField
            fullWidth
            label="Shipment ID"
            value={shipmentId}
            name="shipmentId"
            disable={true}
            onChange={() => {}}
          />
        </Box>

        {/* Return Reason Textarea */}
        <Box mb={3}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: '#333',
              fontSize: '0.9rem',
              mb: 1,
            }}
          >
            Return Reason <span style={{ color: '#d32f2f' }}>*</span>
            <Typography
              variant="caption"
              sx={{
                color: '#666',
                fontSize: '0.75rem',
                ml: 1,
              }}
            >
              ({getWordCount(formik.values.returnReason)}/minimum 10 words)
            </Typography>
          </Typography>
          <TextField
            fullWidth
            name="returnReason"
            value={formik.values.returnReason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please provide a detailed reason for your return request (minimum 10 words)..."
            error={!!(formik.touched.returnReason && formik.errors.returnReason)}
            helperText={
              formik.touched.returnReason && formik.errors.returnReason
                ? String(formik.errors.returnReason)
                : ''
            }
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Box>

        {/* Image Upload Section */}
        <Box mb={3}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: '#333',
                fontSize: '0.9rem',
              }}
            >
              Attach Images <span style={{ color: '#d32f2f' }}>*</span>
            </Typography>
            <Chip
              label={`${formik.values.imageFiles.length}/5`}
              size="small"
              color={formik.values.imageFiles.length >= 2 ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Typography
              variant="body2"
              sx={{ color: '#666', fontSize: '0.8rem', mr: 2 }}
            >
              Click to add images (minimum 2 required)
            </Typography>
            <IconButton
              onClick={openFilePicker}
              size="small"
              sx={{
                color: '#1976d2',
                border: '1px solid #1976d2',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />

          {formik.touched.images && formik.errors.images && (
            <Typography
              variant="caption"
              sx={{ color: '#d32f2f', fontSize: '0.75rem', mb: 2, display: 'block' }}
            >
              {String(formik.errors.images)}
            </Typography>
          )}

          {/* Image Preview Grid */}
          {formik.values.imageFiles.length > 0 && (
            <Box
              sx={{
                mt: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              {formik.values.images.map((imagePreview, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '75%', // 4:3 aspect ratio
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <img
                      src={(imagePreview as ImagePreview).url}
                      alt={`preview-${index}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleImageRemove(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        '&:hover': {
                          backgroundColor: '#f44336',
                          color: '#fff',
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </ResponsiveModal>
  );
};

export default CreateReturnModel;
