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
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../stories/button/CustomButton';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Download } from 'lucide-react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  ColorIcon,
  InfillIcon,
  TechnologyIcon,
  MaterialIcon,
  PrinterIcon,
} from '../../public/Icon/MUI_Coustom_icon/index';
import { Ruler } from 'lucide-react';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { downloadFileFromS3Service } from '../services/order';
import { FileDataOrder } from '../types/uploadFiles';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

interface Props {
  file: FileDataOrder;
}

const FilesList = ({ file }: Props) => {
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [fileDownloadProgress, setFileDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

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
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            padding: { xs: 2, sm: 3 },
          }}
        >
          {/* Left */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <ContentCopyIcon
              fontSize={isMobile ? 'small' : 'large'}
              sx={{
                color: 'primary.main',
                transform: 'translateY(-7px)',
              }}
            />
            <Typography
              variant="h6"
              color="primary.main"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
                wordBreak: 'break-word',
              }}
            >
              {file?.fileName?.split(' ')[0]}
            </Typography>
          </Box>
          {/* Right */}
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Stack
              direction={{ xs: 'row', sm: 'row' }}
              spacing={1}
              sx={{ width: '100%' }}
            >
              {/* Add your file actions here */}
              <CustomButton
                variant="contained"
                onClick={() =>
                  downloadFileFromS3Service(
                    file.fileUrl,
                    setFileDownloadProgress,
                    setIsDownloading
                  )
                }
                disabled={isDownloading}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  width: { xs: '100%', sm: 'auto' },
                  padding: { xs: '10px 16px', sm: '8px 16px' },
                }}
              >
                {isDownloading ? (
                  `${fileDownloadProgress}%`
                ) : (
                  <>
                    Download <Download size={20} />
                  </>
                )}
              </CustomButton>
              <CustomButton
                variant="contained"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: { xs: '10px 16px', sm: '8px 16px' },
                  width: { xs: '100%', sm: 'auto' },
                }}
                onClick={handleViewClick}
              >
                View{' '}
                <motion.div
                  animate={{ rotate: isTableExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDownIcon fontSize="medium" />
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
            style={{
              overflow: 'hidden',
              display: 'flex',
              gap: '20px',
              marginTop: '10px',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <TableContainer
              sx={{
                mt: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0.4,
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
                    <TableCell>
                      {' '}
                      <Ruler
                        size={15}
                        style={{ transform: 'rotate(100deg)' }}
                      />{' '}
                      Scale
                    </TableCell>
                    <TableCell align="right">
                      {file?.dimensions?.height_mm?.toFixed(3) +
                        ' x ' +
                        file?.dimensions?.width_mm?.toFixed(3) +
                        ' x ' +
                        file?.dimensions?.length_mm?.toFixed(3) +
                        ' ' +
                        (file.unit || 'N/A')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <TechnologyIcon sx={{ fontSize: 15 }} /> Technology
                    </TableCell>
                    <TableCell align="right">
                      {file.technology?.code || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <MaterialIcon sx={{ fontSize: 15 }} /> Material
                    </TableCell>
                    <TableCell align="right">
                      {file.material?.code || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <ColorIcon sx={{ fontSize: 15 }} /> Colors
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: file.color
                              ? file.color.hexCode
                              : '#ffffff',
                            marginRight: '8px',
                            verticalAlign: 'middle',
                          }}
                        ></span>
                        {file.color?.name || 'N/A'}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <PrinterIcon sx={{ fontSize: 15 }} /> Printers
                    </TableCell>
                    <TableCell align="right">
                      {file.printer?.name || 'N/A'}
                    </TableCell>
                  </TableRow>
                  {file?.technology?.code === 'FDM' && (
                    <TableRow>
                      <TableCell>
                        {' '}
                        <InfillIcon sx={{ fontSize: 15 }} /> Infill
                      </TableCell>
                      <TableCell align="right">
                        {file.infill || 'N/A'}
                      </TableCell>
                    </TableRow>
                  )}
                  {file?.weight?.value && (
                    <TableRow>
                      <TableCell>
                        {' '}
                        <ScaleOutlinedIcon sx={{ fontSize: 15 }} /> Weight
                      </TableCell>
                      <TableCell align="right">
                        {file?.weight?.value?.toFixed(2) +
                          ' ' +
                          (file?.weight?.unit || 'N/A') || 'N/A'}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>
                      <AddShoppingCartOutlinedIcon sx={{ fontSize: 15 }} />{' '}
                      Quantity
                    </TableCell>
                    <TableCell align="right">
                      {file.quantity || 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              alt="Preview"
              src={file?.thumbnailUrl}
              sx={{
                width: isMobile ? '100%' : '48%',
                height: 'auto',
                mt: isMobile ? 0 : 2,
                borderRadius: 0.4,
                objectFit: 'cover',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
              }}
              component="img"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilesList;
