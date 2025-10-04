import { useNavigate, useParams } from "react-router-dom"
import StepLayout from "../../components/Layout/StepLayout"
import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material"


// Icon
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';


import PriceTable, { PriceTableProps } from "./PriceTabel";
import { useEffect, useState } from "react";

import { getCheckoutDetailsService } from "../../services/order";

type fetchOrderProps = {
  orderId: string;
  setData: React.Dispatch<React.SetStateAction<PriceTableProps>>;
  setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const fetchOrder = async ({ orderId, setData, setIsPageLoading }: fetchOrderProps) => {
     const response = await getCheckoutDetailsService({orderId});
     setData(response);
     setIsPageLoading(false);
}

const PriceChart = () => {

  const navigate = useNavigate()
  const { orderId, orderNumber } = useParams()
  const [data, setData] = useState<PriceTableProps>({
    subtotal: 0,
    taxes: 0,
    taxRate: 0,
    totalAmount: 0,
    fileTable: []
  })
  const isLoading = false
  const [ isPageLoading, setIsPageLoading] = useState<boolean>(true)
  const isDisabled = false

  useEffect(() => {
    if (orderId)  fetchOrder({ orderId, setData, setIsPageLoading })
  }, [orderId])

  return (
     <StepLayout
      stepNumber={3}
      stepText="Get Your Price"
      stepDescription="The best price for your 3D print"
      onClick={() => navigate('/get-quotes/' + orderId + '/' + orderNumber + '/checkout')}
      onClickBack={() => navigate('/get-quotes/' + orderId + '/' + orderNumber + '/customize')}
      isButtonsHide={false}
      orderNo={orderNumber}
      isLoading={isLoading}
      isPageLoading={isPageLoading}
      isDisabled={isDisabled}
      buttonLabel="Proceed to Checkout"
    >
      <Card>
        <CardHeader title={
          <Typography variant="h6" component="div" color="primary.main" sx={{ fontWeight: 600 }}>
          <MonetizationOnOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Price
          </Typography>
        } 
        sx={{ pb: 0 }}
        />
        <CardContent>
          <PriceTable  
          subtotal={data?.subtotal || 0} 
          taxes={data?.taxes || 0} 
          taxRate={data?.taxRate || 0} 
          totalAmount={data?.totalAmount || 0} 
          fileTable={data?.fileTable || []} />
        </CardContent>
      </Card>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ alignItems: 'self', display: 'flex', justifyContent: 'start', mt: 2 }}>
        <InfoOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        Connect with admin to discuss before proceeding. <Link  variant="body2" color="primary" component="span" onClick={() => {navigate('/account/help', { state: { orderId, orderNumber , data } })}} > Connect Now</Link>
      </Typography>
      </StepLayout>
  )
}

export default PriceChart