import React from 'react';
import { Paper, Box, Skeleton, Stack } from '@mui/material';

const StepLayoutSkeleton = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                padding: '2rem',
                borderRadius: { xs: '0.5rem', md: '1rem' },
                minHeight: '36rem',
                backgroundColor: 'background.paper',
            }}
            data-testid="step-layout-skeleton"
        >
            {/* Header Skeleton */}
            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Skeleton variant="text" width="35%" height={44} />
                <Skeleton variant="circular" width={36} height={36} />
            </Box> */}

            {/* Subheader Skeleton */}
            <Skeleton variant="text" width="60%" height={28} sx={{ mb: 2 }} />

            {/* Content Skeleton */}
            <Stack spacing={2} sx={{ mb: 3 }}>
                <Skeleton variant="rectangular" width="100%" height={80} />
                <Skeleton variant="rectangular" width="100%" height={80} />
            </Stack>

            {/* Footer Skeleton */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 4,
                }}
            >
                <Skeleton variant="rectangular" width={160} height={52} />
            </Box>
        </Paper>
    );
};

export default StepLayoutSkeleton;