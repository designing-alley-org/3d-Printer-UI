import React, { useState } from 'react';
import { PasswordWrapper } from './styles';
import { InputField } from '../../stories/Input/InputField';
import toast from 'react-hot-toast';
import { updatePassword } from '../../store/actions/updatePassword';
import { validatePassword } from '../../utils/Validation';
import MUIButton from '../../stories/MUIButton/Button';
import { Box, useMediaQuery } from '@mui/material';

interface FormState {
    old_password: string;
    new_password: string;
    confirmPassword?: string;
}

const Password = () => {
    const [form, setForm] = useState<FormState>({
        old_password: '',
        new_password: '',
        confirmPassword: ''
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Check if all fields have values and are different from their initial state
    const hasChanges = Object.values(form).every(value => value.length > 0);
    const isSmallScreen = useMediaQuery('(max-width:768px)');
    const handleChange = (key: keyof FormState) => (value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setErr(''); // Clear errors when user makes changes
    };
    
    
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr('');
        
        // Validate old password is not empty
        if (!form.old_password) {
            setErr('Please enter your current password');
            return;
        }
        
        // Validate new password
        if (!validatePassword(form.new_password, setErr)) {
            return;
        }
        
        // Validate confirm password
        if (form.new_password !== form.confirmPassword) {
            setErr('Passwords do not match');
            return;
        }
        
        // Validate new password is different from old password
        if (form.old_password === form.new_password) {
            setErr('New password must be different from current password');
            return;
        }
        
        try {
            setLoading(true);
            const { old_password, new_password } = form;
            const response =  updatePassword(old_password, new_password);
            await toast.promise(response, { 
                loading: 'Updating...', 
                success: 'Password updated successfully',
                error: 'Failed to update password'
            });
            setForm({ old_password: '', new_password: '', confirmPassword: '' });
            setLoading(false);
        } catch (error:any) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <PasswordWrapper>
            <h1 className="header">Change Password</h1>
            <div className="main">
                <form onSubmit={handleSave} className="form">
                    <div className="form-inputs">
                        {[
                            { key: 'old_password', label: 'Current Password' },
                            { key: 'new_password', label: 'New Password' },
                            { key: 'confirmPassword', label: 'Confirm Password' }
                        ].map(({ key, label }) => (
                            <InputField
                                key={key}
                                type={key === 'new_password' ? 'password' : 'text'}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                value={form[key as keyof FormState]}
                                onChange={handleChange(key as keyof FormState)}
                                size="large"
                                label={label}
                                labelClassName="label"
                                required
                            />
                        ))}
                        {err && <p className="error">{err}</p>}
                    </div>
                    <Box sx={{ position: 'relative', mt: isSmallScreen ? 4 : 27 }}>
                        <MUIButton
                            label={loading ? 'Saving...' : 'Save Password'}
                            disabled={!hasChanges}
                            type="submit"
                        />
                    </Box>
                </form>
            </div>
        </PasswordWrapper>
    );
};

export default Password;