import React from 'react';
import { Box, Typography, Card, CardContent, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Print as PrintIcon,
  LocalShipping as TrackIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../store/actions/createOrder';

interface DashboardCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
  path: string;
}

const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dashboardCards: DashboardCard[] = [
    {
      id: 1,
      title: 'Place Print Order',
      description: 'Start a new 3D printing order',
      icon: <PrintIcon sx={{ fontSize: 40 }} />,
      isPrimary: true,
      path: '/place-order',
    },
    {
      id: 2,
      title: 'Track Orders',
      description: 'Monitor your active orders',
      icon: <TrackIcon sx={{ fontSize: 40 }} />,
      isPrimary: false,
      path: '/track-orders',
    },
    // {
    //   id: 3,
    //   title: 'Order History',
    //   description: 'View past orders and details',
    //   icon: <HistoryIcon sx={{ fontSize: 40 }} />,
    //   isPrimary: false,
    //   path: '/order-history',
    // },
  ];

  const handleClick = async (path: string) => {

    // Handle the click event, e.g., navigate to the specified path
    if (path == "/place-order") {
      await createOrder({
        setActiveTabs: (tabs: number[]) => console.log('Active Tabs:', tabs),
        setIsSaving: (isSaving: boolean) => console.log('Is Saving:', isSaving),
        navigate,
      });
      return;
    }

    navigate(path);

  };

  return (
    <Container
      maxWidth="xl"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Manage your 3D printing orders and accounts here.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {dashboardCards.map((card) => (
          <Box key={card.id}>
            <Card
              onClick={() => handleClick(card.path)}
              sx={{
                p: 2,
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                backgroundColor:  theme.palette.background.paper,
                color:  theme.palette.text.primary,
                boxShadow:  '0px 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: '0px 8px 20px rgba(6, 11, 53, 0.3)',
                  '& .MuiSvgIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
                overflow: 'hidden',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  minHeight: { xs: 180, sm: 200 },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    opacity: card.isPrimary ? 1 : 0.8,
                  }}
                >
                  {card.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: 'inherit',
                    fontSize: { xs: '1.1rem', sm: '1.5rem' },
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default DashboardPage;
