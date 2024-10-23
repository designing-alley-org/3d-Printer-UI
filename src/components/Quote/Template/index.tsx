import React, { useState } from 'react';
import { Box, Divider, Typography, TextField, Button } from '@mui/material';
import { TemplateWrapper } from './styles';

interface QuoteItem {
  file: string;
  quantity: number;
  price: number;
}

interface QuoteData {
  Items: QuoteItem[];
  Shipping: number;
  Taxes: number;
}

interface SummaryRow {
  label: string;
  value: number;
}

interface ActionButton {
  label: string;
  onClick: () => void;
}

const QuoteTemplate: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData>({
    Items: [
      { file: 'file1', quantity: 1, price: 100 },
      { file: 'file2', quantity: 1, price: 200 },
      { file: 'file3', quantity: 1, price: 300 },
    ],
    Shipping: 100,
    Taxes: 50,
  });

  const [showNegotiate, setShowNegotiate] = useState<boolean>(false);

  const calculateTotals = (): { totalPrice: number; total: number } => {
    const totalPrice = quote.Items.reduce((sum, item) => sum + item.price, 0);
    const total = totalPrice + quote.Shipping + quote.Taxes;
    return { totalPrice, total };
  };

  const { totalPrice, total } = calculateTotals();

  const handlePriceChange = (index: number, newPrice: string): void => {
    const updatedItems = [...quote.Items];
    updatedItems[index].price = Number(newPrice) || 0;
    setQuote({ ...quote, Items: updatedItems });
  };

  // Summary rows configuration
  const summaryRows: SummaryRow[] = [
    { label: 'Total Price', value: totalPrice },
    { label: 'Shipping', value: quote.Shipping },
    { label: 'Taxes', value: quote.Taxes },
  ];

  // Action buttons configuration
  const actionButtons: ActionButton[] = [
    { label: 'Negotiate', onClick: () => setShowNegotiate(!showNegotiate) },
    { label: 'Reject', onClick: () => {} },
    { label: 'Put Order on Hold', onClick: () => {} },
    { label: 'Approve', onClick: () => {} },
  ];

  return (
    <TemplateWrapper>
      <Typography variant="body1">Quote Chat</Typography>
      <Typography variant="h2" sx={{ color: '#1E6FFF', mb: 2 }}>
        {showNegotiate ? 'Negotiate Quote' : 'Merchant Quote'}
      </Typography>

      <Divider />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          gap: 2,
          position: 'relative',
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Files
        </Typography>
        <Divider
          sx={{ position: 'absolute', left: showNegotiate ? '25%' : '33%' }}
          orientation="vertical"
        />
        <Typography variant="body1" fontWeight="bold" textAlign="center">
          Quantity
        </Typography>
        <Divider
          sx={{ position: 'absolute', left: showNegotiate ? '50%' : '66%' }}
          orientation="vertical"
        />
        <Typography
          variant="body1"
          fontWeight="bold"
          textAlign={showNegotiate ? 'center' : 'right'}
        >
          Pricing
        </Typography>
        {showNegotiate && (
          <>
            <Divider
              sx={{ position: 'absolute', left: '75%' }}
              orientation="vertical"
            />
            <Typography variant="body1" fontWeight="bold" color="#1E6FFF">
              Price Negotiate
            </Typography>
          </>
        )}

        {quote.Items.map((item, index) => (
          <React.Fragment key={item.file}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  height: 32,
                  width: 32,
                  backgroundColor: '#DDE9FC',
                  borderRadius: '25%',
                }}
              />
              <Typography variant="body2">{item.file}</Typography>
            </Box>
            <Typography variant="body2" textAlign="center">
              {item.quantity}
            </Typography>
            <Typography
              variant="body2"
              textAlign={showNegotiate ? 'center' : 'right'}
            >
              ${item.price.toFixed(2)}
            </Typography>
            {showNegotiate && (
              <TextField
                size="small"
                value={item.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#DDE9FC' } }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Summary Rows */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          gap: 2,
          mb: 2,
        }}
      >
        {summaryRows.map(({ label, value }) => (
          <React.Fragment key={label}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2" gridColumn="2 / span 2" textAlign="right">
              ${value.toFixed(2)}
            </Typography>
            {showNegotiate && (
              <Typography variant="body2" textAlign="right">
                ${value.toFixed(2)}
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Total Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          gap: 2,
          mb: 4,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          gridColumn="2 / span 2"
          textAlign="right"
        >
          ${total.toFixed(2)}
        </Typography>
        {showNegotiate && (
          <Typography variant="body1" fontWeight="bold" textAlign="right">
            ${total.toFixed(2)}
          </Typography>
        )}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {actionButtons.map((button) => (
          <Button
            key={button.label}
            variant="contained"
            onClick={button.onClick}
            sx={{
              textTransform: 'none',
              bgcolor: button.label === 'Approve' ? '#1E6FFF' : 'transparent',
              color: button.label === 'Approve' ? 'white' : '#1E6FFF',
              border: button.label === 'Approve' ? 'none' : '1px solid #1E6FFF',
              '&:hover': {
                bgcolor: button.label === 'Approve' ? '#1555CC' : 'rgba(30, 111, 255, 0.04)',
              },
            }}
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </TemplateWrapper>
  );
};

export default QuoteTemplate;