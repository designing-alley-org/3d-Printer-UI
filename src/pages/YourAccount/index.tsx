import { Container, Typography } from '@mui/material';
import AccountLayout from './AccountLayout';

const Account = () => {
  return (
     <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom >
        My Account
      </Typography>
     <Typography variant="body1">
     Manage your profile, orders, and settings
     </Typography>
      <AccountLayout />
    </Container>
  );
};

export default Account;
