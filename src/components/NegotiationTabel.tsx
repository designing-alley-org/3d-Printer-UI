import  { useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
} from '@mui/material';
import { PriceTableProps } from '../types/priceChart';
import CustomButton from '../stories/button/CustomButton';
import { formatCurrency } from '../utils/function';
import theme from '../themes/theme';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface NegotiationTabelProps {
  data: PriceTableProps;
  onAccept?: () => void;
}

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  '& .MuiTableCell-root': {
    color: theme.palette.primary.main,
    fontWeight: 550,
  },
}));

function formatExpiryDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const NegotiationTabel: React.FC<NegotiationTabelProps> = ({
  data,
  onAccept,
}) => {
  const { taxRate, useDiscount = true, discountAvailable, fileTable } = data;
  const { loading , error } = useSelector((state: RootState) => state.discount);

  const subtotal = fileTable.reduce((sum, file) => sum + file.totalPrice, 0);

  const taxes = useMemo(() => {
    const discount =
      useDiscount && discountAvailable
        ? (subtotal * discountAvailable.percentage) / 100
        : 0;
    const taxableAmount = subtotal - discount;
    return taxableAmount * (taxRate / 100);
  }, [subtotal, taxRate]);

  const isCodeExpired = useMemo(() => {
    if (!discountAvailable?.expiryDate) return false;
    const expiryDate = new Date(discountAvailable.expiryDate);
    const currentDate = new Date();
    return currentDate > expiryDate;
  }, [discountAvailable]);

  const discountAmount =
    useDiscount && discountAvailable
      ? (subtotal * discountAvailable.percentage) / 100
      : 0;

  const finalTotal = subtotal + taxes - discountAmount;

  return (
    <Box maxWidth={600} m={2} minWidth={500}>
      <Paper
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 0.4,
          overflow: 'hidden',
        }}
      >
        <TableContainer
          sx={{
            p: 1,
          }}
        >
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>File</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </StyledTableHead>

            <TableBody sx={{}}>
              {/* File Items */}
              {fileTable.map((file) => (
                <TableRow key={file.fileId}>
                  <TableCell
                    sx={{
                      color: '#fff',
                      borderBottom: '1px solid #C5C5C5',
                      py: 2,
                    }}
                  >
                    {file.fileName}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: '#fff',
                      borderBottom: '1px solid #C5C5C5',
                      py: 2,
                    }}
                  >
                    {file.quantity}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: '#fff',
                      borderBottom: '1px solid #C5C5C5',
                      py: 2,
                    }}
                  >
                    {formatCurrency(file.totalPrice)}
                  </TableCell>
                </TableRow>
              ))}

              {/* Total Print Pricing */}
              <TableRow>
                <TableCell
                  sx={{
                    color: '#fff',
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                >
                  Sub Total
                </TableCell>
                <TableCell
                  sx={{
                    color: '#fff',
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                   align="right"
                >
                  -
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#fff',
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                >
                  {formatCurrency(subtotal)}
                </TableCell>
              </TableRow>



              {/* Negotiation Discount */}
              {useDiscount && discountAvailable && (
                <TableRow>
                  <TableCell sx={{ borderBottom: '1px solid #C5C5C5', py: 2 }}>
                    <Typography sx={{ color: '#4caf50', fontWeight: 500 }}>
                      Negotiation Discount ({discountAvailable.percentage}%)
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#fff',
                      borderBottom: '1px solid #C5C5C5',
                      py: 2,
                    }}
                     align="right"
                  >
                    -
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: '1px solid #C5C5C5', py: 2 }}
                  >
                    <Typography sx={{ color: '#4caf50', fontWeight: 500 }}>
                      -{formatCurrency(discountAmount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

             
              {/* Tax */}
              <TableRow>
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                >
                  Tax ({taxRate}%)
                </TableCell>
                <TableCell
                  sx={{
                    color: '#fff',
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                   align="right"
                >
                  -
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    borderBottom: '1px solid #C5C5C5',
                    py: 2,
                  }}
                >
                  {formatCurrency(taxes)}
                </TableCell>
              </TableRow>

              {/* Final Total */}
              <TableRow>
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    py: 2,
                  }}
                >
                  Final Total
                </TableCell>
                <TableCell sx={{ color: '#fff', py: 2 }}  align="right">
                  -
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    py: 2,
                  }}
                >
                  {formatCurrency(finalTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Important Notes */}
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            m: 1,
            mb: 2,
            borderRadius: 0.3,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Important Notes:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            <Typography component="li" variant="subtitle2" sx={{ mb: 0.5 }}>
              This discount is applicable only for{' '}
              <strong>order No. : {data?.orderNumber}</strong>
            </Typography>
            <Typography component="li" variant="subtitle2">
              The offer is valid only until{' '}
              <strong>
                {formatExpiryDate(data?.discountAvailable?.expiryDate || '')}
              </strong>
            </Typography>
            <Typography component="li" variant="subtitle2">
              Discount Code:
              <Typography
                variant="body2"
                component="span"
                sx={{ ml: 1 }}
                fontWeight={500}
              >
                {data?.discountAvailable?.code || ''}
              </Typography>
            </Typography>
          </Box>
          {!data?.discountAvailable?.isUserAccepted && isCodeExpired && (
            <Box
              sx={{
                mt: 1,
                backgroundColor: theme.palette.error.light,
                p: 1,
                borderRadius: 0.2,
              }}
            >
              <Typography
                variant="body2"
                color={theme.palette.primary.contrastText}
                component="span"
                sx={{ ml: 1 }}
                fontWeight={500}
              >
                Code is expired or not accepted yet.
              </Typography>
            </Box>
          )}
        </Box>

        {data.discountAvailable?.isUserAccepted ? (
          <Box
            onClick={onAccept}
            sx={{
              backgroundColor: '#4caf50',
              borderRadius: 0,
              p: 1,
              color: '#fff',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              User has accepted the discount offer for this order.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <CustomButton
              variant="contained"
              onClick={onAccept}
              disabled={isCodeExpired || loading}
              sx={{
                backgroundColor: '#4caf50',
                borderRadius: 0.2,
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
              children="Accept & Go to quote"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default NegotiationTabel;
