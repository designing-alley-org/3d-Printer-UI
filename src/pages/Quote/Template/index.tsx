import React, { useState } from 'react';
import { Box, Divider, Typography, TextField, useMediaQuery } from '@mui/material';
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');

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
        <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '1rem', color: '#2359B0', pt: isSmallScreen ? '0.5rem' : '1rem' }}>
          Quote Chat
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            maxWidth: isSmallScreen ? '52%' : '36%',
            overflowX: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
              height: isSmallScreen ? '0.3rem' : '0.7rem',
              width: isSmallScreen ? '0.3rem' : '',
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
                width: '9rem',
                height: '100%',
              }}
              onClick={() => handleQuoteClick(item, index)}
            >
              <Box
                sx={{
                  width: isSmallScreen ? '5rem' : '9rem',
                  height: isSmallScreen ? '0.1rem' : '1rem',
                  borderBottom: `10px solid ${item._id === quote?._id ? '#1E6FFF' : '#F1F6FE'}`,
                  backgroundColor:
                    item._id === quote?._id ? '#66A3FF' : 'white',
                  position: 'sticky',
                  zIndex: 9,
                  borderRadius: '0rem 0rem 1rem 1rem',
                }}
              ></Box>
              <Typography
                sx={{ textAlign: 'center', width: isSmallScreen ? '5rem' : '10rem', my: '1rem', fontSize: isSmallScreen ? '0.6rem' : '0.8rem' }}
              >
                Quote {index + 1}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Typography variant={isSmallScreen ? 'body2' : 'h1'} sx={{ color: '#2359B0', mb: 1 }}>
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
              gap: { xs: 1.5, md: 3 },
              position: 'relative',
              padding: isSmallScreen ? '1rem 0.1rem' : '1rem',
              maxHeight: '15rem',
              overflowY: 'auto',
              mr: '1rem',
              '&::-webkit-scrollbar': {
                height: '0.4rem',
                cursor: 'pointer',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#fffff',
                borderRadius: '10px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: isSmallScreen ? '' : 'space-between',
              }}
            >
              <Typography sx={{ fontSize: isSmallScreen ? '0.6rem' : '.9rem', mr: isSmallScreen ? 2 : '' }} fontWeight="bold">
                Files
              </Typography>
              <Box
                sx={{
                  height: { xs: 12, md: 27 },
                  width: { xs: 12, md: 27 },
                  fontSize: isSmallScreen ? '0.5rem' : '0.8rem',
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
                left: { xs: showNegotiate ? '33%' : '35%', md: showNegotiate ? '25%' : '33%' },
                background: '#66A3FF',
              }}
              orientation="vertical"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: { xs: '1rem' },
              }}
            >
            <Typography sx={{ fontSize: isSmallScreen ? '0.6rem' : '.9rem' }} fontWeight="bold">
                Quantity
              </Typography>
              <Box
                sx={{
                  height: { xs: 12, md: 27 },
                  width: { xs: 12, md: 27 },
                  fontSize: isSmallScreen ? '0.5rem' : '0.8rem',
                  backgroundColor: '#66A3FF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginLeft: { xs: '0.5rem' },
                }}
              >
                {quote.files.length}
              </Box>
            </Box>
            <Divider
              sx={{
                position: 'absolute',
                left: { xs: showNegotiate ? '67%' : '70%', md: showNegotiate ? '50%' : '67%', },
                background: '#66A3FF',
              }}
              orientation="vertical"
            />
            <Typography
            sx={{ fontSize: isSmallScreen ? '0.6rem' : '.9rem',padding: isSmallScreen ? '0 0.7rem' : '0rem' }}
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
                    left: { xs: '102%', md: '75%' },
                    background: '#66A3FF',
                  }}
                  orientation="vertical"
                />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#1E6FFF"
                  sx={{ textAlign: 'right',fontSize: isSmallScreen ? '0.6rem' : '',width:isSmallScreen?'7rem':'' }}
                >
                  Price Negotiate
                </Typography>
              </>
            )}

            {quote.files.map((item, index) => (
              <React.Fragment key={item.fileName}>
                <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 3 }, alignItems: 'center' }}>
                  <Box
                    sx={{
                      height: { xs: 12, md: 27 },
                      width: { xs: 12, md: 27 },
                      fontSize: isSmallScreen ? '0.5rem' : '0.8rem',
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
                  <Typography sx={{ fontSize: isSmallScreen ? '0.6rem' : '.9rem'}}>{item.fileName?.split('-')[0]}</Typography>
                </Box>
                <Typography variant="body2" textAlign="center" sx={{ fontSize: isSmallScreen ? '0.6rem' : '.9rem',mt:isSmallScreen?'0.5rem':'' }}>
                  {item.quantity}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={showNegotiate ? 'right' : 'right'}
                  sx={{ fontSize: isSmallScreen ? '0.55rem' : '.9rem',padding: isSmallScreen ? '0 0.7rem' : '0rem' }}
                >
                  ${item.price.toFixed(2)}
                </Typography>
                {showNegotiate && (
                  <Box sx={{ textAlign: 'right' }}>
                    <TextField
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

          <Divider sx={{ mb: { xs: 0, md: 2 }, background: '#66A3FF' }} />

          {/* Summary Rows */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: showNegotiate
                ? 'repeat(4, 1fr)'
                : 'repeat(3, 1fr)',
              gap: { xs: 2, md: 4 },
              mb: { xs: 1, md: 2 },
              p: { xs: '0.5rem', md: '1rem' },
              mr: '1rem',
            }}
          >
            {summaryRows.map(({ label, value, updatedValue }) => (
              <React.Fragment key={label}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.6rem', md: '1rem' },
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.6rem', md: '0.9rem' },
                  }}
                  gridColumn="2 / span 2"
                  textAlign={{ xs: showNegotiate ? 'left' : 'right', md: 'right' }}
                >
                  ${value.toFixed(2)}
                </Typography>
                {showNegotiate && (
                  <Typography
                    variant="body2"
                    textAlign="right"
                    sx={{
                      fontSize: { xs: '0.6rem', md: '0.9rem' },
                    }}
                  >
                    ${updatedValue?.toFixed(2)}
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>

          <Divider
            sx={{
              mb: { xs: 1, md: 2 },
              background: '#66A3FF',
            }}
          />

          {/* Total Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: showNegotiate
                ? 'repeat(4, 1fr)'
                : 'repeat(3, 1fr)',
              gap: 2,
              mb: { xs: 2, md: 4 },
              p: { xs: '0.5rem', md: '1rem' },
              mr: { xs: '0.5rem', md: '1rem' },
            }}
          >
            <Typography
              variant={isSmallScreen ? 'caption' : 'body1'}
              fontWeight="bold"
            >
              Total
            </Typography>
            <Typography
              variant={isSmallScreen ? 'caption' : 'body2'}
              gridColumn="2 / span 2"
              textAlign={{ xs: showNegotiate ? 'left' : 'right', md: 'right' }}
              sx={{ fontWeight: '800' }}
            >
              $
              {(
                quote.totalPrice +
                (quote.tax * quote.totalPrice) / 100
              ).toFixed(2)}
            </Typography>
            {showNegotiate && (
              <Typography variant={isSmallScreen ? 'caption' : 'body1'} fontWeight="bold" textAlign="right">
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
                  gap: { xs: '0.5rem', md: '1rem' },
                  pb: { xs: '0.5rem', md: '1rem' },
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                  justifyContent: { xs: 'flex-start', md: 'space-between' },
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: isSmallScreen ? '0.57rem' : '0.8rem' }}
                >
                  Don’t Like our pricing? Click on negotiate ; to negotiate
                  pricing Details Live
                </Typography>
                <span className="negotiation">
                  <Button
                    label={'Negotiate'}
                    onClick={() => setShowNegotiate(!showNegotiate)}
                    className='negotiate-btn'
                  />
                </span>
              </Box>
            ) : (
              <Typography variant={isSmallScreen ? 'body2' : 'h1'} sx={{ color: '#2359B0', mb: 2 }}>
                Sent to Admin for Approval!
              </Typography>
            )}

            {quote.approvedBy?.role === 'user' || quote?.isClosed ? (
              quote?.approvedBy?.role === 'user' ? (
                <Typography variant={isSmallScreen ? 'body1' : 'h1'}  sx={{ color: '#2359B0',mb:2 }}>
                  Quote Approved
                </Typography>
              ) : (
                <Typography variant={isSmallScreen ? 'body1' : 'h1'} sx={{ color: '#2359B0',mb:2 }}>
                  Quote Negotiated
                </Typography>
              )
            ) : quote.approvedBy ? (
              <span className="approve-container">
                <Button
                  label={!showNegotiate ? 'Approve' : 'Send to Merchant'}
                  onClick={handleSend}
                  className='approve-btn'
                />
              </span>
            ) : null}
          </Box>
        </>
      ) : (
        <Typography variant={isSmallScreen ? 'body1' : 'h1'} sx={{ color: '#2359B0', mb: 2 }}>
          No Quote Found
        </Typography>
      )}
    </TemplateWrapper>
  );
};

export default QuoteTemplate;
