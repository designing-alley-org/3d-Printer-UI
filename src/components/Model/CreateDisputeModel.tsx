import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import ResponsiveModal from './ResponsiveModal';
import CustomButton from '../../stories/button/CustomButton';
import SingleSelectDropdown from '../../stories/Dropdown/SingleSelectDropdown';
import {
  disputeValidationSchema,
  DisputeFormValues,
} from '../../validation/disputeValidation';
import CustomInputLabelField from '../../stories/inputs/CustomInputLabelField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Height } from '@mui/icons-material';

const disputeTypes = [
  { id: 1, value: 'payment', label: 'Payment' },
  { id: 2, value: 'delivery', label: 'Delivery' },
  { id: 3, value: 'quality', label: 'Quality' },
  { id: 4, value: 'others', label: 'Others' },
];


interface CreateDisputeModelProps {
  open: boolean;
  onClose: () => void;
  onSave: (disputeData: DisputeFormValues) => void;
  loading?: boolean;
  orderId: string;
}

const CreateDisputeModel: React.FC<CreateDisputeModelProps> = ({
  open,
  onClose,
  onSave,
  loading = false,
  orderId,
}) => {
  const formik = useFormik<DisputeFormValues>({
    initialValues: {
      disputeType: { id: '', label: '', value: '' },
      disputeReason: '',
    },
    validationSchema: disputeValidationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleDisputeTypeChange = (selectedOption: any) => {
    formik.setFieldValue('disputeType', selectedOption);
  };

  const actions = (
    <Stack direction="row" spacing={2}>
      <CustomButton
        variant="outlined"
        onClick={handleClose}
        disabled={loading}
        borderRadius={0.2}
      >
        Cancel
      </CustomButton>
      <CustomButton
        variant="contained"
        onClick={() => formik.handleSubmit()}
        loading={loading}
        borderRadius={0.2}
      >
        Submit Dispute
      </CustomButton>
    </Stack>
  );

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title="Create Dispute"
      actions={actions}
      maxWidth="sm"
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

        {/* Dispute Type Dropdown */}
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
            Dispute Type <span style={{ color: '#d32f2f' }}>*</span>
          </Typography>
          <SingleSelectDropdown
            options={disputeTypes}
            onChange={handleDisputeTypeChange}
            error={!!(formik.touched.disputeType && formik.errors.disputeType)}
            titleHelper={
              formik.touched.disputeType && formik.errors.disputeType
                ? String(formik.errors.disputeType)
                : 'Select Dispute Type'
            }
            sx={{ width: '100%' }}
          />
        </Box>

        {/* Dispute Reason Textarea */}
        <Box mb={3}>
          <CustomInputLabelField
            fullWidth
            label="Dispute Reason"
            required
            name="disputeReason"
            value={formik.values.disputeReason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Please provide detailed information about your dispute..."
            error={
              !!(formik.touched.disputeReason && formik.errors.disputeReason)
            }
            helperText={
              formik.touched.disputeReason && formik.errors.disputeReason
                ? String(formik.errors.disputeReason)
                : ''
            }
          />
        </Box>
      </Box>
    </ResponsiveModal>
  );
};

export default CreateDisputeModel;
