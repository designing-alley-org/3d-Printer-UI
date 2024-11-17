/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Header from '../Header';
import './styles.css';
import { TabLine } from './styles';
import { LinearProgress } from '@mui/material';
import { quoteTexts } from '../../constants';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import Button from '../../stories/button/Button';
import axios from 'axios';
import UploadStlCard from '../TabComponents/UploadStlTab/UploadStlTab';
import api from '../../axiosConfig';
import { useForm } from 'react-hook-form';

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
}

const CardLayout = () => {
  const { pathname } = useLocation();
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const totalTabs = quoteTexts.length;
  const { orderId } = useParams();
  const formMethods = useForm();

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
  }, [pathname]);

  // Calculate progress value based on the active tab
  const getProgressValue = () => {
    return (activeTabs.length / totalTabs) * 100;
  };

  const onProceed = async () => {
    // Add validation for files before proceeding from upload step
    if (pathname.includes(ROUTES.UPLOAD_STL) && files.length === 0) {
      alert('Please upload at least one file before proceeding');
      return;
    }

    if (pathname.includes(ROUTES.UPLOAD_STL)) {
      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file.file);
          formData.append('quantity', file.quantity.toString());
          formData.append('dimensions', JSON.stringify(file.dimensions));
        });
        const response = await api.put(`/update-user-order/${orderId}`, 
          formData,
        );
        if (response.status === 200) {
          console.log('Files uploaded successfully!');
          setActiveTabs([0, 1]);
          navigate(`${response.data.data._id}/customize`);
        }
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else if (pathname === '/get-quotes') {
      try {
        const response = await api.post(`/create-order`);
        if (response.status === 200) {
          console.log('order-created successfully successfully!');
          setActiveTabs([0]);
          navigate(`${response.data.data._id}/upload-stl`);
        }
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      setActiveTabs([0, 1, 2]);
      navigate(`${orderId}/quote`);
    } else if (pathname === '/get-quotes/quote') {
      setActiveTabs([0, 1, 2, 3]);
      navigate(ROUTES.CHECKOUT);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/payment');
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
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
          <Outlet context={{ files, setFiles, formMethods }} />
        )}
      </div>
      {pathname !== (`/get-quotes/${orderId}/checkout`) && (
        <div className="btn">
          <div></div>
          <span className="proc">
            <Button
              label={!pathname.includes(ROUTES.PAYMENT) ? 'Proceed' : 'Pay now'}
              onClick={
                !pathname.includes(ROUTES.PAYMENT) ? onProceed : handlePayment
              }
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default CardLayout;
