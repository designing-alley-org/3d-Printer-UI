import React, { useState } from 'react';
import { Box, Divider, Typography, TextField } from '@mui/material';
import { TemplateWrapper } from './styles';
import Button from '../../../stories/button/Button';

export default function QuoteTemplate() {
  const [quote, setQuote] = useState({
    Items: [
      { file: 'file1', quantity: 1, price: 100 },
      { file: 'file2', quantity: 1, price: 200 },
      { file: 'file3', quantity: 1, price: 300 },
    ],
    Shipping: 100,
    Taxes: 50,
  });

  const [showNegotiate, setShowNegotiate] = useState(false);

  const calculateTotals = () => {
    const totalPrice = quote.Items.reduce((sum, item) => sum + item.price, 0);
    const total = totalPrice + quote.Shipping + quote.Taxes;
    return { totalPrice, total };
  };

  const { totalPrice, total } = calculateTotals();

  const handleNegotiate = () => {
    setShowNegotiate(!showNegotiate);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedItems = [...quote.Items];
    updatedItems[index].price = Number(newPrice) || 0;
    setQuote({ ...quote, Items: updatedItems });
  };

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
          gridTemplateColumns: showNegotiate
            ? 'repeat(4, 1fr)'
            : 'repeat(3, 1fr)',
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
          <Divider
            sx={{ position: 'absolute', left: '75%' }}
            orientation="vertical"
          />
        )}
        {showNegotiate && (
          <Typography variant="body1" fontWeight="bold" color="#1E6FFF">
            Price Negotiate
          </Typography>
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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate
            ? 'repeat(4, 1fr)'
            : 'repeat(3, 1fr)',
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="body2">Total Price</Typography>
        <Typography variant="body2" gridColumn="2 / span 2" textAlign="right">
          ${totalPrice.toFixed(2)}
        </Typography>
        {showNegotiate && (
          <Typography variant="body2" textAlign="right">
            ${totalPrice.toFixed(2)}
          </Typography>
        )}

        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2" gridColumn="2 / span 2" textAlign="right">
          ${quote.Shipping.toFixed(2)}
        </Typography>
        {showNegotiate && (
          <Typography variant="body2" textAlign="right">
            ${quote.Shipping.toFixed(2)}
          </Typography>
        )}

        <Typography variant="body2">Taxes</Typography>
        <Typography variant="body2" gridColumn="2 / span 2" textAlign="right">
          ${quote.Taxes.toFixed(2)}
        </Typography>
        {showNegotiate && (
          <Typography variant="body2" textAlign="right">
            ${quote.Taxes.toFixed(2)}
          </Typography>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate
            ? 'repeat(4, 1fr)'
            : 'repeat(3, 1fr)',
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

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button label="Negotiate" onClick={handleNegotiate} />
        <Button label="Reject" onClick={() => {}} />
        <Button label="Put Order on Hold" onClick={() => {}} />
        <Button label="Approve" onClick={() => {}} />
      </Box>
    </TemplateWrapper>
  );
}
