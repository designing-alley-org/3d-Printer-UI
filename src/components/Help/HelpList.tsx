import { Box, Card, CardContent, Typography } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
const HelpList = () => {
  return (
   <Card sx={{ p: 0 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
        <Box display={'flex'} justifyContent={'space-between'} mb={1}>
            <Typography variant="body1" color="primary.main" >
                Payment - Query subject title
            </Typography>
            <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ float: 'right', color: 'primary.main' }}/>
        </Box>
        <Box>
             <Typography variant="body1" color="secondary" >
               Created On: 02/08/2025
            </Typography>
        </Box>
    </CardContent>
   </Card>
  )
}

export default HelpList