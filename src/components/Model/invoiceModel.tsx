import {
  Dialog,
  DialogContent,
  Box,
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import CustomButton from '../../stories/button/CustomButton';
import { formatCurrency } from '../../utils/function';
import { Invoice } from '../../types/invoice.type';

export default function InvoiceModal({
  open = true,
  onClose = () => {},
  invoice ,
}: {
  open?: boolean;
  onClose?: () => void;
  invoice: Invoice;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0.4,
          maxHeight: '95vh',
          minHeight: '300px',
        },
      }}
      keepMounted
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 8 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {invoice.company.name}
                </Typography>
                <Typography variant="body2">
                  {invoice.company.address}
                </Typography>
                <Typography variant="body2">{invoice.company.city}</Typography>
                <Typography variant="body2">
                  Email: {invoice.company.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {invoice.company.phone}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 4 }} sx={{ textAlign: 'right' }}>
              <Typography
                variant="h4"
                sx={{ color: (t) => t.palette.primary.main, fontWeight: 800 }}
              >
                INVOICE
              </Typography>
              <Typography variant="body2">
                Order Number #: {invoice.orderNumber}
              </Typography>
              <Typography variant="body2">Date: {invoice.date}</Typography>
              <Typography variant="body2">Status: {invoice.status}</Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Bill To:
              </Typography>
              <Typography variant="body2">{invoice.billTo.name}</Typography>
              <Typography variant="body2">
                {invoice.billTo.addressLine1}
              </Typography>
              <Typography variant="body2">
                {invoice.billTo.cityStateZip}
              </Typography>
              <Typography variant="body2">{invoice.billTo.email}</Typography>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ textAlign: 'right' }}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Qty</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Unit Price</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Total</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell sx={{ fontWeight: '700' }}>
                        {it.description}
                      </TableCell>
                      <TableCell align="center">{it.qty}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(it.unitPrice)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: '700' }}>
                        {formatCurrency(it.qty * it.unitPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid size={{ xs: 6 }} />
            <Grid size={{ xs: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'stretch',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>{formatCurrency(invoice.subtotal)}</Typography>
                </Box>

                {invoice.discount > 0 && (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Discount:</Typography>
                    <Typography sx={{ color: 'success.main' }}>
                      -{formatCurrency(invoice.discount)}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Tax ({invoice.taxPercent}%):</Typography>
                  <Typography>{formatCurrency(invoice.taxAmount)}</Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700 }}>Total:</Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {formatCurrency(invoice.total)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography align="center">
                Thank you for your business!
              </Typography>
              <Typography align="center" variant="body2">
                For questions about this invoice, contact us at{' '}
                {invoice.company.email}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
              }}
            >
              <CustomButton
                startIcon={<PrintIcon />}
                variant="outlined"
                onClick={() => window.print()}
              >
                Print
              </CustomButton>
              <CustomButton variant="contained" startIcon={<DownloadIcon />}>
                Download PDF
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
