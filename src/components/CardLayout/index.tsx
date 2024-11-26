/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import Header from '../Header';
import './styles.css';
import { TabLine } from './styles';
import {
  LinearProgress,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { quoteTexts } from '../../constants';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import Button from '../../stories/button/Button';
import axios from 'axios';
import UploadStlCard from '../../pages/UploadStlTab/UploadStlTab';
import api from '../../axiosConfig';
import { saveFile } from '../../utils/indexedDB'; // Import the saveFile function
import { useSelector } from 'react-redux';

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
  fileUrl?: string; // Optional, will be set upon saving to IndexedDB
}

const styles = {
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  },
};

const CardLayout = () => {
  const { pathname } = useLocation();
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const totalTabs = quoteTexts.length;
  const { orderId } = useParams();
  const [allPrinterSelected, setAllPrinterSelected] = useState(false);
  const fileDetails = useSelector((state: any) => state.fileDetails.files);

  // Check if all files have a printer selected
  // useEffect(() => {
  //   if (pathname.includes(ROUTES.CUSTOMIZE)) {
  //     const allPrintersSelected = fileDetails.every((file: any) => file.printer !== null);

  //     setAllPrinterSelected(allPrintersSelected);
  //   }
  // }, [fileDetails, pathname]);

  // New state for managing the loading spinner
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.includes(ROUTES.UPLOAD_STL)) {
      setActiveTabs([0]);
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      setActiveTabs([0, 1]);
    } else if (pathname.includes(`get-quotes/${orderId}/quote`)) {
      setActiveTabs([0, 1, 2]);
    } else if (pathname.includes(ROUTES.CHECKOUT)) {
      setActiveTabs([0, 1, 2, 3]);
    } else {
      setActiveTabs([]);
    }
  }, [pathname, orderId]); // Added orderId to dependencies

  // Calculate progress value based on the active tab
  const getProgressValue = () => {
    return (activeTabs.length / totalTabs) * 100;
  };

  /**
   * Handle the Proceed button click.
   * Saves files to IndexedDB and proceeds based on the current route.
   */
  const onProceed = useCallback(async () => {
    // Add validation for files before proceeding from upload step
    if (pathname.includes(ROUTES.UPLOAD_STL) && files.length === 0) {
      alert('Please upload at least one file before proceeding');
      return;
    }

    if (pathname.includes(ROUTES.UPLOAD_STL)) {
      setIsSaving(true); // Start loading spinner

      try {
        // Save each file to IndexedDB
        const updatedFiles = await Promise.all(
          files.map(async (file) => {
            const fileUrl = `${file.id}`; // Using file.id as the key
            await saveFile(fileUrl, file.file); // Save to IndexedDB
            return { ...file, fileUrl }; // Update fileUrl in the state
          })
        );

        setFiles(updatedFiles); // Update state with fileUrls

        // Proceed with your existing API call after saving to IndexedDB
        const formData = new FormData();
        updatedFiles.forEach((file) => {
          formData.append('files', file.file);
          formData.append('quantity', file.quantity.toString());
          formData.append('dimensions', JSON.stringify(file.dimensions));
        });

        const response = await api.put(
          `/update-user-order/${orderId}`,
          formData
        );
        if (response.status === 200) {
          setFiles([]);
          setActiveTabs([0, 1]);
          navigate(`${response.data.data._id}/customize`);
        }

        setIsSaving(false); // Stop loading spinner
      } catch (error) {
        console.error('Error processing proceed action:', error);
        setIsSaving(false); // Stop loading spinner even if there's an error
        alert('Failed to proceed. Please try again.');
      }
    } else if (pathname === '/get-quotes') {
      setIsSaving(true); // Start loading spinner
      try {
        const response = await api.post(`/create-order`);
        if (response.status === 200) {
          console.log('Order created successfully!');
          setActiveTabs([0]);
          navigate(`${response.data.data._id}/upload-stl`);
        }
        setIsSaving(false); // Stop loading spinner
      } catch (error) {
        console.error('Error creating order:', error);
        setIsSaving(false); // Stop loading spinner even if there's an error
        alert('Failed to create order. Please try again.');
      }
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      setActiveTabs([0, 1, 2]);
      navigate(`${orderId}/quote`);
    } else if (pathname.includes(`/get-quotes/${orderId}/quote`)) {
      setActiveTabs([0, 1, 2, 3]);
      navigate(`${orderId}/checkout`);
    }
  }, [files, navigate, orderId, pathname]);

  const handlePayment = async () => {
    setIsSaving(true); // Start loading spinner
    try {
      const response = await api.post(`/checkout/${orderId}`);
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsSaving(false); // Stop loading spinner
    }
  };

  return (
    <div className="cardLayout">
      <div className="headerCard">
        {activeTabs.length > 0 && (
          <TabLine>
            <LinearProgress variant="determinate" value={getProgressValue()} />
          </TabLine>
        )}
        <Header tabData={quoteTexts} insideTab={true} />
      </div>
      <div className="mainCardContent">
        {pathname.includes(ROUTES.UPLOAD_STL) ? (
          <UploadStlCard files={files} setFiles={setFiles} />
        ) : (
          <Outlet context={{ files, setFiles }} />
        )}
      </div>

      {/* Loading Overlay */}
      {isSaving && (
        <Box className="loading-overlay" sx={styles.loadingOverlay}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginTop: '1rem' }}>
            Processing...
          </Typography>
        </Box>
      )}

      {/* Proceed Button */}
      {pathname !== `/get-quotes/${orderId}/checkout` &&
        !pathname.includes(
          `/get-quotes/${orderId}/checkout/select-delivery`
        ) && (
          <div className="btn">
            <div></div>
            <span className="proc">
              <Button
                label={
                  !pathname.includes(ROUTES.PAYMENT) ? 'Proceed' : 'Pay now'
                }
                onClick={
                  !pathname.includes(ROUTES.PAYMENT) ? onProceed : handlePayment
                }
                disabled={isSaving} // Disable button while saving or processing payment
              />
            </span>
          </div>
        )}
    </div>
  );
};

export default CardLayout;
