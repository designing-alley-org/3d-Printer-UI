import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
import HelpList from './HelpList'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { getAllUserQuery } from '../../store/Slice/querySlice'
import LoadingScreen from '../LoadingScreen'
import NoDataFound from '../NoDataFound'

const RightSideList = () => {
  const [openTicketId, setOpenTicketId] = useState<string | null>(null)

  const dispatch = useDispatch<AppDispatch>()

  const { helpTickets, loading, error } = useSelector((state: RootState) => state.query)

  useEffect(() => {
    dispatch(getAllUserQuery())
  }, [dispatch])

  const handleTicketClick = (id: string) => {
    setOpenTicketId(openTicketId === id ? null : id)
  }

  return (
   <Card sx={{ flex: 1, overflowY: 'auto' }}>
     <CardHeader
        title={
          <Typography variant="h6" gutterBottom>
            Support Tickets
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Sub text will be displayed here guiding user to submit any type of
            query they have.
          </Typography>
        }
      />
     <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {loading ? (
              <LoadingScreen title='Loading help tickets...' />
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <Typography color="error" variant="body2">
                Error loading help tickets: {error}
              </Typography>
            </Box>
          ) : (
            !helpTickets.length ? (
              <NoDataFound text="No Help Tickets Found" description="You have not submitted any help tickets yet." />
            ) :
            helpTickets.map((ticket) => (
              <HelpList
                key={ticket.id}
                id={ticket.id}
                type={ticket.type}
                title={ticket.title}
                date={ticket.date}
                orderId={ticket.orderId}
                status={ticket.status}
                isOpen={openTicketId === ticket.id}
                onClick={handleTicketClick}
              />
            ))
          )}
        </Box>
     </CardContent>
   
   </Card>
  )
}

export default RightSideList