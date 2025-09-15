import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  Box, Card, CardActions, CardContent, Container, Typography, useMediaQuery } from '@mui/material';
import { EditIcon } from 'lucide-react';
import CustomButton from '../../stories/button/CustomButton';
import { getAddress } from '../../store/actions/getAddress';
import NoDataFound from '../../components/NoDataFound';
import ListAddress from '../../components/ListAddress/ListAddress';
import { setDefaultAddressService } from '../../services/address';
import { EditEmailModal } from '../../components/Model';
import LoadingScreen from '../../components/LoadingScreen';

const MyProfile = () => {
  const user = useSelector((state: any) => state.user);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(useSelector((state: any) => state.user.user.defaultAddress));
  const [allAddresses, setAllAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);

  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const handleAddressSelect = (addressId: string) => {
    setDefaultAddressService(addressId, setSelectedAddressId);
  };

  const handleSaveEmail = (email: string) => {
    setSaveLoading(true);
    setTimeout(() => {
      setSaveLoading(false);
      setEditEmailModalOpen(false);
    }, 2000);
    email
  };



  useEffect(() => {
   const fetchAddresses = async () => {
     const response = await getAddress({setAddressLoading});
     setAllAddresses(response.data.data);
   };

   fetchAddresses();
  }, []);

  return (
    <Container sx={{ p: { xs: 0.5, sm: 3, md: 0 }}}>
      <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardContent sx={{display: 'flex', gap:2, flexDirection: { xs: 'column', sm: 'row' }}}>
          <Box>
            <Typography variant={"h6"} color='primary.main' fontSize={{ xs: '1rem', sm: '1.2rem' }}>Welcome {user.user.name}</Typography>
            <Typography variant="body1">Email: {user.user.email}</Typography>
          </Box>
        </CardContent>
        <CardActions >
       
          <CustomButton
           children={
            <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} alignItems='center'>
              <EditIcon  size={15} style={{ marginRight: '4px' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Edit Email</Typography>
            </Box>
           }
           onClick={() => setEditEmailModalOpen(true)}
         />
        </CardActions>
      </Card>
      <Typography variant="h6" sx={{ marginTop: '1rem' }} color='primary.main'>
       Address
      </Typography>

      <Box maxHeight={isSmallScreen ? "380px" : "470px"} overflow="auto">
      {allAddresses.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {
            addressLoading ?
             <LoadingScreen  title=' Addresses...' description='Please wait while we fetch your addresses.'/>
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