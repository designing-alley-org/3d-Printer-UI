import { useRef, useState } from 'react';


import {
  Badge,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Bell } from 'lucide-react';

const NotificationBox = () => {

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);
 const isMobile = useMediaQuery('(max-width:600px)');
 const theme = useTheme();
  

  return (
    <Box position="relative" display="inline-block">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setShowNotification((prev) => !prev);
        }}
      >
        <Badge
          // badgeContent={notification.length}
          color="error"
          // invisible={notification.length === 0}
        >
          <Bell size={22} color={theme.palette.primary.contrastText} />
        </Badge>
      </IconButton>

      {showNotification && (
        <Box
          ref={notificationRef}
          position="absolute"
          top="3rem"
          left={isMobile ? '-9rem' : '-7rem'}
          zIndex={1000}
        >
        </Box>
      )}
    </Box>
  );
};

export default NotificationBox;
