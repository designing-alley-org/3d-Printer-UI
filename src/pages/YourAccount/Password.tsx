import React, { useState } from 'react';
import { PasswordWrapper } from './styles';
import { InputField } from '../../stories/Input/InputField';
import Button from '../../stories/button/Button';
import { toast } from 'react-toastify';
import { updatePassword } from '../../store/actions/updatePassword';

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
    
    const handleChange = (key: keyof FormState) => (value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setErr(''); // Clear errors when user makes changes
    };
    
    const validatePassword = (password: string): boolean => {
        const minLength = 6;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length < minLength) {
            setErr(`Password must be at least ${minLength} characters long`);
            return false;
        }
        if (!hasNumber) {
            setErr('Password must contain at least one number');
            return false;
        }
        if (!hasSpecial) {
            setErr('Password must contain at least one special character');
            return false;
        }
        return true;
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
        if (!validatePassword(form.new_password)) {
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
            await toast.promise(response, { pending: 'Updating...', success: 'Password updated successfully' });
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
                    <div className="button-wrapper">
                        <Button
                            className="button-save"
                            label={loading ? 'Saving...' : 'Save'}
                            type="submit"
                            disabled={!hasChanges}
                        />
                    </div>
                </form>
            </div>
        </PasswordWrapper>
    );
};

export default Password;