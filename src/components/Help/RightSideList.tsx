import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
import HelpList from './HelpList'
import { useState } from 'react'

// Dummy data for support tickets
const dummyHelpTickets = [
  {
    id: '1',
    type: 'Technical ',
    title: 'Printer Not Working',
    date: '2024-01-15T10:30:00Z',
    orderId: 'ORD-2024-001',
    status: 'Open'
  },
  {
    id: '2',
    type: 'Billing',
    title: 'Payment ',
    date: '2024-01-14T14:20:00Z',
    orderId: 'ORD-2024-002',
    status: 'In Progress'
  },
  {
    id: '3',
    type: 'Inquiry',
    title: 'Material Options',
    date: '2024-01-13T09:15:00Z',
    orderId: 'ORD-2024-003',
    status: 'Resolved'
  },
  {
    id: '4',
    type: 'Quality ',
    title: 'Print Quality Problem',
    date: '2024-01-12T16:45:00Z',
    orderId: 'ORD-2024-004',
    status: 'Open'
  },
  {
    id: '5',
    type: 'Delivery',
    title: 'Delayed Shipment',
    date: '2024-01-11T11:30:00Z',
    orderId: 'ORD-2024-005',
    status: 'Closed'
  },
  {
    id: '6',
    type: 'Technical ',
    title: 'Software Issue',
    date: '2024-01-10T13:00:00Z',
    orderId: 'ORD-2024-006',
    status: 'In Progress'
  },
  {
    id: '7',
    type: 'Billing',
    title: 'Refund Request',
    date: '2024-01-09T15:30:00Z',
    orderId: 'ORD-2024-007',
    status: 'Resolved'
  },
]

const RightSideList = () => {
  const [openTicketId, setOpenTicketId] = useState<string | null>(null)

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
          {dummyHelpTickets.map((ticket) => (
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
          ))}
        </Box>
     </CardContent>
   
   </Card>
  )
}

export default RightSideList