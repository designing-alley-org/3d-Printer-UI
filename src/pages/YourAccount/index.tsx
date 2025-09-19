import { Container } from '@mui/material';
import AccountLayout from './AccountLayout';

const Account = () => {

  return (
    <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <AccountLayout />
    </Container>
  );
};

export default Account;
