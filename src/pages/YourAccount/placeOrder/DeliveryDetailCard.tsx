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
    useTheme,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { formatOrderStatus } from '../../../utils/Validation';


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
    returnDetails: any;
    hasReturnRequest?: boolean;
    stages?: DeliveryStage[];
    deliveryStatus: string;
    returnStatus?: string;
    pickupConfirmationCode: string;
    returnLabelLink: string;
}

const DeliveryDetailSkeleton = () => (


    <Box p={3} border="1px solid #ddd" borderRadius={4} boxShadow={1} width="100%" mx="auto" mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="rectangular" width={100} height={30} />
        </Box>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="rectangular" height={60} width="100%" sx={{ mt: 2 }} />
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
    hasReturnRequest,
    returnStatus,
    pickupConfirmationCode,
    returnLabelLink,
    returnDetails
}) => {
    console.log("returnDetails",)
    const [activeTab, setActiveTab] = React.useState<'shipment' | 'return'>('shipment');
    const isMobile = useMediaQuery("(max-width:600px)");

    if (!stages || stages.length === 0) {
        return <DeliveryDetailSkeleton />;
    }
    console.log("returnDetails",returnDetails[0]?.tracking_id)

    return (
        <Box p={3} border="1px solid #ddd" borderRadius={4} boxShadow={1} width="100%" mx="auto" mb={3} >
            {/* Toggle Buttons */}
            {hasReturnRequest &&
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={1}
                    width="100%"
                    py={0.9}
                    mb={2}
                    sx={{ transform: 'translateY(-1rem) translateX(-0.5rem)' }}
                    bgcolor="#f5f8ff"
                    borderRadius="2rem"
                    boxShadow="0 2px 8px rgba(0,0,0,0.05)"
                >
                    <Button
                        onClick={() => setActiveTab('shipment')}
                        sx={{
                            borderRadius: '2rem',
                            px: { xs: 1, md: 2 },
                            py: { xs: 0.5, md: 1 },
                            backgroundColor: activeTab === 'shipment' ? '#5f28ff' : 'transparent',
                            color: activeTab === 'shipment' ? '#fff' : '#5f28ff',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: 10,
                            boxShadow: activeTab === 'shipment' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                            '&:hover': {
                                backgroundColor: activeTab === 'shipment' ? '#5f28ff' : 'transparent',
                            }
                        }}
                    >
                        DELIVERY DETAIL
                    </Button>

                    <Button
                        onClick={() => setActiveTab('return')}
                        sx={{
                            borderRadius: '2rem',
                            px: { xs: 1, md: 2 },
                            py: { xs: 0.5, md: 1 },
                            backgroundColor: activeTab === 'return' ? '#5f28ff' : 'transparent',
                            color: activeTab === 'return' ? '#fff' : '#5f28ff',
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: 12,
                            '&:hover': {
                                backgroundColor: activeTab === 'return' ? '#5f28ff' : 'transparent',
                            }
                        }}
                    >
                        Return Label
                    </Button>
                </Box>
            }

            {/* Shipment Details */}
            {activeTab === 'shipment' && (
                <>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" color="textSecondary" sx={{ fontSize: isMobile ? '0.8rem' : '1.2rem', fontWeight: 600 }}>Delivery Detail</Typography>
                        <Chip label={deliveryStatus.replace(/_/g, ' ')} color={deliveryStatus === "shipment_cancelled" ? "error" : "success"} variant="outlined" 
                        sx={{
                            fontSize: isMobile ? '0.5rem' : '0.8rem',
                            fontWeight: 600,
                            height:{xs:'1.2rem',md:'1.5rem'}
                        }}/>
                    </Box>

                    <Typography variant="body2" color="textSecondary" mb={2} sx={{ mt: isMobile ? 1 : 0 }}>
                        Tracking ID: <strong>{trackingId}</strong>
                    </Typography>

                    <Box
                        sx={{
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': { height: isMobile ? 10 : 6 },
                            height: isMobile ? "20rem" : 'auto',
                            overflowY: isMobile ? 'auto' : 'auto',
                        }}
                    >
                        <Stepper
                            activeStep={-1}
                            orientation={isMobile ? "vertical" : "horizontal"}
                            alternativeLabel={!isMobile}
                            connector={<CustomConnector />}
                            sx={{
                                m: 2,
                                '& .MuiStepLabel-label': {
                                    color: "#1e6fff",
                                    fontWeight: 500,
                                    fontSize: isMobile ? '0.8rem' : '1rem',
                                },
                                '& .MuiStepIcon-root': {
                                    color: "#1e6fff",
                                },
                                '& .MuiStep-root': {
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                }
                            }}
                        >
                            {stages.map((stage, index) => (
                                <Step key={index}>
                                    <StepLabel>
                                        <Typography fontWeight={600} fontSize={isMobile ? 12 : 14}>
                                            {stage.derivedStatus}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" fontSize={isMobile ? 11 : 13}>
                                            {stage.city}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" fontSize={isMobile ? 10 : 12}>
                                            {stage.scanTimestamp.split('T')[0]}
                                        </Typography>
                                        <br />
                                        <Typography variant="caption" color="textSecondary" fontSize={isMobile ? 10 : 12}>
                                            {stage.scanTimestamp.slice(11)}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </>
            )}

            {/* Return Details */}
            {activeTab === 'return' && returnStatus && (
                <Box mt={2} p={2} border="1px solid #ddd" borderRadius={2} bgcolor="#f9f9f9">
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, fontWeight: 600 }}>
                            Return Status
                        </Typography>
                        <Chip 
                            label={formatOrderStatus(returnDetails[0]?.deliveryStatus)} 
                            color={returnDetails[0]?.deliveryStatus === "return_rejected" ? "error" : "success"} 
                            variant="outlined" 
                            sx={{
                                fontSize: isMobile ? '0.6rem' : '0.9rem',
                                fontWeight: 600,
                                height: { xs: '1.4rem', md: '1.6rem' },
                                borderRadius: '1rem'
                            }} 
                        />
                    </Box>
                    {returnDetails[0]?.rejectReason && (
                        <Typography variant="body2" mb={2} sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, color: 'text.secondary' }}>
                            <strong>Reject Reason:</strong> {returnDetails[0]?.rejectReason}
                        </Typography>
                    )}
                    {returnDetails[0]?.tracking_id && (
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, 
                                    color: 'text.secondary' 
                                }}
                            >
                                <strong>Pickup Confirmation Code:</strong> {returnDetails[0]?.pickup?.pickupConfirmationCode}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, 
                                    color: 'text.secondary' 
                                }}
                            >
                                <strong>Pickup Date and Time:</strong> {new Date(returnDetails[0]?.pickup?.pickupDate).toLocaleDateString()}, {returnDetails[0]?.pickup?.pickuplastTime}
                            </Typography>
                            <Typography 
                                component="a" 
                                href={returnDetails[0]?.labelUrl} 
                                target="_blank" 
                                underline="hover" 
                                sx={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, 
                                    color: '#1e6fff', 
                                    fontWeight: 500 
                                }}
                            >
                                Download Return Label
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default DeliveryTimeline;
