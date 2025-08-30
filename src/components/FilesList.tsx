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
import {ColorIcon, InfillIcon, TechnologyIcon, MaterialIcon,PrinterIcon} from '../../public/Icon/MUI_Coustom_icon/index';
import {
  Ruler
} from 'lucide-react';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { downloadFileFromS3Service } from '../services/order';

interface Props {
  file: any;
}

const FilesList = ({ file }: Props) => {
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [fileDownloadProgress, setFileDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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
              {file.fileName.split(' ')[0]}.stl
            </Typography>
          </Box>
          {/* Right */}
          <Box>
            <Stack direction={'row'} spacing={1}>
              {/* Add your file actions here */}
              <CustomButton
                variant="contained"
                onClick={() => downloadFileFromS3Service(file.fileUrl, setFileDownloadProgress, setIsDownloading)}
                disabled={isDownloading}
                sx={{
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
             {isDownloading ? `${fileDownloadProgress}%` : <>
             Download <Download />
             </>
             }
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
              sx={{
                mt: 2,
                backgroundColor: 'background.paper',
                borderRadius: '8px',
              }}
            >
              <Table aria-label="files table">
                <TableHead>
                  <TableRow>
                    <TableCell>Customisation</TableCell>
                    <TableCell align="right">Selection</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{}}>
                  <TableRow>
                    <TableCell> <Ruler size={15} style={{ transform: 'rotate(100deg)' }} /> Scale</TableCell>
                    <TableCell align="right">{
                      file?.dimensions?.height + ' x ' + file?.dimensions?.width + ' x ' + file?.dimensions?.height + ' ' + (file.unit || 'N/A')
                      }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <TechnologyIcon sx={{ fontSize: 15 }} /> Technology</TableCell>
                    <TableCell align="right">{file.technology || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <MaterialIcon sx={{ fontSize: 15 }} /> Material</TableCell>
                    <TableCell align="right">{file.material || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <ColorIcon sx={{ fontSize: 15 }} /> Colors</TableCell>
                    <TableCell align="right">{file.color || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <PrinterIcon sx={{ fontSize: 15 }} /> Printers</TableCell>
                    <TableCell align="right">{file.printer || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <InfillIcon sx={{ fontSize: 15 }} /> Infill</TableCell>
                    <TableCell align="right">{file.infill || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> <ScaleOutlinedIcon sx={{ fontSize: 15 }} /> Weight</TableCell>
                    <TableCell align="right">{(file?.dimensions?.weight + ' ' + ('g.m.')) || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><AddShoppingCartOutlinedIcon sx={{ fontSize: 15 }} /> Quantity</TableCell>
                    <TableCell align="right">{file.quantity || 'N/A'}</TableCell>
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
