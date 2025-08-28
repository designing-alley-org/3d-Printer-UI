import {
  Box,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../stories/button/CustomButton';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Download } from 'lucide-react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const FilesList = () => {
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const handleViewClick = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  return (
    <>
      <Card
        sx={{
          mt: 2,
          borderRadius: '8px',
          padding: '0px',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <Box display="flex" alignItems="center" gap={2}>
            <ContentCopyIcon
              fontSize="large"
              sx={{
                color: 'primary.main',
              }}
            />
            <Typography variant="h6" color="primary.main" gutterBottom>
              {' '}
              File_Name.stl
            </Typography>
          </Box>
          {/* Right */}
          <Box>
            <Stack direction={'row'} spacing={1}>
              {/* Add your file actions here */}
              <CustomButton
                variant="contained"
                sx={{
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Download <Download />
              </CustomButton>
              <CustomButton
                variant="contained"
                sx={{
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onClick={handleViewClick}
              >
                View{' '}
                <motion.div
                  animate={{ rotate: isTableExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDownIcon />
                </motion.div>
              </CustomButton>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isTableExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <TableContainer
              sx={{ mt: 2, backgroundColor: 'background.paper', borderRadius: '8px' }}
            >
              <Table aria-label="files table">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{}}>
                  <TableRow>
                    <TableCell>File_Name.stl</TableCell>
                    <TableCell align="right">Table Cell Content</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilesList;
