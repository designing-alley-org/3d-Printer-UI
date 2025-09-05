import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Card, CardContent, Typography } from "@mui/material"
import CustomButton from "../../stories/button/CustomButton";
import { motion } from "framer-motion";

interface Props {
    id?: number;
    title?: string;
    Subtitle?: string;
    tag?: string;
    onClick?: () => void;
    isOpen?: boolean;
}

function cardCss(tag: string | undefined) {
    switch (tag) {
        case "pending":
            return { 
                backgroundColor: '#F7E6B3',
                border: '1px solid #FFC71E'
             };
        case "confirmed":
            return { 
                backgroundColor: '#B9DEAA',
                border: '1px solid #31AE00'
             };
        case "completed":
            return { 
                backgroundColor: '#B8D0F7',
                border: '1px solid #2E7EFF'
            };
        case "disputed":
            return { 
                backgroundColor: '#EFC2C2',
                border: '1px solid #E00000'
            };
        default:
            return {};
    }
}

function cardBadge(tag: string | undefined) {
    switch (tag) {
        case "pending":
            return { 
                backgroundColor: '#FFC71E',
                color: '#F7E6B3',
             };
        case "confirmed":
            return { 
                backgroundColor: '#31AE00',
                color: '#B9DEAA',
             };
        case "completed":
            return { 
                backgroundColor:'#2E7EFF',
                color: '#B8D0F7',
            };
        case "disputed":
            return { 
                backgroundColor: '#E00000',
                color: '#FFE5E5',
            };
        default:
            return {};
    }
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
        ...cardCss(tag) 
    }} 
       onClick={onClick}
        key={id}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', p: 1, alignItems: 'center' }}>
       <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{Subtitle}</Typography>
       </Box>
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <CustomButton
              children={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              style={{
                minWidth: "30px",
                height: "30px",
                borderRadius: "50%",
                padding: 0,
                ...cardBadge(tag),
              }}
            />
          </motion.div>
      </CardContent>
    </Card>
  )
}

export default StackCard