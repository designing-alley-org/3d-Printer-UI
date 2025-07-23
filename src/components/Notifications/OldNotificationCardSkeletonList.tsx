import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const NotificationCardSkeleton: FC = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0.8rem',
      borderRadius: '1rem',
      border: '1px solid #bbd6ff',
      background: '#f6faff',
      gap: 2,
      mb: 2,
    }}
  >
    {/* Image */}
    <Skeleton variant="rounded" width={60} height={60} />

    {/* Text section */}
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="40%" height={16} />
      <Skeleton variant="text" width="30%" height={16} />
    </Box>

    {/* Button area */}
    <Box>
      <Skeleton variant="circular" width={24} height={24} />
    </Box>
  </Box>
);

const OldNotificationCardSkeletonList: FC = () => {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      {/* Render multiple skeletons to simulate a list */}
      {Array.from({ length: 5 }).map((_, i) => (
        <NotificationCardSkeleton key={i} />
      ))}
    </Box>
  );
};

export default OldNotificationCardSkeletonList;
