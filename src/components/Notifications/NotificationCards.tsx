import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  useMediaQuery,
  Badge,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MUIButton from '../../stories/MUIButton/Button';
import { Bell } from 'lucide-react';

interface NotificationCardProps {
  orderId: string;
  dateTime: string;
  statusText?: string;
  statusColor?: string;
  message: string;
  buttonText: string;
  isUnread?: boolean;
  onButtonClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  orderId,
  dateTime,
  statusText,
  statusColor = 'green',
  message,
  buttonText,
  onButtonClick,
  isUnread = false,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box marginBottom={2}>
      {/* Top Row: Order ID and Date */}
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems={isMobile ? 'flex-start' : 'center'}
        spacing={1}
        marginBottom={1}
        color={'#002E72'}
      >
        <Typography variant="body2">
          Order No. <strong>{orderId}</strong>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">
            Date & time: <strong>{dateTime}</strong>
          </Typography>
          {statusText && (
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Payment Status:{' '}
              <FiberManualRecordIcon
                sx={{ color: statusColor, fontSize: 12, mx: 0.5 }}
              />
              <strong>{statusText}</strong>
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* Message Row */}
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        border={1}
        paddingX={2}
        paddingY={1}
        borderColor="#9FC2FF"
        sx={{
          borderRadius: '1rem',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Badge color="secondary" variant={isUnread ? 'dot' : 'standard'}>
            <Bell color={'#0066FF'} fill="#0066FF" />
          </Badge>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: '#003366' }}
            fontSize={{ xs: '0.9rem', md: '1rem' }}
          >
            {message}
          </Typography>
        </Stack>

        <MUIButton
          btnVariant="icon-soft"
          icon={<ArrowForwardIcon />}
          onClick={onButtonClick}
          label={buttonText}
          size="small"
          style={{ minWidth: '100px' }}
        />
      </Stack>
    </Box>
  );
};

export default NotificationCard;
