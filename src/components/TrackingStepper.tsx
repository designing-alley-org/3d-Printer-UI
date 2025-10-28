import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import LoadingScreen from './LoadingScreen';
import { formatDate } from '../utils/function';
import { Box, Typography } from '@mui/material';

// --- Connector Style ---
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 9,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: '#b0b0b0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700],
    }),
  },
}));

// --- Step Icon ---
const CustomStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: '#616161',
  zIndex: 1,
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: '3px solid white',
  boxShadow: '0 0 0 2px #616161',
  ...(ownerState.active && {
    backgroundColor: '#616161',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#616161',
  }),
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    />
  );
}

// --- Types ---
type StepData = {
  derivedStatus: string;
  postalCode: string;
  city: string;
  date: string;
};

type TrackingStepperProps = {
  steps: StepData[];
  trackingError: string | null;
  activeStep?: number; // default: last step
};

// --- Component ---
export default function TrackingStepper({
  steps,
  trackingError,
  activeStep = steps.length - 1,
}: TrackingStepperProps) {
  if (trackingError) {
    return (
      <>
        <Box>
          <Typography variant="h6" color="error">
            Error Fetching Tracking Details
          </Typography>
          <Typography variant="body2" color="error">
            {trackingError}
          </Typography>
        </Box>
      </>
    );
  }

  if (!steps || steps.length === 0) {
    return (
      <LoadingScreen
        title="Loading Tracking Details..."
        description="Please wait while we fetch the latest tracking information."
      />
    );
  }

  return (
    <Stack sx={{ width: '100%', mt: 2 }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps?.map((step, index) => (
          <Step key={index} sx={{ minWidth: 180 }}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <div style={{ textAlign: 'center' }}>
                <strong>{step.derivedStatus}</strong>
                <div>
                  {step.city},{step.postalCode}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                  {formatDate(step.date)}
                </div>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
