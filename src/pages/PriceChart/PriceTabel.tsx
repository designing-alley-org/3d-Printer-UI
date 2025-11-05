import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { styled, Typography } from '@mui/material';
import { useMemo } from 'react';
import { formatCurrency } from '../../utils/function';
import { PriceTableProps } from '../../types/priceChart';

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
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& td:first-of-type': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

export default function PriceTable({
  subtotal,                
  taxRate,
  fileTable,
  discountAvailable,        
  useDiscount = false,      
}: PriceTableProps) {

  // Guard: Empty data
  if (!fileTable || fileTable.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No files available to display pricing.
      </Typography>
    );
  }

  // Derive line totals safely (fallback if totalPrice isn't provided)
  const rowsWithTotals = useMemo(() => {
    return fileTable.map((row) => {
      const total =
        typeof row.totalPrice === 'number'
          ? row.totalPrice
          : (row.quantity ?? 0) * (row.pricePerUnit ?? 0);
      return { ...row, _totalPrice: total };
    });
  }, [fileTable]);

  // Compute subtotal from rows if not provided as prop
  const computedSubtotal = useMemo(() => {
    if (typeof subtotal === 'number') return subtotal;
    return rowsWithTotals.reduce((acc, r) => acc + (r._totalPrice || 0), 0);
  }, [rowsWithTotals, subtotal]);

  // Is discount applied? (both enabled and accepted)
  const isDiscountApplied = useMemo(() => {
    return Boolean(
      useDiscount &&
      discountAvailable?.isUserAccepted &&
      (discountAvailable?.percentage ?? 0) > 0
    );
  }, [useDiscount, discountAvailable?.isUserAccepted, discountAvailable?.percentage]);

  // Discount amount
  const discountAmount = useMemo(() => {
    if (!isDiscountApplied) return 0;
    return (computedSubtotal * (discountAvailable!.percentage as number)) / 100;
  }, [isDiscountApplied, computedSubtotal, discountAvailable?.percentage]);

  // Effective subtotal (after discount if applied)
  const discountedSubtotal = useMemo(() => {
    return computedSubtotal - discountAmount;
  }, [computedSubtotal, discountAmount]);

  // Taxes on discounted subtotal
  const taxes = useMemo(() => {
    return (discountedSubtotal * (taxRate ?? 0)) / 100;
  }, [discountedSubtotal, taxRate]);

  // Grand total
  const totalAmount = useMemo(() => {
    return discountedSubtotal + taxes;
  }, [discountedSubtotal, taxes]);

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
          {rowsWithTotals.map((row) => (
            <StyledDataRow key={row.fileId}>
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="right">{formatCurrency(row.pricePerUnit)}</TableCell>
              <TableCell align="right">{formatCurrency(row._totalPrice)}</TableCell>
            </StyledDataRow>
          ))}
        </TableBody>

        <TableFooter>
          {/* Subtotal */}
          <StyledFooterTableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="right">-</TableCell>
            <TableCell align="right">{formatCurrency(computedSubtotal)}</TableCell>
          </StyledFooterTableRow>

          {/* Discount (only if applied) */}
          {isDiscountApplied && (
            <StyledFooterTableRow>
              <TableCell>Discount ({discountAvailable!.percentage}%)</TableCell>
              <TableCell align="center">-</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-{formatCurrency(discountAmount)}</TableCell>
            </StyledFooterTableRow>
          )}

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
