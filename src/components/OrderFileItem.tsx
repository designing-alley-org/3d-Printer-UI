import { Avatar, Box, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material';
import CustomButton from '../stories/button/CustomButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeliveryDetail from './DeliveryDetail';
import FilesList from './FilesList';

interface Props {
   order: {
       _id: string;
       files: number;
       status: string;
       createdAt: string;
   };
   onClick: (id: string) => void;
}

const OrderFileItem = ({ order, onClick }: Props) => {
    const theme = useTheme();
  return (
   <>
    <Card
      sx={{
        borderRadius: '8px',
        backgroundColor: 'primary.main',
        padding: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
           <Box display="flex" alignItems="center">
            <Box width={'46px'} height={'46px'} borderRadius={'50%  '} overflow={'hidden'} sx={{
                backgroundColor: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <CheckTwoToneIcon fontSize='large'/>
            </Box>
            <Box ml={2}>
              <Typography variant="h6" color='primary.contrastText' gutterBottom>{order._id}</Typography>
              <Typography variant="body2" color={theme.palette.customColors.lightTextOverDark}>
               Created On: {order.createdAt}
              </Typography>
            </Box>
             <Box ml={4}>
              <Typography variant="h6" color='primary.contrastText' gutterBottom> {order.files} File</Typography>
              <Typography variant="body2" color={theme.palette.customColors.lightTextOverDark}>
                Status: 
              </Typography>
            </Box>
        </Box>
      </CardContent>
      <CardActions>
        <CustomButton
          sx={{
            color: 'primary.contrastText',
          }}
        >
          <ArrowForwardIosOutlinedIcon fontSize="large" />
        </CustomButton>
      </CardActions>
    </Card>

{/* DeliveryDetail */}
<DeliveryDetail />

<FilesList />

<Box display='flex' gap={1} justifyContent='end' mt={2}>
    <CustomButton variant="contained" 
    sx={{
        borderRadius: '4px',
    }}
    onClick={() => onClick(order._id)}
    children='Return'
    />
    <CustomButton variant="contained" 
    sx={{
        borderRadius: '4px',
    }}
    onClick={() => onClick(order._id)}
    children='Dispute'
    />
</Box>

   </>
  );
};

export default OrderFileItem;
