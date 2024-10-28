// QuoteCardStyles.ts
import { SxProps } from '@mui/material';

export const innerBox: SxProps = {
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
export const content: SxProps = {
  padding: '0rem 4rem 4rem',
};

export const upperQuoteText: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const instantQuoteText: SxProps = {
  fontFamily: 'Michroma',
  fontSize: '32px',
  color: '#1E6FFF',
  padding: '4rem 0rem',
};

export const cardBox: SxProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
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
  fontFamily: 'Michroma',
  fontWeight: 400,
  fontSize: '2.25rem',
  color: '#0047FF',
};

export const quoteLabelText: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 500,
  fontSize: '1.25rem',
  color: '#0047FF',
};
