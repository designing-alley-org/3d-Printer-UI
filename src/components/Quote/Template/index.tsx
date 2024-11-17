import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography, TextField } from '@mui/material';
import { TemplateWrapper } from './styles';
import Button from '../../../stories/button/Button';
import './style.css';
import api from '../../../axiosConfig';
import { useParams } from 'react-router-dom';

interface QuoteItem {
  fileName: string;
  quantity: number;
  price: number;
}

interface QuoteData {
  quoteStatus: string;
  isClosed: boolean;
  approvedBy: any;
  tax: number;
  files: QuoteItem[];
  Shipping: number;
  Taxes: number;
  totalPrice: number;
  _id: string;
}

interface SummaryRow {
  label: string;
  value: number;
  updatedValue: number;
}

const QuoteTemplate: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [allQuotes, setAllQuotes] = useState<QuoteData[]>([]);
  const { orderId } = useParams<{ orderId: string }>();
  const [showNegotiate, setShowNegotiate] = useState<boolean>(false);
  const [updatedQuote, setUpdatedQuote] = useState<QuoteData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  async function getQuotes() {
    const res = await api.get(`/get-all-quotes/${orderId}`);
    setAllQuotes(res.data.data);
    setQuote(res.data.data[activeIndex]);
  }
  useEffect(() => {
    getQuotes();
  }, []);
  console.log(allQuotes);
  console.log(quote);

  const handlePriceChange = (index: number, newPrice: string): void => {
    if (quote) {
      const newFiles = [...quote.files];
      newFiles[index] = {
        ...newFiles[index],
        price: parseFloat(newPrice) || 0,
      };

      const updatedTotalPrice = newFiles.reduce(
        (acc, item) => acc + item.price,
        0
      );

      const updatedQuote = {
        ...quote,
        files: newFiles,
        totalPrice: updatedTotalPrice,
      };
      // setQuote(updatedQuote); // Update the main quote state
      setUpdatedQuote(updatedQuote); // Track updated data
    }
  };

  // Summary rows configuration
  const summaryRows: SummaryRow[] = [
    {
      label: 'Total Price',
      value: quote?.totalPrice || 0,
      updatedValue: updatedQuote?.totalPrice || 0,
    },
    {
      label: 'Taxes',
      value: ((quote?.tax ?? 0) * (quote?.totalPrice ?? 0)) / 100 || 0,
      updatedValue:
        ((updatedQuote?.tax ?? 0) * (updatedQuote?.totalPrice ?? 0)) / 100 || 0,
    },
  ];

  const handleSend = async () => {
    if (updatedQuote) {
      const res = await api.post(`/negotiate-quote/${quote?._id}/${orderId}`, {
        data: updatedQuote.files,
      });
      console.log('Negotiate', res);
    } else {
      const res = await api.put(`/approved-quote/${quote?._id}`, {
        approved: true,
      });
      console.log('Approve', res);
    }
    getQuotes();
  };

  const handleQuoteClick = (quote: QuoteData, index: number) => {
    setQuote(quote);
    setActiveIndex(index);
    setUpdatedQuote(null);
    setShowNegotiate(false);
  };

  return (
    <TemplateWrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" sx={{ color: '#2359B0' }}>
          Quote Chat
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {allQuotes.map((item, index) => (
            <Box
              key={item._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                backgroundColor: item._id === quote?._id ? '#66A3FF' : 'white',
                color: 'black',
                padding: '0.5rem 1rem',
              }}
              onClick={() => handleQuoteClick(item, index)}
            >
              <Typography variant="body1">Quote {index + 1}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Typography variant="h2" sx={{ color: '#2359B0', mb: 2 }}>
        Quote
      </Typography>

      <Divider sx={{ background: '#66A3FF' }} />

      {quote ? (
        <>
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
                {quote.files.length}
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
                {quote.files.length}
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
              textAlign={showNegotiate ? 'right' : 'right'}
            >
              Pricing
            </Typography>
            {showNegotiate && (
              <>
                <Divider
                  sx={{
                    position: 'absolute',
                    left: '75%',
                    background: '#66A3FF',
                  }}
                  orientation="vertical"
                />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#1E6FFF"
                  sx={{ textAlign: 'right' }}
                >
                  Price Negotiate
                </Typography>
              </>
            )}

            {quote.files.map((item, index) => (
              <React.Fragment key={item.fileName}>
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
                  <Typography variant="body2">{item.fileName}</Typography>
                </Box>
                <Typography variant="body2" textAlign="center">
                  {item.quantity}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={showNegotiate ? 'right' : 'right'}
                >
                  ${item.price.toFixed(2)}
                </Typography>
                {showNegotiate && (
                  <Box sx={{ textAlign: 'right' }}>
                    <TextField
                      size="small"
                      defaultValue={item.price}
                      value={updatedQuote?.files[index].price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      className="fields"
                    />
                  </Box>
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
            {summaryRows.map(({ label, value, updatedValue }) => (
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
                    ${updatedValue?.toFixed(2)}
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
              ${quote.totalPrice + (quote.tax * quote.totalPrice) / 100}
            </Typography>
            {showNegotiate && (
              <Typography variant="body1" fontWeight="bold" textAlign="right">
                $
                {(updatedQuote?.totalPrice ?? 0) +
                  ((updatedQuote?.tax ?? 0) * (updatedQuote?.totalPrice ?? 0)) /
                    100}
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
            {quote.approvedBy?.role === 'user' ||
            quote?.quoteStatus === 'Negotiate' ||
            quote?.isClosed ? null : quote.approvedBy ? (
              <Box
                sx={{
                  display: 'flex',
                  gap: '4rem',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  Don’t Like our pricing? Click on negotiate ; to negotiate
                  pricing Details Live
                </Typography>
                <span className="negotiation">
                  <Button
                    label={'Negotiate'}
                    onClick={() => setShowNegotiate(!showNegotiate)}
                  />
                </span>
              </Box>
            ) : (
              <h2>Sent to Admin for Approval!</h2>
            )}

            {quote.approvedBy?.role === 'user' || quote?.isClosed ? (
              quote?.approvedBy?.role === 'user' ? (
                <h2>Quote Approved</h2>
              ) : (
                <h2>Quote Negotiated </h2>
              )
            ) : quote.approvedBy ? (
              <span className="approve">
                <Button
                  label={!showNegotiate ? 'Approve' : 'Send to Merchant'}
                  onClick={handleSend}
                />
              </span>
            ) : null}
          </Box>
        </>
      ) : (
        <Typography variant="h2" sx={{ color: '#2359B0', mb: 2 }}>
          No Quote Found
        </Typography>
      )}
    </TemplateWrapper>
  );
};

export default QuoteTemplate;
