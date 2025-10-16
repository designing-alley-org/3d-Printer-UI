import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import { motion } from 'framer-motion';
import { cardBadge, cardCss } from '../../utils/colors';

interface Props {
  id?: number;
  title?: string;
  Subtitle?: string;
  tag?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

const StackCard = ({ id, title, Subtitle, tag, onClick, isOpen }: Props) => {
  return (
    <Card
      sx={{
        minWidth: { xs: 100, sm: 200, md: 250 },
        cursor: 'pointer',
        height: '5rem',
        boxShadow: '2px 2px 4px 0px #0000003D',
        '&:hover': { boxShadow: '4px 4px 8px 0px #0000003D' },
        ...cardCss(tag),
      }}
      onClick={onClick}
      key={id}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{Subtitle}</Typography>
        </Box>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <CustomButton
            children={
              isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            style={{
              minWidth: '30px',
              height: '30px',
              borderRadius: '50%',
              padding: 0,
              ...cardBadge(tag),
            }}
          />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default StackCard;
