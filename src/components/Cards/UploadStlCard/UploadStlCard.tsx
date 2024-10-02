import React from 'react';
import { Box, Typography } from '@mui/material';
import UploadStlCardFile from './UploadStlCardFile';

interface UploadStlCardProps {}

const UploadStlCard: React.FC<UploadStlCardProps> = ({}) => {
  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '1rem',
            color: '#0066FF',
          }}
        >
          Set the required quantities for each file and if their sizes appear
          too small, change the unit of measurement to inches. <br />
          Click on 3D Viewer for a 360° preview of your files.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{}}>Unit of Measurement</Typography>
          {/* use mm in button */}
          <button>s</button>
          <button>s</button>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1.3rem' }}>Files</Typography>
          <Box
            sx={{
              width: '2.3rem',
              height: '2,3rem',
              borderRadius: '50%',
              bgcolor: '#EAEEFF',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography>5</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box>
          <UploadStlCardFile />
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCard;
