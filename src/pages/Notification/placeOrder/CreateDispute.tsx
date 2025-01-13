import React, { useState, FormEvent } from 'react';
import { CreateDisputeWrapper } from '../styles';
import { InputField } from '../../../stories/Input/InputField';
import Dropdown from '../../../stories/Dropdown/Dropdown';
import Button from '../../../stories/button/Button';
import { createDispute } from '../../../store/actions/CreateDispute';

interface DisputeForm {
  disputeType: string;
  reason: string;
  status?: string;
}

interface FormErrors {
  disputeType?: string;
  reason?: string;
}

interface CreateDisputeProps {
  orderId: string;
}

const CreateDispute = ({ orderId }: CreateDisputeProps) => {
  // Form state - removed orderId since it comes from props
  const [formData, setFormData] = useState<DisputeForm>({
    disputeType: '',
    reason: '',
    status: 'InProgress'
  });

  // Error state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dispute type options
  const disputeTypes = [
    { id: 1, value: 'payment', label: 'Payment' },
    { id: 2, value: 'delivery', label: 'Delivery' },
    { id: 3, value: 'quality', label: 'Quality' },
    { id: 4, value: 'others', label: 'Others' }
  ];

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.disputeType) {
      newErrors.disputeType = 'Please select a dispute type';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof DisputeForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle dispute type selection
  const handleDisputeTypeSelect = (selected: { value: string }) => {
    setFormData(prev => ({
      ...prev,
      disputeType: selected.value
    }));
    if (errors.disputeType) {
      setErrors(prev => ({
        ...prev,
        disputeType: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Call API to create dispute
      const response = await createDispute(formData, orderId);

      if (!response) {
        throw new Error('Failed to create dispute');
      }

      // Reset form after successful submission
      setFormData({
        disputeType: '',
        reason: ''
      });
      alert('Dispute created successfully!');
      
    } catch (error) {
      console.error('Error creating dispute:', error);
      alert('Failed to create dispute. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CreateDisputeWrapper>
      <div className="header">
        <h2>Create Dispute</h2>
        <p>Log a new dispute for your order</p>
      </div>
      <div className="dispute-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputField
              label="Order Number"
              type="text"
              value={orderId}
              disabled={true}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dispute-type">Dispute Type</label>
            <Dropdown
              options={disputeTypes}
              onSelect={handleDisputeTypeSelect}
              defaultValue={formData.disputeType}
              titleHelper="Select Dispute Type"
              error={errors.disputeType}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dispute-reason">
              Dispute reason
              {errors.reason && (
                <span className="error-message"> - {errors.reason}</span>
              )}
            </label>
            <textarea
              name="dispute-reason"
              id="dispute-reason"
              value={formData.reason}
              onChange={handleInputChange('reason')}
              cols={30}
              rows={10}
              className={errors.reason ? 'error' : ''}
            />
          </div>
          <div className="form-group">
            <Button
              type="submit"
              label={isSubmitting ? 'Creating...' : 'Create Dispute'}
              disabled={isSubmitting}
              className='btn-dispute'
            />
          </div>
        </form>
      </div>
    </CreateDisputeWrapper>
  );
};

export default CreateDispute;