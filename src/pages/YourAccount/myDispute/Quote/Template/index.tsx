import React, { useState } from 'react';
import { Box, Divider, Typography, TextField } from '@mui/material';
import { TemplateWrapper } from './styles';
import Button from '../../../../../stories/button/Button';
import './style.css';
import api from '../../../../../axiosConfig';
import { useParams } from 'react-router-dom';

interface QuoteItem {
  fileName: string;
  quantity: number;
  price: number;
}

interface QuoteData {
  quoteStatus: string;
  isClosed: boolean;
  approvedBy: { role: string } | null;
  tax: number;
  files: QuoteItem[];
  Shipping: number;
  Taxes: number;
  totalPrice: number;
  _id: string;
}

interface QuoteTemplateProps {
  allQuotes: QuoteData[];
  quote: QuoteData | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setQuote: React.Dispatch<React.SetStateAction<QuoteData | null>>;
  getQuotes: () => void;
}

interface SummaryRow {
  label: string;
  value: number;
  updatedValue: number;
}

const QuoteTemplate: React.FC<QuoteTemplateProps> = ({
  allQuotes,
  quote,
  setActiveIndex,
  setQuote,
  getQuotes,
}) => {
  const { orderId } = useParams<{ orderId: string }>();
  const [showNegotiate, setShowNegotiate] = useState<boolean>(false);
  const [updatedQuote, setUpdatedQuote] = useState<QuoteData | null>(null);

  const handlePriceChange = (index: number, newPrice: string): void => {
    if (quote) {
      const newFiles = updatedQuote
        ? [...updatedQuote.files]
        : [...quote.files];
      newFiles[index] = {
        ...newFiles[index],
        price: parseFloat(newPrice) || 0,
      };

      const updatedTotalPrice = newFiles.reduce(
        (acc, item) => acc + item.price,
        0
      );

      const updatedNewQuote = {
        ...quote,
        files: newFiles,
        totalPrice: updatedTotalPrice,
      };
      // setQuote(updatedQuote); // Update the main quote state
      setUpdatedQuote(updatedNewQuote); // Track updated data
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
      await api.post(`/negotiate-quote/${quote?._id}/${orderId}`, {
        data: updatedQuote.files,
      });
    } else {
      await api.put(`/approved-quote/${quote?._id}`, {
        approved: true,
      });
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
          position: 'relative',
          pr: '1rem',
        }}
      >
        <Typography variant="body1" sx={{ color: '#2359B0', pt: '1rem' }}>
          Quote Chat
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            maxWidth: '36%',
            overflowX: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
              height: '0.7rem',
              cursor: 'pointer',
            },
          }}
        >
          {allQuotes.map((item, index) => (
            <Box
              key={item._id}
              sx={{
                cursor: 'pointer',
                color: item._id === quote?._id ? '#1E6FFF' : 'black',
                width: '10rem',
                height: '100%',
              }}
              onClick={() => handleQuoteClick(item, index)}
            >
              <Box
                sx={{
                  width: '10rem',
                  borderBottom: `10px solid ${item._id === quote?._id ? '#1E6FFF' : '#F1F6FE'}`,
                  backgroundColor:
                    item._id === quote?._id ? '#66A3FF' : 'white',
                  position: 'sticky',
                  zIndex: 9,
                  borderRadius: '0rem 0rem 1rem 1rem',
                }}
              ></Box>
              <Typography
                sx={{ textAlign: 'center', width: '10rem', my: '1rem' }}
                variant="body1"
              >
                Quote {index + 1}
              </Typography>
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
              padding: '1rem',
              maxHeight: '18rem',
              overflowY: 'auto',
              mr: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
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
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box
                    sx={{
                      height: 32,
                      width: 42,
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
              p: '1rem',
              mr: '1rem',
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
              p: '1rem',
              mr: '1rem',
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
              $
              {(
                quote.totalPrice +
                (quote.tax * quote.totalPrice) / 100
              ).toFixed(2)}
            </Typography>
            {showNegotiate && (
              <Typography variant="body1" fontWeight="bold" textAlign="right">
                $
                {(
                  (updatedQuote?.totalPrice ?? 0) +
                  ((updatedQuote?.tax ?? 0) * (updatedQuote?.totalPrice ?? 0)) /
                    100
                ).toFixed(2)}
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
                  pb: '1rem',
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
                <div className="curve"></div>
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
