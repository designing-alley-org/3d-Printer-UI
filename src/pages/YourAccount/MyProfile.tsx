import { useState, useEffect } from 'react';
import { cross } from '../../constants';
import { updateUser, User } from '../../store/actions/updateUser';
import ButtonIcon from '../../stories/BottonIcon/ButtonIcon';
import Button from '../../stories/button/Button';
import { MainWrap, ProfileWrapper } from './styles';
import { toast } from 'react-toastify';
import { addUserDetails } from '../../store/user/reducer';
import { useDispatch } from 'react-redux';

interface IProfile {
  profileData: User;
}

const MyProfile = ({ profileData }: IProfile) => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [formData, setFormData] = useState<User>({ ...profileData, phone_no:profileData.phone_no || '' });
  const [hasChanges, setHasChanges] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setHasChanges(
      formData.name !== profileData.name ||
      formData.email !== profileData.email ||
      formData.phone_no !== profileData.phone_no
    );
  }, [formData, profileData]);

  const handleEdit = () => {
    setInputDisabled(false);
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setInputDisabled(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return; 
    try {
      const res = await updateUser(formData); 
      await dispatch(addUserDetails(res.data.data));
      toast.success('Profile updated successfully');
      setInputDisabled(true);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <ProfileWrapper>
      <h1 className="prof">PROFILE INFORMATION</h1>
      <form onSubmit={handleSave}>
      <MainWrap>
        <span>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            disabled={inputDisabled}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputDisabled ? 'input-disabled' : ''}
          />
        </span>
        <span>
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            disabled={inputDisabled}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputDisabled ? 'input-disabled' : ''}
          />
        </span>
        <span>
          <p>Phone Number</p>
          <span className="btn">
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={formData.phone_no}
              disabled={inputDisabled}
              onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
              className={inputDisabled ? 'input-disabled' : ''}
            />
            {inputDisabled ? (
              <Button label="Edit" onClick={handleEdit} />
            ) : (
                <Button label="Save Data" onClick={handleSave} disabled={!hasChanges} />
            )}
          </span>
        </span>
      </MainWrap>
      </form>
    </ProfileWrapper>
  );
};

export default MyProfile;