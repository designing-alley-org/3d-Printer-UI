import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';

const LeftSideForm = () => {
  return (
    <Card sx={{ maxWidth: 430, backgroundColor: 'primary.main', flex: 1 }}>
      <CardHeader
        title={
          <Typography variant="h6" color="primary.contrastText" gutterBottom>
            Contact & Support
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="primary.contrastText">
            Sub text will be displayed here guiding user to submit any type of
            query they have.
          </Typography>
        }
      />
      <CardContent>
       
      </CardContent>
      <CardActions>
        <CustomButton
          variant="outlined"
          fullWidth
          children="Submit "
        />
      </CardActions>
    </Card>
  );
};

export default LeftSideForm;
