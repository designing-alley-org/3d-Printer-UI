import { Box, Typography } from '@mui/material';
import { QuoteBox } from './styles';
import Button from '../../../stories/button/Button';
import Chat from '../Chat';
import { useEffect, useState } from 'react';
import QuoteTemplate from '../Template/index.tsx';
import './style.css';
import api from '../../../axiosConfig.ts';
import { useParams } from 'react-router-dom';
import { getQuoteByOrderId } from '../../../store/actions/getQuotes.ts';

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

export default function Quote() {
  const { orderId } = useParams<{ orderId: string }>();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [allQuotes, setAllQuotes] = useState<QuoteData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showQuote, setShowQuote] = useState(false);
  async function getQuotes() {
    getQuoteByOrderId({orderId: orderId as string, setAllQuotes, setQuote, activeIndex});
  }
  useEffect(() => {
    getQuotes();
  }, []);
  return (
    <QuoteBox>
      <Typography
        sx={{ color: '#0B274F', position: 'absolute', top: '-1%' }}
        variant="h2"
      >
        Connecting For Quote
      </Typography>
      <Box sx={{ position: 'absolute', right: '0rem', top: '0' }}>
        {' '}
        <span className="proc">
          <Button
            label="SHOW QUOTE"
            onClick={() => {
              getQuotes();
              setShowQuote(!showQuote);
            }}
          />
        </span>
      </Box>
      <Box
        sx={{
          display: showQuote ? 'block' : 'none',
          width: '95%',
          top: '10%',
          left: '2%',
          padding: '1rem',
          background: '#DBEAFF',
          border: '1px solid #2359B0',
          borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem',
          position: 'absolute',
          zIndex: 1,
        }}
      >
        {
          <QuoteTemplate
            quote={quote}
            allQuotes={allQuotes}
            setActiveIndex={setActiveIndex}
            setQuote={setQuote}
            getQuotes={getQuotes}
          />
        }
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Chat />
      </Box>
    </QuoteBox>
  );
}
