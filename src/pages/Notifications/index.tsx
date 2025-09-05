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
    title: 'Disputed',
    Subtitle: '3 Notification',
    tag: 'disputed',
  },
];

const Notification = () => {

  const [selectedTag, setSelectedTag] = useState('');

  return (
    <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Card >
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
        <CardContent sx={{ display: 'flex', gap: 2, }} >
          {stackData.map((item) => (
            <StackCard key={item.id} {...item} onClick={() => setSelectedTag(item.tag)} isOpen={selectedTag === item.tag} />
          ))}
        </CardContent>
        <CardContent >
        {!selectedTag ?  
        <Box display="flex" justifyContent="center" alignItems={"center"} minHeight={{ xs: 'auto', sm: '5rem', md: '30rem' }}>
           <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
             Click on any category card above to view detailed notifications
           </Typography>
         </Box> : (
          <Box minHeight={{ xs: 'auto', sm: '5rem', md: '30rem' }}>
              <ViewNotification tag={selectedTag} />
          </Box>
         )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Notification;
