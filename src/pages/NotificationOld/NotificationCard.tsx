import { Box, Typography, Badge, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import airplane from '../../assets/images/airplane.svg';
import MUIButton from '../../stories/MUIButton/Button';
import { ArrowRight } from 'lucide-react';

interface NotificationCardProps {
  title: string;
  orderNumber: string;
  dateTime: string;
  buttonLabel: string;
  status?: string;
  placeOrderStatus?: string;
  onButtonClick?: () => void;
  myOrders?: string;
  isUnread?: boolean;
}

const NotificationCard: FC<NotificationCardProps> = ({
  title,
  orderNumber,
  dateTime,
  buttonLabel,
  onButtonClick,
  status,
  myOrders,
  placeOrderStatus,
  isUnread,
}) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Box
      sx={{
        width: '100%',
        height: isMobile ? '4.5rem' : '7.0625rem',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '0.5rem' : '0.8rem',
        borderRadius: isMobile ? '1rem' : '1.25rem',
        border: '1px solid #bbd6ff',
        background: '#f6faff',
        position: 'relative',
        marginTop: '1rem',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      {/* Image section */}
      <Box
        sx={{
          background: '#f0f6ff',
          boxShadow: '0px 4px 4px rgba(205, 225, 255, 1)',
          height: isMobile ? '3rem' : '95%',
          width: isMobile ? '3rem' : '6rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={airplane}
          alt="icon"
          sx={{ width: isMobile ? '2.5rem' : 'auto' }}
        />
      </Box>

      {/* Text Section */}
      <Box
        sx={{
          marginLeft: isMobile ? '1rem' : '3rem',
          flex: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={500}
          sx={{
            fontSize: isMobile ? '0.7rem' : '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
          {isUnread && (
            <Badge
              variant="dot"
              color="primary"
              sx={{
                marginLeft: '0.5rem',
                '& .MuiBadge-dot': {
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                },
              }}
            />
          )}
        </Typography>

        <Box
          display= 'flex'
          flexDirection='column'
          sx={{
            fontSize: isMobile ? '0.4rem' : '0.6rem',
            fontWeight: 400,
            marginTop: '0.2rem',
          }}
        >
            <Typography component="span"  fontSize={isMobile ? '0.6rem' : '0.8rem'}> 
               ORDER NO : {orderNumber}
          </Typography>
            <Typography
              component="span"
              fontSize={isMobile ? '0.6rem' : '0.8rem'}
            >
            DATE & TIME : {dateTime}
            </Typography>
        </Box>
      </Box>

      {/* Buttons Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignContent="flex-end"
        position={'relative'}
        gap={3}
      >
        {/* Icon Button */}
        <MUIButton
          size="small"
          onClick={onButtonClick}
          icon={<ArrowRight size={20} />}
          btnVariant="icon-soft"
          label={buttonLabel}
        />

        <Box marginLeft={isMobile ? '0.5rem' : '3rem'} >
          {/* Order Status */}
          {placeOrderStatus && (
            <Badge
              badgeContent={placeOrderStatus}
              color={
                placeOrderStatus === 'InProgress'
                  ? 'primary'
                  : placeOrderStatus === 'Success'
                    ? 'success'
                    : 'secondary'
              }
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor:
                    placeOrderStatus === 'InProgress'
                      ? '#f44444'
                      : placeOrderStatus === 'Success'
                        ? '#4caf50'
                        : '#5d96d6',
                  color: 'white',
                  fontSize: isMobile ? '0.3rem' : '0.6rem',
                },
              }}
            />
          )}

          {/* Complaint Status */}
          {status && (
            <Badge
              badgeContent={status}
              color={status === 'InProgress' ? 'primary' : 'secondary'}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor:
                    status === 'InProgress' ? '#5d96d6' : '#f44444',
                  color: 'white',
                  fontSize: isMobile ? '0.3rem' : '0.6rem',
                  borderRadius: '44px',
                },
              }}
            />
          )}

          {/* My Orders */}
          {myOrders && (
            <Badge
              badgeContent={myOrders
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
                .replace('Order', '')}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#5d96d6',
                  color: 'white',
                  fontSize: isMobile ? '0.3rem' : '0.6rem',
                  borderRadius: '44px',
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationCard;
