import React, { useState } from 'react';
import { Box, Divider, Typography, TextField } from '@mui/material';
import { TemplateWrapper } from './styles';
import Button from '../../../stories/button/Button';
import './style.css';

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
    { label: 'Taxes', value: quote.Taxes },
  ];

  // Action buttons configuration
  // const actionButtons: ActionButton[] = [
  //   { label: 'Negotiate', onClick: () => setShowNegotiate(!showNegotiate) },
  //   { label: 'Approve', onClick: () => {} },
  // ];

  return (
    <TemplateWrapper>
      <Typography variant="body1" sx={{ color: '#2359B0' }}>
        Quote Chat
      </Typography>
      <Typography variant="h2" sx={{ color: '#2359B0', mb: 2 }}>
        Quote
      </Typography>

      <Divider sx={{ background: '#66A3FF' }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate
            ? 'repeat(4, 1fr)'
            : 'repeat(3, 1fr)',
          gap: 4,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Files
          </Typography>
          <Box
            sx={{
              height: 32,
              width: 32,
              backgroundColor: '#66A3FF',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {quote.Items.length}
          </Box>
        </Box>
        <Divider
          sx={{
            position: 'absolute',
            left: showNegotiate ? '25%' : '33%',
            background: '#66A3FF',
          }}
          orientation="vertical"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Quantity
          </Typography>
          <Box
            sx={{
              height: 32,
              width: 32,
              backgroundColor: '#66A3FF',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {quote.Items.length}
          </Box>
        </Box>
        <Divider
          sx={{
            position: 'absolute',
            left: showNegotiate ? '50%' : '67%',
            background: '#66A3FF',
          }}
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
              sx={{ position: 'absolute', left: '75%', background: '#66A3FF' }}
              orientation="vertical"
            />
            <Typography variant="body1" fontWeight="bold" color="#1E6FFF">
              Price Negotiate
            </Typography>
          </>
        )}

        {quote.Items.map((item, index) => (
          <React.Fragment key={item.file}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Box
                sx={{
                  height: 32,
                  width: 32,
                  backgroundColor: '#66A3FF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {index + 1}
              </Box>
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
                className="fields"
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ mb: 2, background: '#66A3FF' }} />

      {/* Summary Rows */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showNegotiate
            ? 'repeat(4, 1fr)'
            : 'repeat(3, 1fr)',
          gap: 4,
          mb: 2,
        }}
      >
        {summaryRows.map(({ label, value }) => (
          <React.Fragment key={label}>
            <Typography variant="body2">{label}</Typography>
            <Typography
              variant="body2"
              gridColumn="2 / span 2"
              textAlign="right"
            >
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

      <Divider sx={{ mb: 2, background: '#66A3FF' }} />

      {/* Total Row */}
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
          gridColumn="2 / span 2"
          textAlign="right"
          sx={{ fontWeight: '800' }}
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          display: 'flex',
          gap: '4rem',
          alignItems: 'center',
        }}>
          <Typography variant="body1" fontWeight="bold">
            Don’t Like our pricing? Click on negotiate ; to negotiate pricing
            Details Live
          </Typography>
          <span className="negotiation">
            <Button
              label={'Negotiate'}
              onClick={() => setShowNegotiate(!showNegotiate)}
            />
          </span>
        </Box>
        <span className="approve">
          <Button
            label={'Approve'}
            onClick={() => setShowNegotiate(!showNegotiate)}
          />
        </span>
      </Box>
    </TemplateWrapper>
  );
};

export default QuoteTemplate;
