import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import TrackingStepper from './TrackingStepper';
import { useEffect, useState } from 'react';
import { trackByTrackingNumberService } from '../services/fedex';
import { formatText } from '../utils/function';


interface DeliveryDetailProps {
  shipment: any;
  return: any;
}

const DeliveryDetail = ({
  shipment,
  return: returnInfo,
}: DeliveryDetailProps) => {
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [trackingError, setTrackingError] = useState(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await trackByTrackingNumberService(
          shipment?.trackingId,
          setTrackingError
        );
        setTrackingDetails(response?.data?.scanEvents);
      } catch (error) {
        console.error('Error fetching tracking details:', error);
      }
    };
    if (shipment?.trackingId) {
      fetchTrackingDetails();
    }
  }, [shipment?.trackingId]);

  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: '8px',
        padding: '0px',
        border: '1px dashed #C5C5C5',
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h5"
            sx={{ fontWeight: '600', color: 'primary.main' }}
          >
            Delivery Detail
          </Typography>
        }
        subheader={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: '600',
              }}
            >
              Status:
              <Typography
                sx={{ color: 'secondary.main', ml: '4px', fontWeight: '500' }}
              >
                {shipment?.status || 'N/A'}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: '600',
              }}
            >
              Tracking ID:
              <Typography
                sx={{ color: 'secondary.main', ml: '4px', fontWeight: '500' }}
              >
                {shipment?.trackingId || 'N/A'}
              </Typography>
            </Typography>
          </Box>
        }
      />
      <CardContent>
        {/* Timeline */}
        <Box
          sx={{
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          <TrackingStepper
            steps={trackingDetails}
            trackingError={trackingError}
          />
        </Box>
        {/* Footer */}

        {returnInfo?.created && (
          <Box
            display="flex"
            justifyContent="space-between"
            mt={2}
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ color: 'primary.main', fontWeight: '600' }}
              >
                Return Label
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'primary.main',
                  fontWeight: '600',
                }}
              >
                Status:
                <Typography
                  sx={{ color: 'secondary.main', ml: '4px', fontWeight: '500' }}
                >
                  {formatText(returnInfo?.status) || 'N/A'}
                </Typography>
              </Typography>
            </Box>

            {/* If pickupConfirmationCode exists */}
            {returnInfo?.pickup?.pickupConfirmationCode && (
              <Box display="flex" flexDirection="column" justifyContent="end">
                <Typography
                  variant="body2"
                  sx={{ color: 'primary.main', fontWeight: '700' }}
                >
                  Pickup Confirmation Code:{' '}
                  {returnInfo?.pickup?.pickupConfirmationCode || 'N/A'}
                </Typography>

                <Typography
                  sx={{
                    color: 'secondary.main',
                    ml: '4px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                  }}
                >
                  <a href={returnInfo?.labelUrl} target="_blank">
                    <SimCardDownloadOutlinedIcon
                      fontSize="small"
                      sx={{ transform: 'translateY(5px)' }}
                    />{' '}
                    Download Return Label
                  </a>
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryDetail;
