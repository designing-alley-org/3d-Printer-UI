import { Box, Typography, useMediaQuery } from '@mui/material';
import { QuoteBox } from './styles';
import Chat from '../Chat';
import { useEffect, useState } from 'react';
import QuoteTemplate from '../Template/index.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuoteByOrderId } from '../../../store/actions/getQuotes.ts';
import { useDispatch } from 'react-redux';
import MUIButton from '../../../stories/MUIButton/Button.tsx';
import { ArrowRightIcon } from 'lucide-react';
import StepLayout from '../../../components/Layout/StepLayout.tsx';
import { useSelector } from 'react-redux';

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

export default function Quote({ selectOrderIdProps: selectOrderIdProps }: any) {
  const { orderId } = useParams<{ orderId: string }>();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [allQuotes, setAllQuotes] = useState<QuoteData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showQuote, setShowQuote] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const quoteDataClosed = useSelector((state: any) => state.quoteData.quoteClosed);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getQuotes() {
  await  getQuoteByOrderId({
      orderId: (orderId as string) || selectOrderIdProps || '',
      setAllQuotes,
      setQuote,
      activeIndex,
      dispatch,
    }).then(() => {
      setIsPageLoading(false);
    }).catch((error) => {
      console.error("Error fetching quotes:", error);
      setIsPageLoading(false);
    });
   
  }
  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <StepLayout
      stepNumber={3}
      stepText='Quote'
      stepDescription="Review the quote details and connect with the supplier."
      onClick={() =>  navigate(`/get-quotes/${orderId}/checkout`)}
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/customize`)}
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={!quoteDataClosed}
    >
    <QuoteBox>
      <Box
        sx={{
          position: 'absolute',
          width: isSmallScreen ? '90%' : '95%',
          top: '1rem',
          left: '1rem',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{ color: '#0C2850' }}
          variant={isSmallScreen ? 'body2' : 'h1'}
        >
          Connecting For {selectOrderIdProps ? 'Dispute' : 'Quote'}
        </Typography>
        <MUIButton
          label={showQuote ? 'Hide Quote' : 'Show Quote'}
          btnVariant="icon-soft"
          size={isSmallScreen ? 'small' : 'large'}
          icon={<ArrowRightIcon size={isSmallScreen ? 16 : 20} />}
          onClick={() => {
            setShowQuote(!showQuote);
            getQuotes();
          }}
          style={{
            width: isSmallScreen ? '7rem' : '',
            fontSize: isSmallScreen ? '0.6rem' : '',
          }}
        />
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
    </StepLayout>
  );
}
