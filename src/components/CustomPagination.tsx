import React from 'react';
import {
  Box,
  Pagination,
  PaginationItem,
  Typography,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  useTheme,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Types
interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalOrders?: number;
  ordersPerPage?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ReusablePaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  showItemsInfo?: boolean;
  itemName?: string; // e.g., "orders", "items", "products"
  disabled?: boolean;
}

// Styled components
const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.customColors.textDark,
    margin: '0 2px',
    minWidth: '40px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    
    '&:hover': {
      backgroundColor: theme.palette.customColors.primaryLight,
      borderColor: theme.palette.customColors.primaryDark,
      color: theme.palette.customColors.primaryDark,
    },
    
    '&.Mui-selected': {
      backgroundColor: theme.palette.customColors.primaryDark,
      color: theme.palette.customColors.primaryLight,
      borderColor: theme.palette.customColors.primaryDark,
      
      '&:hover': {
        backgroundColor: theme.palette.customColors.primaryDark,
        opacity: 0.9,
      },
    },
    
    '&.Mui-disabled': {
      backgroundColor: '#F5F5F5',
      color: theme.palette.customColors.textLight,
      borderColor: theme.palette.divider,
    },
  },
  
  '& .MuiPaginationItem-previousNext': {
    fontSize: '0.75rem',
    
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 80,
  
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '40px',
    fontSize: '0.875rem',
    backgroundColor: theme.palette.background.paper,
    
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    
    '&:hover fieldset': {
      borderColor: theme.palette.customColors.primaryDark,
    },
    
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.customColors.primaryDark,
      borderWidth: '1px',
    },
  },
  
  '& .MuiSelect-select': {
    padding: '8px 12px',
    color: theme.palette.customColors.textDark,
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.customColors.textLight,
  fontSize: '0.875rem',
  fontWeight: 500,
}));

const CustomPagination: React.FC<ReusablePaginationProps> = ({
  pagination,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
  pageSizeOptions = [5, 10, 20, 50],
  showItemsInfo = true,
  itemName = 'items',
  disabled = false,
}) => {
  const theme = useTheme();
  
  const {
    currentPage,
    totalPages,
    totalOrders = 0,
    ordersPerPage = 10,
  } = pagination;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (!disabled) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  // Calculate items range for current page
  const startItem = totalOrders === 0 ? 0 : (currentPage - 1) * ordersPerPage + 1;
  const endItem = Math.min(currentPage * ordersPerPage, totalOrders);

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1 && !showPageSizeSelector) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Items info */}
      {showItemsInfo && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoText>
            {totalOrders === 0
              ? `No ${itemName} found`
              : `Showing ${startItem}-${endItem} of ${totalOrders} ${itemName}`
            }
          </InfoText>
        </Box>
      )}

      {/* Center: Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        {totalPages > 1 && (
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            disabled={disabled}
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: ArrowBackIosIcon,
                  next: ArrowForwardIosIcon,
                }}
                {...item}
              />
            )}
          />
        )}
      </Box>

      {/* Page size selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <Stack direction="row" spacing={1} alignItems="center">
          <InfoText>Show:</InfoText>
          <StyledFormControl size="small" disabled={disabled}>
            <Select
              value={ordersPerPage}
              onChange={handlePageSizeChange}
              displayEmpty
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <InfoText>per page</InfoText>
        </Stack>
      )}
    </Box>
  );
};

export default CustomPagination;
