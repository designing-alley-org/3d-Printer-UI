import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

const NotificationCardSkeleton: React.FC = () => {
  return (
    <Box marginBottom={2}>
      {/* Top Row Skeleton */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1} marginBottom={1}>
        <Skeleton variant="text" width={120} height={24} />
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="text" width={140} height={24} />
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width={80} height={24} />
        </Stack>
      </Stack>
      {/* Message Row Skeleton */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} border={1} paddingX={2} paddingY={1} borderColor="#9FC2FF" sx={{ borderRadius: '1rem' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={200} height={28} />
        </Stack>
        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
      </Stack>
    </Box>
  );
};

const NotificationCardSkeletonList: React.FC = () => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <NotificationCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default NotificationCardSkeletonList;
