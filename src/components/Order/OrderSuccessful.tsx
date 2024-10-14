import { Typography } from '@mui/material';
import './style.css';
import OrderSuccessfulIcon from '../../assets/icons/order-successful.png';
const OrderSuccessful = () => {
  return (
    <div className="cardLayout">
      <div className="mainCardContent">
        <img
          style={{ height: '2rem', width: '2rem' }}
          src={OrderSuccessfulIcon}
        />
        <Typography sx={{ color: '#0080FF' }} variant="h2">
          Order Successful
        </Typography>
        <Typography sx={{ color: '#525E86' }} variant="subtitle1">
          Visit Your Account- To view order Details{' '}
        </Typography>
      </div>
    </div>
  );
};
export default OrderSuccessful;
