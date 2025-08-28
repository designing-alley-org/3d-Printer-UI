import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import TrackingStepper from './TrackingStepper';

const trackingSteps = [
  { label: "Collected", location: "London, Depot", time: "Mon 01 Apr, 09:00 am" },
  { label: "Left", location: "Watford, Hub", time: "Mon 01 Apr, 01:30 pm" },
  { label: "Reached", location: "Milton Keynes, Sorting Centre", time: "Mon 01 Apr, 04:15 pm" },
  { label: "Departed", location: "Northampton, Depot", time: "Mon 01 Apr, 07:45 pm" },
  { label: "Arrived", location: "Birmingham, Warehouse", time: "Tue 02 Apr, 06:20 am" },
  { label: "Left", location: "Coventry, Distribution Hub", time: "Tue 02 Apr, 10:00 am" },
  { label: "Reached", location: "Leicester, Hub", time: "Tue 02 Apr, 01:30 pm" },
  { label: "Departed", location: "Nottingham, Depot", time: "Tue 02 Apr, 04:50 pm" },
  { label: "Arrived", location: "Sheffield, Warehouse", time: "Tue 02 Apr, 09:15 pm" },
  { label: "Left", location: "Leeds, Hub", time: "Wed 03 Apr, 07:30 am" },
  { label: "Reached", location: "Manchester, Sorting Centre", time: "Wed 03 Apr, 10:45 am" },
  { label: "Departed", location: "Liverpool, Depot", time: "Wed 03 Apr, 01:20 pm" },
  { label: "Arrived", location: "Preston, Hub", time: "Wed 03 Apr, 05:40 pm" },
  { label: "Left", location: "Lancaster, Warehouse", time: "Wed 03 Apr, 08:10 pm" },
  { label: "Reached", location: "Carlisle, Depot", time: "Thu 04 Apr, 06:30 am" },
  { label: "Departed", location: "Glasgow, Hub", time: "Thu 04 Apr, 11:00 am" },
  { label: "Arrived", location: "Edinburgh, Distribution Centre", time: "Thu 04 Apr, 02:45 pm" },
  { label: "Left", location: "Dundee, Depot", time: "Thu 04 Apr, 06:15 pm" },
  { label: "Reached", location: "Aberdeen, Hub", time: "Thu 04 Apr, 09:00 pm" },
  { label: "Delivered", location: "Inverness, Final Destination", time: "Fri 05 Apr, 10:30 am" },
];


const DeliveryDetail = () => {
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
                In Transit
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
                12345678
              </Typography>
            </Typography>
          </Box>
        }
      />
      <CardContent>
        {/* Timeline */}
        <Box sx={{
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
          }}>
          <TrackingStepper steps={trackingSteps}  />
        </Box>
        {/* Footer */}

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
                In Transit
              </Typography>
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="end">
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', fontWeight: '700' }}
            >
              Pickup Confirmation Code: 2568
            </Typography>

            <Typography
              sx={{ color: 'secondary.main', ml: '4px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'end' }}
            >
              <a href="" target='_blank'><SimCardDownloadOutlinedIcon fontSize="small" sx={{ transform: 'translateY(5px)' }} /> Download Return Label</a>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetail;
