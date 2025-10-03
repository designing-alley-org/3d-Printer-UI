import { Box, Card, CardContent, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChatUI from '../Chat/ChatUI';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/function';
import { useSearchParams } from 'react-router-dom';

interface  Props {
    onClick?: (id: string) => void;
    id?: string;
    type?: string;
    subject?: string;
    createdAt?: string;
    orderNumber?: string;
    status?: string;
    isOpen?: boolean;
    conversationId?: string;
}

function statusHexColor(status: string) {
  switch (status.toLowerCase()) {
    case 'hold':
      return '#FFFF00'; // yellow
    case 'in progress':
      return '#0000FF'; // Blue
    case 'resolved':
      return '#008000'; // Green
    case 'open':
      return '#0cb6ee'; // light blue
    case 'closed':
      return '#FF0000'; // Red
    default:
      return '#000000'; // Black for unknown status
  }
}

const HelpList = ({  type, subject, createdAt, orderNumber, status, isOpen , conversationId }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const isChatOpen = searchParams.get('conversationId') === conversationId;


  const handelClick = () => {
    if (isChatOpen) {
      setSearchParams({});
    } else {
      setSearchParams({ conversationId: conversationId  || '' } );
    }
  }


  return (
    <Card
      sx={{
        p: 0,
        backgroundColor: isOpen ? '#EFF4FF' : 'transparent',
        border: isOpen ? '1px solid #F0F4FF' : '1px solid #F0F4FF',
      }}
    >
      <CardContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          cursor: 'pointer'
        }}
        onClick={handelClick}
      >
        <Box display={'flex'} justifyContent={'space-between'} mb={1}>
          <Typography variant="body1" color="primary.main">
            {type} - {subject}
          </Typography>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ display: 'inline-block', float: 'right' }}
          >
            {' '}
            <KeyboardArrowDownOutlinedIcon
              fontSize="small"
              sx={{ float: 'right', color: 'primary.main' }}
            />
          </motion.div>
        </Box>
        <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'}>
          <Typography variant="body2" color="secondary">
            Created On: {formatDate(createdAt || '', false)}
          </Typography>
          <Box display={'flex'} gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mt={{ xs: 1, sm: 0 }}>
           {orderNumber && <Typography variant="body2" color="text.secondary">
              Order No:
              <Typography
                variant="body2"
                color="primary.main"
                component={'span'}
                ml={1}
              >
                {orderNumber}
              </Typography>
            </Typography>}
            <Typography>
              Status:
              <Typography
                variant="body2"
                color={statusHexColor(status || '')}
                component={'span'}
                ml={1}
              >
                {/* Dot */}
                <Box
                  component={'span'}
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: statusHexColor(status || ''),
                    display: 'inline-block',
                    mr: 0.5,
                    '&:hover': { transform: 'scale(1.2)'
                  },
                  }}
                />
                {status}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: 'easeInOut',
          opacity: { duration: 0.2 }
        }}
        style={{ overflow: 'hidden' }}
      >
        <CardContent 
          sx={{ pt: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ChatUI isOpen={isOpen} conversationId={conversationId || ''} status={status || ''} type={type}  orderNumber={orderNumber || ''}/>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default HelpList;
