import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material"

const DeliveryDetail = () => {
  return (
    <Card sx={{ mt: 2, borderRadius: '8px', padding: '0px', border: '1px dashed #C5C5C5' }}>
      <CardHeader title="Delivery Details"
        subheader={
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <Typography variant="body2" 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    Status: 
                    <Typography>
                        In Transit
                    </Typography>
                </Typography>
                <Typography variant="body2" 
                 sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                >Tracking ID: 
                    <Typography>
                        12345678
                    </Typography>
                </Typography>
            </Box>
        }
        />
        <CardContent>
            {/* Timeline */}
            <Box>

            </Box>
            {/* Footer */}
            <Box>
            </Box>
        </CardContent>
    </Card>
  )
}

export default DeliveryDetail