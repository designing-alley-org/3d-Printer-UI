import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { styled, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/function';
import { PriceTableProps } from '../../types/priceChart';
import { useMemo } from 'react';

// --- Styled Components ---
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTableCell-root': {
    color: theme.palette.common.white,
    fontWeight: 600,
    borderBottom: 'none',
  },
}));

const StyledDataRow = styled(TableRow)(({ theme }) => ({
  '& .MuiTableCell-root': {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}));

const StyledFooterTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': {
    borderBottom: 1,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& td:first-of-type': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

// --- Main Component ---
export default function PriceTable({
  subtotal,
  taxRate,
  fileTable,
  discountAvailable,
  useDiscount = false,
}: PriceTableProps) {
  // ✅ Guard: Empty data
  if (!fileTable || fileTable.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No files available to display pricing.
      </Typography>
    );
  }

  // ✅ Calculate taxes
  const taxes = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate]);

  // ✅ Calculate discount & total
  const discountAmount = useMemo(() => {
    if (!useDiscount || !discountAvailable?.percentage) return 0;
    return (subtotal * discountAvailable.percentage) / 100;
  }, [useDiscount, discountAvailable?.percentage, subtotal]);

  const totalAmount = useMemo(() => subtotal + taxes - discountAmount, [
    subtotal,
    taxes,
    discountAmount,
  ]);

  // --- Render ---
  return (
    <StyledTableContainer>
      <Table aria-label="price breakdown table">
        <StyledTableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Price Per Unit</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </StyledTableHead>

        <TableBody>
          {fileTable.map((row) => (
            <StyledDataRow key={row.fileId}>
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="right">{formatCurrency(row.pricePerUnit)}</TableCell>
              <TableCell align="right">{formatCurrency(row.totalPrice)}</TableCell>
            </StyledDataRow>
          ))}
        </TableBody>

        <TableFooter>
          {/* Subtotal */}
          <StyledFooterTableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="right">-</TableCell>
            <TableCell align="right">{formatCurrency(subtotal)}</TableCell>
          </StyledFooterTableRow>

          {/* Discount */}
          {useDiscount && discountAvailable?.percentage ? (
            <StyledFooterTableRow>
              <TableCell>Discount ({discountAvailable.percentage}%)</TableCell>
              <TableCell align="center">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">
                -{formatCurrency(discountAmount)}
              </TableCell>
            </StyledFooterTableRow>
          ) : null}

          {/* Taxes */}
          <StyledFooterTableRow>
            <TableCell>Taxes ({taxRate}%)</TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="right">-</TableCell>
            <TableCell align="right">{formatCurrency(taxes)}</TableCell>
          </StyledFooterTableRow>

          {/* Total */}
          <StyledFooterTableRow>
            <TableCell>
              <Typography variant="h6" component="div">
                Total Amount
              </Typography>
            </TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="right">-</TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="div">
                {formatCurrency(totalAmount)}
              </Typography>
            </TableCell>
          </StyledFooterTableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}
