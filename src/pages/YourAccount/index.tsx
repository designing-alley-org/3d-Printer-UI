import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import AccountLayout from './AccountLayout';
import CustomButton from '../../stories/button/CustomButton';
import { EditProfileModal } from '../../components/Model';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUserDetails } from '../../store/user/reducer';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { updateUserService } from '../../services/user';
import { editUser } from '../../types';

const Account = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [saveLoading, setSaveLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handleSaveProfile = async (updatedUser: editUser) => {
    try {
      setSaveLoading(true);
      const res = await updateUserService(updatedUser);
      dispatch(addUserDetails(res));
      setEditModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CustomButton
          children={
            <Tooltip title="Edit Profile" placement="top">
              <IconButton>
                <CreateOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: '4px' }}
                />
              </IconButton>
            </Tooltip>
          }
          sx={{
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={handleEditProfile}
        />
      </Box>

      <AccountLayout />
      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user.user}
        onSave={handleSaveProfile}
        loading={saveLoading}
      />
    </Container>
  );
};

export default Account;
