import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CustomButton from '../../stories/button/CustomButton';
import { motion } from 'framer-motion';
import { formatText } from '../../utils/function';
import { bellCSS } from '../../utils/colors';

interface Props {
  tag?: string;
}



const NotificationCard = ({ tag }: Props) => {
  const theme = useTheme();

  const notificationCardHeader = [
    { id: 1, key: 'Order ID', value: '#1234567890' },
    { id: 2, key: 'Date & Time', value: '2023-10-01 12:00 PM' },
    {
      id: 3,
      key: 'Status',
      value: 'Quote requested - Awaiting admin response',
    },
  ];

  return (
    <Box mb={3}>
      <Box display={'flex'} justifyContent="space-between" gap={1} mb={1}>
        {notificationCardHeader.map((item) => (
          <Box display={'flex'} key={item.id}>
            <Typography variant="body1" fontWeight="bold" color="black">
              {item.key}:
            </Typography>
            <Typography variant="body2" color="text.secondary" ml={1}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': { boxShadow: '4px 4px 8px 0px #0000003D' },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <NotificationsOutlinedIcon
              fontSize="medium"
              sx={{
                color: { ...bellCSS(tag) },
              }}
            />
            <Typography variant="h6" fontWeight="bold" mt={1} mb={1} ml={1}>
              File name
            </Typography>
          </Box>
          <CustomButton
            children={<ChevronRightIcon />}
            style={{
              minWidth: '30px',
              height: '30px',
              borderRadius: '50%',
              padding: 0,
              backgroundColor: theme.palette.primary.main,
              color: '#B8D0F7',
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

const ViewNotification = ({ tag }: Props) => {
  return (
    <Container>
      <Typography variant="h6" color="primary" mt={2} mb={3}>
        Notifications For {formatText(tag || '')} Orders
      </Typography>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 }, // start lower
                visible: { opacity: 1, y: 0 }, // move up into place
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <NotificationCard tag={tag} />
            </motion.div>
          ))}
      </motion.div>
    </Container>
  );
};

export default ViewNotification;
