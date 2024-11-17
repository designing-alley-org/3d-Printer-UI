import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
  Model,
  ModelName,
  CustomizeBox,
  Heading,
} from './styles';
import { customize, vector_black } from '../../../constants';
import Accordion from '../../Accordion';
import { addAllFiles, updateWeight } from '../../../store/customizeFilesDetails/reducer';
import { addDataSpec } from '../../../store/customizeFilesDetails/SpecificationReducer';
import api from '../../../axiosConfig';
import { set } from 'react-hook-form';

import { saveFile } from '../../../utils/indexedDB';
import ViewModelStl from '../../ViewStlFile';
// Define FileData type
interface FileData {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  weight: number;
  unit: string;
  dimensions: {
    height: number;
    length: number;
    width: number;
  };
}




const CustomizeTab: React.FC = () => {
  const [files, setFetchFiles] = useState<FileData[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [ weight, setWeight] = useState<number | null>(null);
  const [updateWidth, setUpdateWidth] = useState<number>(0);
  const [updateHeight, setUpdateHeight] = useState<number>(0);
  const [updateLength, setUpdateLength] = useState<number>(0);
  const [lenght, setLenght] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const dispatch = useDispatch();
  const { orderId } = useParams();

  const fileDetails = useSelector((state: any) => state.fileDetails.files);
  const activeFile = useMemo(() => {
    return fileDetails.find((file: any) => file._id === activeFileId) || null;
  }, [fileDetails, activeFileId]);


  // Fetch files from the server
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order-show/${orderId}`);
        const files = response.data.message.files.map((file: any) => ({
          _id: file._id,
          fileName: file.fileName.split('-')[0],
          fileUrl: file.fileUrl,
          quantity: file.quantity,
          color: file.color,
          material: file.material || '',
          technology: file.technology || '',
          weight: file.weight,
          unit: file.unit,
          printer: file.printer,
          dimensions: file.dimensions,

        }));
        setFetchFiles(files);
        dispatch(addAllFiles(files));
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId, dispatch]);

  const dimensions = useMemo(() => {
    if (activeFile) {
      return {
        height: activeFile.dimensions.height,
        length: activeFile.dimensions.length,
        width: activeFile.dimensions.width,
      };
    }
    return {
      height: 0,
      length: 0,
      width: 0,
    };
  }, [activeFile])

  useEffect(() => {
    
  },[set])



  
  // Store files in IndexedDB
  useEffect(() => {
    const storeFileInIndexedDB = async (fileUrl: string) => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        await saveFile(fileUrl, blob);
        console.log('File saved to IndexedDB');
      } catch (error) {
        console.error('Error saving file to IndexedDB:', error);
      }
    };

    files.forEach(file => {
      if (file.fileUrl) {
        storeFileInIndexedDB(file.fileUrl);
      }
    });
  }, [files]);
  // Get specifications
  const fetchSpec = useCallback(async () => {
    try {
      const response = await api.get(`/get-specification`);
      const data = response.data?.data?.[0]; // Access the first object in the array
      dispatch(addDataSpec(data));
    } catch (error) {
      console.error('Error fetching specification:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSpec();
  }, [fetchSpec]);

  // Get weight for stl file 
  const selectedMat = useSelector((state: any) => state.fileDetails.files.find((file: FileData) => file._id === activeFileId)?.material);
  const selectedMatMass = useSelector((state: any) => state.specification.material_with_mass);
  const materialMass = selectedMatMass?.find((mat : any) => mat.material_name === selectedMat)?.material_mass;
  
  
  const getWeight = useCallback(async () => {
    if (!selectedMat || !activeFileId || materialMass === undefined) return;
    try {
      const payload = {
        material_name: selectedMat,
        material_mass: materialMass,
      };
      const response = await api.put(`/process-order/${orderId}/file/${activeFileId}`, payload);
      console.log('Weight response:', response.data.data.dimensions.weight);
      setWeight(response.data.data.dimensions.weight);
      dispatch(updateWeight(response.data.data.dimensions.weight));
    } catch (error) {
      console.error('Error fetching weight:', error);
    }
  }, [selectedMat, activeFileId, materialMass, orderId]);

  const scaleStl = useCallback(async () => {
    if (!activeFileId || !orderId) return;
    try {
      const payload = {
        new_length: updateLength,
        new_width: updateWidth,
        new_height: updateHeight,
        unit: 'mm'
      };
      const response = await api.put(`/scale-order/${orderId}/file/${activeFileId}`, payload);
      console.log('Scale STL response:', response.data.data);
    } catch (error) {
      console.error('Error scaling STL:', error);
    }
  }, [activeFileId, orderId, updateLength, updateWidth, updateHeight]);
 

  // Check if all required fields are filled for the active file
  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    const { color, material, technology, printer } = activeFile;
    if (color && material && technology && printer) return false;
    return true;
  }, [activeFile]);

  const handleOpenViewer = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  const handleSetActiveFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  const handleApplySelection = async () => {
    if (!activeFile) return;
    try {
      // todo : store dimension in redux

      // get weight
      await getWeight();

      // scale stl
     if(updateWidth > 0 && updateHeight > 0 && updateLength > 0) {
      await scaleStl();
     }

      console.log('Apply selection response:', weight);
      // Handle success response
    } catch (error) {
      console.error('Error applying selection:', error);
      // Handle error response
    }
  };

  return (
    <Wrapper>
      <Heading>
        <h3>Customize your Files</h3>
        <h4>Edit your files as much as you want</h4>
      </Heading>

      <Filescomponent>
        <Files>
          <span className="header">
            <span className="file">Files</span>
            <span className="count">{files.length}</span>
          </span>
          <UploadedFile>
            {files.map((file) => (
              <span
                key={file._id}
                className="upload-file"
                onClick={() => handleSetActiveFile(file._id)}
                style={{
                  boxShadow:
                    activeFileId === file._id
                      ? '0px 0px 4.8px 0px #66A3FF'
                      : 'none',
                }}
              >
                <Model>
                  <span className="model-preview">
                  <ViewModelStl
  fileUrl={file.fileUrl}
  modelColor={activeFileId === file._id ? file.color : ''}
  // onDimensionsCalculated={handleDimensions}
/>
                  </span>
                  <span
                    className="view-model"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenViewer(file._id);
                    }}
                  >
                    <img src={vector_black} alt="View model" />
                  </span>
                </Model>
                <ModelName>{file.fileName}</ModelName>
                {activeFileId === file._id && (
                  <CustomizeBox>
                    {customize.slice(2, 5).map((item, idx) => (
                      <img key={idx} src={item.icon} alt={item.name} />
                    ))}
                  </CustomizeBox>
                )}
              </span>
            ))}
          </UploadedFile>
        </Files>

        <Customize>
          <div className="customize-container">
            {customize.map((item) => (
              <Accordion
               setUpdateHeight={setUpdateHeight}
               setUpdateWidth={setUpdateWidth}
               setUpdateLength={setUpdateLength}
                selectedId={activeFileId as string | null}
                key={item.id}
                icon={item.icon}
                id={item.id}
                title={item.name}
              />
            ))}
          </div>
          <div className="weight-section">
            {weight !== null && weight > 0 && (
              <>
                <p>Current Weight & Volume:</p>
                <p>{`${weight}gm`}</p>
              </>
            )}
          </div>
          <Button
            className="apply-button"
            disabled={isApplyButtonDisabled}
            onClick={handleApplySelection}
          >
            Apply Selection
          </Button>
        </Customize>
      </Filescomponent>
    </Wrapper>
  );
};

export default CustomizeTab;
