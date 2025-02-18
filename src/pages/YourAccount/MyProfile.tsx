import { useState } from 'react';
import { updateUser, User } from '../../store/actions/updateUser';
import { MainWrap, ProfileWrapper } from './styles';
import { toast } from 'react-toastify';
import { addUserDetails } from '../../store/user/reducer';
import { useDispatch } from 'react-redux';
import { Edit2, SaveIcon } from 'lucide-react';

interface IProfile {
  profileData: User;
}

const MyProfile = ({ profileData }: IProfile) => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: profileData.name,
    email: profileData.email,
    phone_no: profileData.phone_no
  });

  const dispatch = useDispatch();

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetEditStates = () => {
    setIsNameEdit(false);
    setIsEmailEdit(false);
    setIsPhoneEdit(false);
  };

  const handleSave = async (field: keyof User) => {
    if (!formData[field]) {
      toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`);
      return;
    }

    try {
      setIsLoading(true);
      
      // Only update the field that was edited
      const updateData = { [field]: formData[field] };
      const response =  updateUser(updateData);
      const res = await toast.promise(response, {
        pending: 'Updating...',
        success: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`,
      });
      // Update Redux store
      dispatch(addUserDetails(res.data.data));
      
      // Reset edit state for the specific field
      switch (field) {
        case 'name':
          setIsNameEdit(false);
          break;
        case 'email':
          setIsEmailEdit(false);
          break;
        case 'phone_no':
          setIsPhoneEdit(false);
          break;
      }
    } catch (error: any) {
      if(error.response) {
      toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (
    label: string,
    field: keyof User,
    type: string,
    isEditing: boolean,
    setEditing: (value: boolean) => void
  ) => (
    <span>
      <p>{label}</p>
      <input
        type={type}
        placeholder={`Enter ${label}`}
        value={formData[field] || ''}
        disabled={!isEditing || isLoading}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={!isEditing ? 'input-disabled' : ''}
      />
      <span 
        className="edit-btn" 
        onClick={() => {
          if (isLoading) return;
          if (!isEditing) {
            setEditing(true);
          } else {
            handleSave(field);
          }
        }}
      >
        {!isEditing ? <Edit2 /> : <SaveIcon />}
      </span>
    </span>
  );

  return (
    <ProfileWrapper>
      <h1 className="prof">PROFILE INFORMATION</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <MainWrap>
          {renderField('Full Name', 'name', 'text', isNameEdit, setIsNameEdit)}
          {renderField('Email', 'email', 'email', isEmailEdit, setIsEmailEdit)}
          {renderField('Phone Number', 'phone_no', 'tel', isPhoneEdit, setIsPhoneEdit)}
        </MainWrap>
      </form>
    </ProfileWrapper>
  );
};

export default MyProfile;