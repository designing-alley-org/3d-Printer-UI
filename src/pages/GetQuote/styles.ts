// QuoteCardStyles.ts
import { SxProps } from '@mui/material';

export const innerBox: SxProps = {
backgroundColor: '#F9FAFB',
padding: '2rem',
borderRadius: '25px',
boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
};

export const content: SxProps = {
  padding: '0rem 0rem 1rem',
};

export const upperQuoteText: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const instantQuoteText: SxProps = {

  fontSize: '1.5rem',
  color: '#1E6FFF',
  padding: '1rem 0rem',
  marginBottom: '1rem',

  '@media (max-width: 1020px)': {
    fontSize: '1.25rem',
  },
};

export const cardBox: SxProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',

  '@media (max-width: 1020px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

export const quoteTextBox: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4rem',
};

export const quoteIcon: SxProps = {
  width: '3.6rem',
  height: '3.5rem',
  bgcolor: '#E8EFF9',
  borderRadius: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '1.8rem',
};

export const quoteIdText: SxProps = {

  fontWeight: 400,
  fontSize: '2.25rem',
  color: '#0047FF',
};

export const quoteLabelText: SxProps = {

  fontWeight: 500,
  fontSize: '1.25rem',
  color: '#0047FF',
};
