import { useNavigate } from 'react-router-dom';
import MUIButton from '../../stories/MUIButton/Button';
import { Box } from '@mui/material';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <Box minHeight="calc(100vh - 2rem)" display="flex" flexDirection="column" alignItems="center" position='relative'>
       <MUIButton
        label="Get Quote"
        onClick={() => navigate('/get-quotes')}
        size='large'
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      />
    </Box>
  );
};

export default DashboardLayout;
