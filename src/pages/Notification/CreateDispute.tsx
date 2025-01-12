import React, { useState, FormEvent } from 'react';
import { CreateDisputeWrapper } from './styles';
import { InputField } from '../../stories/Input/InputField';
import Dropdown from '../../stories/Dropdown/Dropdown';
import Button from '../../stories/button/Button';

interface DisputeForm {
  disputeType: string;
  description: string;
}

interface FormErrors {
  disputeType?: string;
  description?: string;
}

interface CreateDisputeProps {
  orderId: string;
}

const CreateDispute = ({ orderId }: CreateDisputeProps) => {
  // Form state - removed orderId since it comes from props
  const [formData, setFormData] = useState<DisputeForm>({
    disputeType: '',
    description: ''
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
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
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
      // Include orderId from props in the submission
      const disputeData = {
        orderId,
        ...formData
      };

      const response = await fetch('/api/disputes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(disputeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create dispute');
      }

      // Reset form after successful submission
      setFormData({
        disputeType: '',
        description: ''
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
            <label htmlFor="dispute-description">
              Dispute Description
              {errors.description && (
                <span className="error-message"> - {errors.description}</span>
              )}
            </label>
            <textarea
              name="dispute-description"
              id="dispute-description"
              value={formData.description}
              onChange={handleInputChange('description')}
              cols={30}
              rows={10}
              className={errors.description ? 'error' : ''}
            />
          </div>
          <div className="form-group">
            <Button
              type="submit"
              label={isSubmitting ? 'Creating...' : 'Create Dispute'}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </CreateDisputeWrapper>
  );
};

export default CreateDispute;