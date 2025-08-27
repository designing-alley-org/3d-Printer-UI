import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import CustomButton from '../stories/button/CustomButton'

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Download } from 'lucide-react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const FilesList = () => {
  return (
   <Card sx={{
    mt: 2,
    borderRadius: '8px',
    padding: '0px',
   }}>
    <CardContent sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Left */}
      <Box display='flex' alignItems='center' gap={2}>
        <ContentCopyIcon fontSize='large' sx={{
          color: 'primary.main'
        }}/>
        <Typography variant="h6" color='primary.main' gutterBottom> File_Name.stl</Typography>
      </Box>
      {/* Right */}
      <Box>
        <Stack direction={'row'} spacing={1}>
          {/* Add your file actions here */}
          <CustomButton variant="contained" 
          sx={{
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>Download  <Download /></CustomButton>
          <CustomButton variant="contained"
          sx={{
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>View <KeyboardArrowDownIcon /></CustomButton>
        </Stack>
      </Box>
    </CardContent>
   </Card>
  )
}

export default FilesList