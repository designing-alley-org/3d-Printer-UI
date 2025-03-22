import { useEffect, useState } from 'react';
import { updateUser, User } from '../../store/actions/updateUser';
import { MainWrap, ProfileWrapper } from './styles';
import { toast } from 'react-toastify';
import { addUserDetails } from '../../store/user/reducer';
import { useDispatch } from 'react-redux';
import PhoneInput from '../../components/Account/PhoneNumber';
import EditableInput from '../../components/Account/EditableInput';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const user = useSelector((state: any) => state.user);  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(user.user);  
  const [editState, setEditState] = useState<{ [key in keyof User]?: boolean }>({});
  const dispatch = useDispatch();

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field: keyof User) => {
    if (!formData[field]) {
      toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Special case for phone_no to include extension
      const updateData = field === 'phone_no' 
        ? { phone_no: formData.phone_no, phone_ext: formData.phone_ext }
        : { [field]: formData[field] };

      const res = await toast.promise(
        updateUser(updateData),
        {
          pending: 'Updating...',
          success: `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} updated successfully`,
        },
      );
      
      dispatch(addUserDetails(res.data.data));
      setEditState(prev => ({ ...prev, [field]: false }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData(user.user);
  }, [user.user]);

  return (
    <ProfileWrapper>
      <h1 className="prof">PROFILE INFORMATION</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <MainWrap>
          {(['name', 'email'] as (keyof User)[]).map(field => (
            <div key={field}>
              <p>{field === 'name' ? 'Full Name' : 'Email Address'}</p>
              <EditableInput
                name={field}
                value={formData[field]}
                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                disabled={!editState[field]}
                isLoading={isLoading}
                handleSave={() => handleSave(field)}
                onChange={(value) => handleInputChange(field, value)}
                isEditing={!!editState[field]}
                setEditing={(state) => setEditState(prev => ({ ...prev, [field]: state }))}
              />
            </div>
          ))}
          <p>Phone Number</p>
          <PhoneInput
            phoneNumber={formData.phone_no}
            extension={formData.phone_ext} 
            disabled={!editState.phone_no}
            isLoading={isLoading}
            handleSave={() => handleSave('phone_no')}
            onPhoneChange={(value) => handleInputChange('phone_no', value)}
            onExtensionChange={(value) => handleInputChange('phone_ext', value)} 
            setEditing={(state) => setEditState(prev => ({ ...prev, phone_no: state }))}
            isEditing={!!editState.phone_no}
          />
        </MainWrap>
      </form>
    </ProfileWrapper>
  );
};

export default MyProfile;