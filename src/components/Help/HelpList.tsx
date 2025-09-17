import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChatUI from '../Chat/ChatUI';



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
        <Box display={'flex'} justifyContent={'space-between'}>
             <Typography variant="body2" color="secondary" >
               Created On: 02/08/2025
            </Typography>
            <Box display={'flex'} gap={2}>
                <Typography variant="body2" color="text.secondary" >
               Order Id:
               <Typography variant="body2" color="primary.main" component={'span'} ml={1}>
                    68c8204a027a67fcc8c395cd
                </Typography>
            </Typography>
            <Typography>
                Status:
                <Typography variant="body2" color="primary.main" component={'span'} ml={1}>
                    {/* Dot */}
                    <Box component={'span'} sx={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'primary.main', display:'inline-block', mr:1 }}/>
                    in Progress
                </Typography>
            </Typography>
            </Box>
        </Box>
    </CardContent>
    <CardContent>
        <ChatUI />
    </CardContent>
   </Card>
  )
}

export default HelpList