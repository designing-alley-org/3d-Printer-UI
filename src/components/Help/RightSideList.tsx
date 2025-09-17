import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import HelpList from './HelpList'

const RightSideList = () => {
  return (
   <Card sx={{ flex: 1, maxHeight: 600, overflowY: 'auto' }}>
     <CardHeader
        title={
          <Typography variant="h6" gutterBottom>
            Support Tickets
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary ">
            Sub text will be displayed here guiding user to submit any type of
            query they have.
          </Typography>
        }
      />
     <CardContent>
        <HelpList />
     </CardContent>
   
   </Card>
  )
}

export default RightSideList