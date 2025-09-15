import { useNavigate, useParams } from "react-router-dom"
import StepLayout from "../../components/Layout/StepLayout"
import { Box, Card, CardContent, CardHeader, Link, Typography } from "@mui/material"


// Icon
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PriceTable from "./PriceTabel";
import { useEffect, useState } from "react";
import { getAllFilesByOrderId } from "../../services/filesService";
import { FileDataDB } from "../../types/uploadFiles";

type fetchOrderProps = {
  orderId: string;
  setFiles: React.Dispatch<React.SetStateAction<FileDataDB[]>>;
  setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchOrder = async ({ orderId, setFiles, setIsPageLoading }: fetchOrderProps) => {
     const response = await getAllFilesByOrderId(orderId);
     setFiles(response);
     setIsPageLoading(false);
}

const PriceChart = () => {

  const navigate = useNavigate()
  const orderId = useParams().orderId || ""
  const [files, setFiles] = useState<FileDataDB[]>([])
  const isLoading = false
  const [ isPageLoading, setIsPageLoading] = useState<boolean>(true)
  const isDisabled = false

  useEffect(() => {
    if (orderId)  fetchOrder({ orderId, setFiles, setIsPageLoading })
  }, [orderId])

  return (
     <StepLayout
      stepNumber={3}
      stepText="Get Your Price"
      stepDescription="The best price for your 3D print"
      onClick={() => navigate('/get-quotes/' + orderId + '/checkout')}
      onClickBack={() => navigate('/get-quotes/' + orderId + '/customize')}
      isButtonsHide={false}
      orderId={orderId}
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
        } />
        <CardContent>
          <PriceTable  files={files} />
        </CardContent>
      </Card>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ alignItems: 'self', display: 'flex', justifyContent: 'start', mt: 2 }}>
        <InfoOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        Connect with admin to discuss before proceeding. <Link variant="body2" color="primary" component="span"> Connect Now</Link>
      </Typography>
      </StepLayout>
  )
}

export default PriceChart