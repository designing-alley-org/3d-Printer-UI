/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { TabLine } from './styles';
import {
  LinearProgress,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { quoteTexts } from '../../constants';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import Button from '../../stories/button/Button';
import UploadStlCard from '../../pages/UploadStlTab/UploadStlTab';
import api from '../../axiosConfig';
import { useSelector } from 'react-redux';
import { uploadFilesByOrderId } from '../../store/actions/uploadFilesByOrderId';
import { createOrder } from '../../store/actions/createOrder';
import {  toast } from 'react-toastify';
import TabComponent from '../Tab';
import { useDispatch } from 'react-redux';
import { clearDB } from '../../utils/indexedDB';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  id: string;
  name: string;
  dimensions: ModelDimensions;
  file: any;
  quantity: number;
  fileUrl?: string;
}

const styles = {
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  }
};

const CardLayout = () => {
  const { pathname } = useLocation();
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const totalTabs = quoteTexts.length;
  const { orderId } = useParams();
  const [allFilesCustomized, setAllFilesCustomized] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const {  addressId } = useSelector((state: any) => state.address);
  const fileDetails = useSelector((state: any) => state.fileDetails.updateFiles);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const quoteDataClosed = useSelector((state: any) => state.quoteData.quoteClosed);
  console.log("quoteDataClosed", quoteDataClosed);
  const [isProcessingDisbled, setIsProcessingDisabled] = useState(false);



  // Disable processing button if no files are uploaded
  useEffect(() => {
    if (pathname.includes(ROUTES.UPLOAD_STL)) {
     files.length === 0 ? setIsProcessingDisabled(true) : setIsProcessingDisabled(false);
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      allFilesCustomized ? setIsProcessingDisabled(false) : setIsProcessingDisabled(true);
    }else if (pathname.includes(`/get-quotes/${orderId}/quote`)) {
      quoteDataClosed ? setIsProcessingDisabled(false) : setIsProcessingDisabled(true);
    } 
    else if (pathname.includes(`/get-quotes/${orderId}/checkout`)) {
      addressId === "" ? setIsProcessingDisabled(true) : setIsProcessingDisabled(false);
    }
  }, [pathname, files, addressId, quoteDataClosed, allFilesCustomized]);


  // Check if all files have been customized
  useEffect(() => {
    const allFilesCustom = fileDetails.every(
      (file: any) => file?.dimensions?.weight
    );
    setAllFilesCustomized(allFilesCustom);
  }, [fileDetails]);

  // Handle active tabs based on current route
  useEffect(() => {
    const updateActiveTabs = () => {
      if (pathname.includes(ROUTES.UPLOAD_STL)) {
        setActiveTabs([0]);
      } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
        setActiveTabs([0, 1]);
      } else if (pathname.includes(`/get-quotes/${orderId}/quote`)) {
        setActiveTabs([0, 1, 2]);
      } else if (pathname.includes(ROUTES.CHECKOUT) || pathname.includes(`/get-quotes/${orderId}/checkout`)) {
        
        setActiveTabs([0, 1, 2, 3]);
      } else {
        setActiveTabs([]);
      }
    };

    updateActiveTabs();
  }, [pathname, orderId]);

  const getProgressValue = () => {
    return (activeTabs.length / totalTabs) * 100;
  };

  const handlePayment = async () => {
    setIsSaving(true);
    try {

      const response = await api.post(`/checkout/${orderId}`);
      if (response.status === 200 && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Invalid payment URL received');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment!', {
        position: "bottom-right",
        });
     
    } finally {
      setIsSaving(false);
    }
  };

  const onProceed = useCallback(async () => {
    if (pathname.includes(ROUTES.UPLOAD_STL)) {
      setIsSaving(true);
      try {
        await uploadFilesByOrderId({
          orderId: orderId as string,
          files,
          setFiles,
          setActiveTabs,
          navigate,
          setIsSaving,
        });
      } catch (error) {
        toast.error('Failed to upload files!');
        setIsSaving(false);
      }
    } else if (pathname === '/get-quotes') {
      setIsSaving(true);
      try {
        await createOrder({
          setActiveTabs,
          setIsSaving,
          navigate,
        });
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error('Failed to create order.', {
          position: "bottom-right",
          });
        setIsSaving(false);
      }
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      clearDB();
      navigate(`/get-quotes/${orderId}/quote`);
    } else if (pathname.includes(`/get-quotes/${orderId}/quote`)) {
        navigate(`/get-quotes/${orderId}/checkout`);
    } else if (pathname.includes(`/get-quotes/${orderId}/checkout`)) {
     if(addressId === ""){
        toast.warning('Please select a delivery address!');
        return;
     }
      navigate(`/get-quotes/${orderId}/checkout/select-delivery`);
    }else if (pathname.includes(`/get-quotes/${orderId}/checkout/select-delivery`)) {
      handlePayment();
    }
  }, [files, navigate, orderId, pathname, allFilesCustomized, addressId, quoteDataClosed]);


  

  const renderButton = () => {
    const isCheckoutRoute = pathname === `/get-quotes/${orderId}/checkout`;
    const isDeliveryRoute = pathname.includes(`/get-quotes/${orderId}/checkout/select-delivery`);
    
    if (isDeliveryRoute) {
      return null;
    }

    return (
      <div className="btn">
        <div></div>
        <span className="proc">
          <Button
            label={isCheckoutRoute ? "Proceed to Delivery" : !pathname.includes(ROUTES.PAYMENT) ? "Proceed" : "pay"}
            onClick={
              !pathname.includes(ROUTES.PAYMENT) ? onProceed : handlePayment
            }
            className={isCheckoutRoute ? 'delivery' : 'proceed'}
            disabled={isSaving || isProcessingDisbled}
            type={isCheckoutRoute ? "submit" : "button"}
          />
        </span>
      </div>
    );
  };

  return (
    <div className="cardLayout">
      <div className="headerCard">
        {activeTabs.length > 0 && (
          <TabLine>
            <LinearProgress variant="determinate" value={getProgressValue()} />
          </TabLine>
        )}
        <TabComponent tabs={quoteTexts} numberId={false} activeTabs={activeTabs.length} insideTab={true}/>
      </div>
      
      <div className="mainCardContent">
        {pathname.includes(ROUTES.UPLOAD_STL) ? (
          <UploadStlCard files={files} setFiles={setFiles} />
        ) : (
          <Outlet context={{ files, setFiles }} />
        )}
      </div>

      {isSaving && (
        <Box sx={{ ...styles.loadingOverlay, padding: isSmallScreen ? '1rem' : '2rem' }}>
          <CircularProgress size={isSmallScreen ? 40 : 60} />
          <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ marginTop: '1rem' }}>
            Processing...
          </Typography>
        </Box>
      )}

      {renderButton()}
    </div>
  );
};

export default CardLayout;