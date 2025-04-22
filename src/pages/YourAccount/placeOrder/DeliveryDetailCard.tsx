import React from 'react';
import {
    Box,
    Typography,
    Link,
    Chip,
    useTheme
} from '@mui/material';
import { styled } from '@mui/system';

interface DeliveryStage {
    label: string;
    location: string;
    dateTime: string;
    completed: boolean;
}

interface DeliveryTimelineProps {
    trackingId: string;
    stages: DeliveryStage[];
    deliveryStatus: string;
    returnStatus: string;
    pickupConfirmationCode: string;
    returnLabelLink: string;
}

const TimelineContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginTop: '16px',
    paddingBottom: '24px'
});

const StepCircle = styled('div')<{ completed: boolean }>(({ completed }) => ({
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: completed ? '#3f51b5' : '#ccc',
    border: completed ? 'none' : '2px solid #ccc',
    zIndex: 1
}));

const StepLine = styled('div')<{ completed: boolean }>(({ completed, theme }) => ({
    minWidth: 2,
    flexGrow: 1,
    backgroundColor: completed ? theme.palette.primary.main : '#ccc',
    height: 2,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    zIndex: 0
}));

const StepLabel = styled(Box)({
    textAlign: 'center',
    marginTop: 8,
    minWidth: 120
});

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({
    trackingId,
    stages,
    deliveryStatus,
    returnStatus,
    pickupConfirmationCode,
    returnLabelLink
}) => {
    const theme = useTheme();

    return (
        <Box p={3} border="1px solid #ddd" borderRadius={4} boxShadow={1} width="100%" mx="auto" mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Delivery Detail</Typography>
                <Chip label={deliveryStatus} color="primary" variant="outlined" />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="body2" color="textSecondary">
                    Tracking ID: <strong>{trackingId}</strong>
                </Typography>
            </Box>

            <TimelineContainer>
                {stages.map((stage, index) => (
                    <React.Fragment key={index}>
                        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                            <StepCircle completed={stage.completed} />
                            <StepLabel>
                                <Typography variant="body2" fontWeight={600}>{stage.label}</Typography>
                                <Typography variant="body2" color="textSecondary">{stage.location}</Typography>
                                <Typography variant="caption" color="textSecondary">{stage.dateTime}</Typography>
                            </StepLabel>
                        </Box>
                        {index < stages.length - 1 && (
                            <Box
                                flexGrow={1}
                                height={2}
                                bgcolor={stage.completed ? theme.palette.primary.main : '#ccc'}
                                mt={-2}
                                zIndex={0}
                            />
                        )}
                    </React.Fragment>
                ))}
            </TimelineContainer>

            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">Return Status</Typography>
                    <Chip label={returnStatus} color="primary" variant="outlined" />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <Typography variant="body2" mb={1}>
                        Pickup Confirmation Code: <strong>{pickupConfirmationCode}</strong>
                    </Typography>
                    <Link href={returnLabelLink} underline="hover" target="_blank">
                        📄 Download Return Label
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default DeliveryTimeline;
