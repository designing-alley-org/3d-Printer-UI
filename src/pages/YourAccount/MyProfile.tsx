import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CustomButton from '../../stories/button/CustomButton';
import { getAddress } from '../../store/actions/getAddress';
import NoDataFound from '../../components/NoDataFound';
import ListAddress from '../../components/ListAddress/ListAddress';
import { setDefaultAddressService } from '../../services/address';
import {  EditProfileModal } from '../../components/Model';
import LoadingScreen from '../../components/LoadingScreen';
import {
  updateUserService,
} from '../../services/user';
import { addUserDetails } from '../../store/user/reducer';
import { editUser } from '../../types';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    useSelector((state: any) => state.user.user.defaultAddress)
  );
  const [allAddresses, setAllAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [saveLoading, setSaveLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const dispatch = useDispatch();

  const handleAddressSelect = (addressId: string) => {
    setDefaultAddressService(addressId, setSelectedAddressId);
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

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await getAddress({ setAddressLoading });
      setAllAddresses(response.data.data);
    };

    fetchAddresses();
  }, []);

  return (
    <Container sx={{ p: { xs: 0.5, sm: 3, md: 0 } }}>
      <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardContent
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box>
            <Typography
              variant={'h6'}
              color="primary.main"
              fontSize={{ xs: '1rem', sm: '1.2rem' }}
            >
              Welcome {user.user.name}
            </Typography>
            <Typography variant="body1">Email: {user.user.email}</Typography>
          </Box>
        </CardContent>
        <CardActions>
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
            onClick={() => setEditModalOpen(true)}
          />
        </CardActions>
      </Card>
      <Typography variant="h6" sx={{ marginTop: '1rem' }} color="primary.main">
        Address
      </Typography>

      <Box maxHeight={isSmallScreen ? '380px' : '470px'} overflow="auto">
        {allAddresses.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {addressLoading ? (
              <LoadingScreen
                title=" Addresses..."
                description="Please wait while we fetch your addresses."
              />
            ) : (
              <NoDataFound
                text="No addresses found."
                description="Currently, there are no addresses available."
              />
            )}
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
    </Container>
  );
};

export default MyProfile;
