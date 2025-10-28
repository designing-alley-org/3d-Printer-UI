import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import StackCard from './StackCard';
import { useState } from 'react';
import ViewNotification from './ViewNotification';
import CustomPagination from '../../components/CustomPagination';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';

const Notification = () => {
  const [selectedTag, setSelectedTag] = useState('');

  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const getHelpMessageLength = notifications.filter(
    (n) => n.type === 'ticket'
  ).length;
  // const getOrderMessageLength = notifications.filter((n) => n.type === 'order').length;
  // const getAdminMessageLength = notifications.filter((n) => n.type === 'admin').length;
  // const getOtherMessageLength = notifications.filter((n) => n.type === 'other').length;

  const stackData = [
    {
      id: 1,
      title: 'Pending Quote',
      Subtitle: '3 Notification',
      tag: 'pending',
    },
    {
      id: 2,
      title: 'Confirmed Orders',
      Subtitle: '3 Notification',
      tag: 'confirmed',
    },
    {
      id: 3,
      title: 'Completed',
      Subtitle: '3 Notification',
      tag: 'completed',
    },
    {
      id: 4,
      title: 'Help',
      Subtitle: `${getHelpMessageLength} Notification`,
      tag: 'ticket',
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" color="primary">
              All Notifications
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="primary">
              Stay updated on Your 3D printing order
            </Typography>
          }
        />
        <CardContent
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}
        >
          {stackData.map((item) => (
            <StackCard
              key={item.id}
              {...item}
              onClick={() =>
                setSelectedTag((pre) => (pre === item.tag ? '' : item.tag))
              }
              isOpen={selectedTag === item.tag}
            />
          ))}
        </CardContent>
        <CardContent>
          {!selectedTag ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems={'center'}
              minHeight={{ xs: 'auto', sm: '5rem', md: '30rem' }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer' }}
              >
                Click on any category card above to view detailed notifications
              </Typography>
            </Box>
          ) : (
            <Box minHeight={{ xs: 'auto', sm: '5rem', md: '30rem' }}>
              <ViewNotification tag={selectedTag} />
            </Box>
          )}
        </CardContent>
      </Card>
      {selectedTag && (
        <Box mt={3}>
          <CustomPagination
            pagination={{
              currentPage: 1,
              totalPages: 4,
              totalOrders: 20,
              ordersPerPage: 5,
              hasNextPage: true,
              hasPrevPage: false,
            }}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            showPageSizeSelector={true}
            pageSizeOptions={[5, 10, 20, 50]}
            showItemsInfo={true}
            itemName="orders"
            disabled={false}
          />
        </Box>
      )}
    </Container>
  );
};

export default Notification;
