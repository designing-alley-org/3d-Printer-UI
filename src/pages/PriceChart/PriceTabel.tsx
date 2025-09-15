import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { styled, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/function';
import {  FileDataDB } from '../../types/uploadFiles';

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
    borderBottom: 0,
  },
  '& td:first-of-type': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

// --- Mock Data ---

function createData(name: string, quantity: number, price: number) {
  return { name, quantity, price, total: quantity * price };
}

const rows = [
  createData('Frozen.stl', 1, 6.0),
  createData('Ice.stl', 2, 9.0),
  createData('Eclair.stl', 1, 16.0),
  createData('Cupcake.stl', 3, 3.7),
  createData('Gingerbread.stl', 1, 16.0),
];

type IProps = {
    files: FileDataDB[]
}

export default function PriceTable({ files }: IProps) {
  const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
  const taxRate = 0.18; // 18% tax
  const taxes = subtotal * taxRate;
  const grandTotal = subtotal + taxes;

  if (files.length === 0) {
    return <Typography variant="body1" align="center">No files available to display pricing.</Typography>;
  }

  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="price breakdown table">
        <StyledTableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Price Per Unit</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {files.map((row) => (
            // Use the new StyledDataRow component here
            <StyledDataRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              {/* <TableCell align="right">{formatCurrency(row.price)}</TableCell> */}
              {/* <TableCell align="right">{formatCurrency(row.total)}</TableCell> */}
            </StyledDataRow>
          ))}
        </TableBody>
        <TableFooter >
          <StyledFooterTableRow>
            <TableCell >
              <Typography variant="body1" fontWeight="600">Subtotal</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell align='right' >{formatCurrency(subtotal)}</TableCell>
          </StyledFooterTableRow>

          <StyledFooterTableRow>
            <TableCell >Taxes ({taxRate * 100}%)</TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell  align='right'>{formatCurrency(taxes)}</TableCell>
          </StyledFooterTableRow>

          <StyledFooterTableRow>
            <TableCell >
              <Typography variant="h6" component="div">Total Amount</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" fontWeight="600">-</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="div">{formatCurrency(grandTotal)}</Typography>
            </TableCell>
          </StyledFooterTableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}