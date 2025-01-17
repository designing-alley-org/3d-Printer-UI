import { Box, Typography } from '@mui/material';
import { QuoteBox } from './styles';
import Chat from '../Chat';
import { useEffect, useState } from 'react';
import QuoteTemplate from '../Template/index.tsx';
import './style.css';
import { useParams } from 'react-router-dom';
import { getQuoteByOrderId } from '../../../store/actions/getQuotes.ts';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './style.css';
import ButtonWithIcon from '../../../stories/ButtonWithIcon/ButtonWithIcon.tsx';
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


export default function Quote({selectOrderIdProps: selectOrderIdProps}: any) {
  const { orderId } = useParams<{ orderId: string }>();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [allQuotes, setAllQuotes] = useState<QuoteData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showQuote, setShowQuote] = useState(false);
  async function getQuotes() {
    getQuoteByOrderId({
      orderId: orderId as string || selectOrderIdProps || "",
      setAllQuotes,
      setQuote,
      activeIndex,
    });
  }
  useEffect(() => {
    getQuotes();
  }, []);
  return (
    <QuoteBox>
      <Typography
        sx={{ color: '#0C2850', position: 'absolute', top: '-1%' }}
        variant="h2"
      >
        Connecting For {selectOrderIdProps ? "Dispute":"Quote"}
      </Typography>
      <Box sx={{ position: 'absolute', right: '0rem', top: '0' }}>
        {' '}
        <span className="proc">
          <ButtonWithIcon
            label="SHOW QUOTE"
            handleClick={() => {
              setShowQuote(!showQuote);
              getQuotes();
            }}
            iconPosition="end"
            Icon={
              showQuote ? (
                <ArrowCircleDownIcon
                  sx={{ fontSize: '3rem' }}
                  fontSize="large"
                />
              ) : (
                <ArrowCircleUpIcon fontSize="large" />
              )
            }
          />
        </span>
      </Box>
      <Box
        sx={{
          display: showQuote ? 'block' : 'none',
          width: '95%',
          top: '10%',
          left: '2%',
          padding: '0 0rem 0 1rem',
          background: '#F1F6FE',
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
      <Box sx={{ height: '100%', width: '100%', mt: '1rem' }}>
        <Chat />
      </Box>
    </QuoteBox>
  );
}
