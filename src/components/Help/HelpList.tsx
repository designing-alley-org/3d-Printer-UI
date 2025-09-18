import { Box, Card, CardContent, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChatUI from '../Chat/ChatUI';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/function';

interface  Props {
    onClick?: (id: string) => void;
    id?: string;
    type?: string;
    subject?: string;
    createdAt?: string;
    orderId?: string;
    status?: string;
    isOpen?: boolean;
    conversationId?: string;
}

function statusHexColor(status: string) {
  switch (status.toLowerCase()) {
    case 'hold':
      return '#FFA500'; // Orange
    case 'in progress':
      return '#0000FF'; // Blue
    case 'resolved':
      return '#008000'; // Green
    case 'open':
      return '#FFFF00'; // Yellow
    case 'closed':
      return '#808080'; // Grey
    default:
      return '#000000'; // Black for unknown status
  }
}

const HelpList = ({ onClick, id, type, subject, createdAt, orderId, status, isOpen , conversationId }: Props) => {
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
        onClick={() => onClick && id && onClick(id)}
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
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="body2" color="secondary">
            Created On: {formatDate(createdAt || '', false)}
          </Typography>
          <Box display={'flex'} gap={2}>
           {orderId && <Typography variant="body2" color="text.secondary">
              Order Id:
              <Typography
                variant="body2"
                color="primary.main"
                component={'span'}
                ml={1}
              >
                {orderId}
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
                    mr: 1,
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
          <ChatUI isOpen={isOpen} conversationId={conversationId || ''} />
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default HelpList;
