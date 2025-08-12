import {
  Card,
  Typography,
  Divider,
  Stack,
  useMediaQuery,
  CardActions,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomButton from '../../stories/button/CustomButton';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { createOrder } from '../../store/actions/createOrder';

const WelcomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    await createOrder({
      setActiveTabs: (tabs: number[]) => console.log('Active Tabs:', tabs),
      setIsSaving: (isSaving: boolean) => setIsSaving(isSaving),
      navigate,
    });
  };

  return (
    <>
      <Card
        sx={{
          textAlign: 'center',
          width: '90%',
          minHeight: 'calc(100vh - 200px)',
          boxShadow: '2px 2px 4px 0px #0000003D',
          borderRadius: '24px',
        }}
      >
        <CardContent sx={{ pt: { xs: 4, md: 8 }, pb: 4 }}>
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
            }}
          >
            Welcome
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.customColors.primaryDark,
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Get Instant Live Quotes From Our Merchants!
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            Place Your 3D Print Orders In Just 4 Simple Steps, Receive Instant
            Live Quotes Tailored To Your Design, And Enjoy A Smooth, Hassle-Free
            Printing Experience From Start To Finish.
          </Typography>

          {/* Steps */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            justifyContent="center"
            divider={
              !isMobile ? (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: theme.palette.divider,
                  }}
                />
              ) : null
            }
            sx={{ mb: 4 }}
          >
            {[
              '1: Upload Your Design',
              '2: Customise',
              '3: Quote',
              '4: Delivery',
            ].map((step, index) => (
              <Typography
                key={index}
                sx={{
                  fontWeight: 600,
                  color: theme.palette.customColors.primaryDark,
                }}
              >
                {step}
              </Typography>
            ))}
          </Stack>
        </CardContent>

        {/* Button */}
        <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
          <CustomButton
            variant="contained"
            size="large"
            onClick={handleSave}
            loading={isSaving}
          >
            Get Started Now
          </CustomButton>
        </CardActions>
      </Card>
    </>
  );
};

export default WelcomePage;
