import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Card, CardActions, CardContent, CircularProgress, Container, Typography, useMediaQuery } from '@mui/material';
import { EditIcon } from 'lucide-react';
import CustomButton from '../../stories/button/CustomButton';
import { getAddress } from '../../store/actions/getAddress';
import { updateUser, User } from '../../store/actions/updateUser';
import { addUserDetails } from '../../store/user/reducer';
import NoDataFound from '../../components/NoDataFound';
import ListAddress from '../../components/ListAddress/ListAddress';
import EditProfileModal from '../../components/Model/EditProfileModal';
import toast from 'react-hot-toast';
import { setDefaultAddressService } from '../../services/address';
import { EditEmailModal } from '../../components/Model';
import LoadingScreen from '../../components/LoadingScreen';

const MyProfile = () => {
  const user = useSelector((state: any) => state.user);
;
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(useSelector((state: any) => state.user.user.defaultAddress));
  const [allAddresses, setAllAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const handleAddressSelect = (addressId: string) => {
    setDefaultAddressService(addressId, setSelectedAddressId);
  };

  const handleSaveEmail = (email: string) => {
    // Dispatch an action to update the email in the user profile
    // dispatch(updateUser({ ...user.user, email }));
  };

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handleSaveProfile = async (updatedUser: User) => {
    try {
      setSaveLoading(true);
      
      const res = await toast.promise(
        updateUser(updatedUser),
        {
          loading: 'Updating profile...',
          success: 'Profile updated successfully',
          error: 'Failed to update profile'
        }
      );
      
      dispatch(addUserDetails(res.data.data));
      setEditModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
   const fetchAddresses = async () => {
     const response = await getAddress({setAddressLoading});
     setAllAddresses(response.data.data);
   };

   fetchAddresses();
  }, []);

  return (
    // <>
    //   <h1 className="prof">PROFILE INFORMATION</h1>
    //   <form onSubmit={(e) => e.preventDefault()}>
    //     <>
    //       {(['name', 'email'] as (keyof User)[]).map(field => (
    //         <div key={field}>
    //           <p>{field === 'name' ? 'Full Name' : 'Email Address'}</p>
    //           <EditableInput
    //             name={field}
    //             value={formData[field]}
    //             placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
    //             disabled={!editState[field]}
    //             isLoading={isLoading}
    //             handleSave={() => handleSave(field)}
    //             onChange={(value) => handleInputChange(field, value)}
    //             isEditing={!!editState[field]}
    //             setEditing={(state) => setEditState(prev => ({ ...prev, [field]: state }))}
    //           />
    //         </div>
    //       ))}
    //       <p>Phone Number</p>
    //       <PhoneInput
    //         phoneNumber={formData.phone_no}
    //         extension={formData.phone_ext} 
    //         disabled={!editState.phone_no}
    //         isLoading={isLoading}
    //         handleSave={() => handleSave('phone_no')}
    //         onPhoneChange={(value) => handleInputChange('phone_no', value)}
    //         onExtensionChange={(value) => handleInputChange('phone_ext', value)} 
    //         setEditing={(state) => setEditState(prev => ({ ...prev, phone_no: state }))}
    //         isEditing={!!editState.phone_no}
    //       />
    //       {isSmallScreen && (
    //         <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '2.5rem' }}>
    //         <MUIButton
    //           label="Logout"
    //           icon={<LogOut size={15} />}
    //           btnVariant="dark"
    //           onClick={handleLogout}
    //           size='small'
    //         />
    //         </Box>
    //       )}
    //     </>
    //   </form>
    // </>
    <Container sx={{ p: { xs: 2, sm: 3, md: 0 }}}>
      <Card sx={{ padding: 0, borderRadius: '8px', bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between' }}>
        <CardContent sx={{display: 'flex', gap:2, flexDirection: { xs: 'column', sm: 'row' }}}>
          <Box>
           <Avatar alt={user.user.name} src={user.user.avatar} />
          </Box>
          <Box>
            <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.5rem' }}>Welcome {user.user.name}</Typography>
            <Typography variant="body1">Email: {user.user.email}</Typography>
            <Typography variant="body1">Phone:  {user.user.phone_no}</Typography>
          </Box>
        </CardContent>
        <CardActions >
         <CustomButton
           children={
            <>
              <EditIcon  size={15} style={{ marginRight: '4px' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Edit Profile</Typography>
            </>
           }
           onClick={handleEditProfile}
         />
          <CustomButton
           children={
            <>
              <EditIcon  size={15} style={{ marginRight: '4px' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Edit Email</Typography>
            </>
           }
           onClick={() => setEditEmailModalOpen(true)}
         />
        </CardActions>
      </Card>
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
       Address
      </Typography>

      <Box maxHeight={isSmallScreen ? "300px" : "400px"} overflow="auto">
      {allAddresses.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {
            addressLoading ?
             <LoadingScreen />
             :
              <NoDataFound  text="No addresses found."  description='Currently, there are no addresses available.'/>
          }
        </Box>
      ) : (
        allAddresses.map((address: any, index: number) => (
          <ListAddress
            key={address._id}
            address={address}
            index={index}
            selectedAddressId={selectedAddressId || undefined}
            onAddressSelect={handleAddressSelect}
            showRadio={true}
            showEdit={false}
          />
        ))
      )}
    </Box>

    {/* Edit Profile Modal */}
    <EditProfileModal
      open={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      user={user.user}
      onSave={handleSaveProfile}
      loading={saveLoading}
    />
    <EditEmailModal
      open={editEmailModalOpen}
      onClose={() => setEditEmailModalOpen(false)}
      email={user.user.email}
      onSave={handleSaveEmail}
      loading={saveLoading}
    />
    </Container>
  );
};

export default MyProfile;