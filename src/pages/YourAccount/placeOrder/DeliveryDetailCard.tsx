import * as React from 'react';
import {
    Box,
    Typography,
    Chip,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    Skeleton,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface DeliveryStage {
    derivedStatus: string;
    city: string;
    scanTimestamp: string;
    completed?: boolean;
    location?: string;
    dateTime?: string;
}

interface DeliveryTimelineProps {
    trackingId: string;
    stages?: DeliveryStage[];
    deliveryStatus: string;
    returnStatus?: string;
    pickupConfirmationCode: string;
    returnLabelLink: string;
}


const DeliveryDetailSkeleton = () => {
    return (
        <Box p={3} border="1px solid #ddd" borderRadius={4} boxShadow={1} width="100%" mx="auto" mb={3}>
            {/* Delivery Status Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="rectangular" width={100} height={30} />
            </Box>

            {/* Tracking ID Section */}
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />

            {/* Stepper (Delivery Stages) */}
            <Skeleton variant="rectangular" height={60} width="100%" sx={{ mt: 2 }} />

            {/* Return Status Section */}
            <Box mt={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="rectangular" width={100} height={30} />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="40%" />
                </Box>
            </Box>
        </Box>
    );
};

// Custom connector style
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1e6fff',
        borderTopWidth: 2,
    },
}));

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({
    trackingId,
    stages,
    deliveryStatus,
    returnStatus,
    pickupConfirmationCode,
    returnLabelLink
}) => {
    const theme = useTheme();
    console.log("stages", stages);

    if (!stages || stages.length === 0) {
        return (
            <DeliveryDetailSkeleton/>
        );
    }
    

    return (
        <Box p={3} border="1px solid #ddd" borderRadius={4} boxShadow={1} width="100%" mx="auto" mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Delivery Detail</Typography>
                <Chip label={deliveryStatus} color="primary" variant="outlined" />
            </Box>

            <Typography variant="body2" color="textSecondary" mb={2}>
                Tracking ID: <strong>{trackingId}</strong>
            </Typography>

            <Stepper
                alternativeLabel
                activeStep={-1}
                connector={<CustomConnector />}
                sx={{
                    '& .MuiStepLabel-label': {
                        color: "#1e6fff",
                        fontWeight: 500
                    },
                    '& .MuiStepIcon-root': {
                        color: "#1e6fff",
                    }
                }}
            >
                {stages.map((stage, index) => (
                    <Step key={index}>
                        <StepLabel>
                            <Typography fontWeight={600}>{stage.derivedStatus}</Typography>
                            <Typography variant="body2" color="textSecondary">{stage.city}</Typography>
                            <Typography variant="caption" color="textSecondary">{stage.scanTimestamp.split('T')[0]}</Typography> 
                            <br />
                            <Typography variant="caption" color="textSecondary">{stage.scanTimestamp.slice(11)}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

           {returnStatus && <Box mt={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">Return Status</Typography>
                    <Chip label={returnStatus} color="primary" variant="outlined" />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <Typography variant="body2" mb={1}>
                        Pickup Confirmation Code: <strong>{pickupConfirmationCode}</strong>
                    </Typography>
                    <Typography component="a" href={returnLabelLink} target="_blank" underline="hover">
                        📄 Download Return Label
                    </Typography>
                </Box>
            </Box>}
        </Box>
    );
};

export default DeliveryTimeline;
