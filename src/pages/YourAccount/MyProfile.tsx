import { useEffect, useState } from 'react';
import { updateUser, User } from '../../store/actions/updateUser';
import toast from 'react-hot-toast';
import { addUserDetails } from '../../store/user/reducer';
import { useDispatch } from 'react-redux';
import PhoneInput from '../../components/Account/PhoneNumber';
import EditableInput from '../../components/Account/EditableInput';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { Avatar, Box, Card, CardActions, CardContent, Container, Divider, Typography, useMediaQuery } from '@mui/material';
import MUIButton from '../../stories/MUIButton/Button';
import { EditIcon, LogOut } from 'lucide-react';
import CustomButton from '../../stories/button/CustomButton';

const MyProfile = () => {
  const { handleLogout = () => {} } = useOutletContext() as { handleLogout: () => void };
  const user = useSelector((state: any) => state.user);  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(user.user);  
  const [editState, setEditState] = useState<{ [key in keyof User]?: boolean }>({});
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  

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
          loading: 'Updating...',
          success: `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} updated successfully`,
          error: 'Failed to update profile'
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
        <CardContent sx={{display: 'flex', gap:2}}>
          <Box>
           <Avatar alt={formData.name} src={formData.avatar} />
          </Box>
          <Box>
            <Typography variant="h6">Welcome {formData.name}</Typography>
            <Typography variant="body1">Email: {formData.email}</Typography>
            <Typography variant="body1">Phone:  {formData.phone_no}</Typography>
          </Box>
        </CardContent>
        <CardActions>
         <CustomButton
           children={
            <>
              <EditIcon  size={15} style={{ marginRight: '4px' }} />
              Edit Profile
            </>
           }
           onClick={()=>{}}
         />
        </CardActions>
      </Card>
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
       Address
      </Typography>
    </Container>
  );
};

export default MyProfile;