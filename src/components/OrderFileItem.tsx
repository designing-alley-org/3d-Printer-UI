import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../stories/button/CustomButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeliveryDetail from './DeliveryDetail';
import FilesList from './FilesList';
import NoDataFound from './NoDataFound';
import { formatDate } from '../utils/function';

interface Props {
  order: any;
  onClick: (id: string) => void;
  onDispute?: (id: string) => void;
  onReturn?: (id: string) => void;
  isExpanded?: boolean;
}

const OrderFileItem = ({ order, onClick, onDispute, onReturn, isExpanded = false }: Props) => {
  console.log(order);
  const theme = useTheme();
  return (
    <>
      <Card
        sx={{
          borderRadius: '8px',
          backgroundColor: 'primary.main',
          padding: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => onClick(order._id)}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box
              width={'46px'}
              height={'46px'}
              borderRadius={'50%  '}
              overflow={'hidden'}
              sx={{
                backgroundColor: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckTwoToneIcon fontSize="large" />
            </Box>
            <Box ml={2}>
              <Typography
                variant="h6"
                color="primary.contrastText"
                gutterBottom
              >
                {order._id}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.customColors.lightTextOverDark}
              >
                Created On: {formatDate(order.createdAt)}
              </Typography>
            </Box>
            <Box ml={4}>
              <Typography
                variant="h6"
                color="primary.contrastText"
                gutterBottom
              >
                {' '}
                {order.numberOfFiles} File
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.customColors.lightTextOverDark}
              >
                Status:
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <CustomButton
            sx={{
              color: 'primary.contrastText',
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowForwardIosOutlinedIcon fontSize="large" />
            </motion.div>
          </CustomButton>
        </CardActions>
      </Card>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Box mt={2}>
              {/* DeliveryDetail */}
              <DeliveryDetail />

              {
                order.numberOfFiles === 0 ? <NoDataFound text="No Files Found" description='No files have been uploaded for this order.' /> :  order.files.map((file: any) => (
                    <FilesList key={file.id} file={file} />
                  ))
              }

             {
              true 
              &&  
              <Box display="flex" gap={1} justifyContent="end" mt={2}>
               {
                true && 
                <CustomButton
                  variant="outlined"
                  sx={{
                    borderRadius: '4px',
                    padding: '8px 36px',
                  }}
                  children="Return"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReturn?.(order._id);
                  }}
                />
               }
                {
                  true
                  && 
                 <CustomButton
                  variant="contained"
                  sx={{
                    borderRadius: '4px',
                     padding: '8px 36px',
                  }}
                  children="Dispute"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDispute?.(order._id);
                  }}
                />
                }
              </Box>
             }
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderFileItem;
