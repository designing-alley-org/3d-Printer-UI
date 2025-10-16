import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { styled, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/function';
import { FileDataDB } from '../../types/uploadFiles';

// --- Styled Components for a cleaner look ---

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
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

// Style the TableRow in the body to set the color for all cells inside it
const StyledDataRow = styled(TableRow)(({ theme }) => ({
  // Target all TableCell components within this row
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

export type PriceTableProps = {
  subtotal: number;
  taxes: number;
  taxRate: number;
  totalAmount: number;
  fileTable: (FileDataDB & {
    fileId: string;
    pricePerUnit: number;
    totalPrice: number;
  })[];
};

export default function PriceTable({
  subtotal,
  taxes,
  taxRate,
  totalAmount,
  fileTable,
}: PriceTableProps) {
  if (fileTable.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No files available to display pricing.
      </Typography>
    );
  }

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
          {fileTable?.map((row) => (
            // Use the new StyledDataRow component here
            <StyledDataRow key={row.fileId}>
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="right">
                {formatCurrency(row.pricePerUnit)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.totalPrice)}
              </TableCell>
            </StyledDataRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledFooterTableRow>
            <TableCell>
              <Typography variant="body1" fontWeight="600">
                Subtotal
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
            <TableCell align="right">{formatCurrency(subtotal)}</TableCell>
          </StyledFooterTableRow>

          <StyledFooterTableRow>
            <TableCell>
              <Typography variant="body1" fontWeight="600">
                Taxes ({taxRate}%)
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
            <TableCell align="right">{formatCurrency(taxes)}</TableCell>
          </StyledFooterTableRow>

          <StyledFooterTableRow>
            <TableCell>
              <Typography variant="h6" component="div">
                Total Amount
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">
                -
              </Typography>
            </TableCell>
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
