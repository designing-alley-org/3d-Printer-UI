import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload } from 'lucide-react';

import UploadStlCardFile from './UploadStlCardFile';
import StepLayout from '../../components/Layout/StepLayout';
import MUIButton from '../../stories/MUIButton/Button';
import * as styles from './styles';
import { uploadDimBtnData } from '../../constants';
import { saveFile } from '../../utils/indexedDB';
import { deleteStlFileByFileId } from '../../store/actions/deleteStlFileByFileId';
import { getFilesByOrderIdForUploadstl } from '../../store/actions/getFilesByOrderId';
import { uploadFilesByOrderId } from '../../store/actions/uploadFilesByOrderId';
import { FileData, ModelDimensions } from '../../types/uploadFiles';



const INITIAL_DIMENSIONS: ModelDimensions = {
  height: 0,
  width: 0,
  length: 0,
};

const STL_FILE_TYPES = ['application/vnd.ms-pki.stl'];
const MM_TO_INCH_RATIO = 0.0393701;
const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const UploadStlCard = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const navigate = useNavigate();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orderId } = useParams();

  // Fetch files on component mount
  useEffect(() => {
    const fetchOrderFiles = async () => {
      if (!orderId) {
        setIsPageLoading(false);
        return;
      }
      try {
        setIsPageLoading(true);
        const response = await getFilesByOrderIdForUploadstl(orderId);
        setFiles(response || []);
      } catch (error) {
        console.error('Error fetching order files:', error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchOrderFiles();
  }, [orderId]);

  // Store fetched files in IndexedDB
  useEffect(() => {
    const storeFileInIndexedDB = async (file: FileData) => {
      if (!file.fileUrl || file.file) return;

      try {
        const response = await fetch(file.fileUrl);
        const blob = await response.blob();
        await saveFile(file.fileUrl, blob);
        console.log(`File ${file.fileName} saved to IndexedDB`);
      } catch (error) {
        console.error(`Error saving file ${file.fileName} to IndexedDB:`, error);
      }
    };

    const storeAllFiles = async () => {
      const backendFiles = files.filter(file => !file.file);
      await Promise.all(backendFiles.map(storeFileInIndexedDB));
    };

    if (files.some(file => !file.file)) {
      storeAllFiles();
    }
  }, [files]);

  const isValidStlFile = (file: File): boolean => {
    return STL_FILE_TYPES.includes(file.type) || 
           file.name.toLowerCase().endsWith('.stl');
  };

  const generateFileId = (fileName: string): string => {
    return `${fileName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const createFileData = (file: File): FileData => ({
    _id: generateFileId(file.name),
    fileName: file.name,
    dimensions: { ...INITIAL_DIMENSIONS },
    fileUrl: URL.createObjectURL(file),
    file,
    quantity: 1,
    unit: 'mm',
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;

    const validFiles = Array.from(fileList).filter(isValidStlFile);
    
    if (!validFiles.length) {
      alert('Please upload only STL files');
      return;
    }

    const newFilesData = validFiles.map(createFileData);
    
    setFiles(prevFiles => [...prevFiles, ...newFilesData]);
    setActiveFileId(newFilesData[0]._id);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleUnitClick = useCallback((unit: string) => {
    setSelectedUnit(unit);
    setFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, unit }))
    );
  }, []);

  const handleRemoveFile = useCallback(async (fileId: string) => {
    const isValidMongoId = MONGO_ID_REGEX.test(fileId);
    
    try {
      if (isValidMongoId) {
        await deleteStlFileByFileId(orderId as string, fileId);
      }

      setFiles(prevFiles => {
        const fileToRemove = prevFiles.find(file => file._id === fileId);
        if (fileToRemove?.fileUrl) {
          URL.revokeObjectURL(fileToRemove.fileUrl);
        }
        return prevFiles.filter(file => file._id !== fileId);
      });

      setActiveFileId(prevId => prevId === fileId ? null : prevId);
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }, [orderId]);

  const handleUpdateQuantity = useCallback((fileId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setFiles(prevFiles =>
      prevFiles.map(file =>
        file._id === fileId ? { ...file, quantity: newQuantity } : file
      )
    );
  }, []);

  const handleUpdateDimensions = useCallback((fileId: string, dimensions: ModelDimensions) => {
    setFiles(prevFiles =>
      prevFiles.map(file =>
        file._id === fileId ? { ...file, dimensions } : file
      )
    );
  }, []);

  const convertDimensions = useCallback((dimensions: ModelDimensions, unit: string): ModelDimensions => {
    if (unit !== 'IN') return dimensions;

    return {
      height: +(dimensions.height * MM_TO_INCH_RATIO).toFixed(2),
      width: +(dimensions.width * MM_TO_INCH_RATIO).toFixed(2),
      length: +(dimensions.length * MM_TO_INCH_RATIO).toFixed(2),
    };
  }, []);

  const handleSave = async () => {
    await uploadFilesByOrderId({
      orderId: orderId as string,
      files,
      setFiles,
      navigate, // This should be passed from props or context
      setIsSaving,
    });
    console.log('Files saved:', files);
  }

  const renderUnitButtons = () => (
    <Box sx={styles.unitSection}>
      <Typography sx={styles.unitText}>Unit of Measurement</Typography>
      {uploadDimBtnData.map(item => (
        <MUIButton
          key={item.id}
          onClick={() => handleUnitClick(item.name)}
          style={{
            ...styles.unitButton,
            ...(selectedUnit === item.name && styles.activeButton)
          }}
          size="small"
          label={item.name}
          data-testid={`unit-button-${item.name}`}
        />
      ))}
    </Box>
  );

  const renderFileCounter = () => (
    <Box sx={styles.fileCountSection}>
      <Typography sx={styles.fileText}>Files</Typography>
      <Box sx={styles.filesBox}>
        <Typography sx={styles.fileBoxText}>{files.length}</Typography>
      </Box>
    </Box>
  );

  const renderFileUpload = () => (
    <Box sx={styles.fileUploadContainer} data-testid="file-upload-container">
      <MUIButton
        btnVariant="icon-outline"
        onClick={() => fileInputRef.current?.click()}
        icon={<Upload color="#1E65F5" size={25} />}
        data-testid="upload-stl-button"
        style={styles.uploadIcon as React.CSSProperties}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl"
        multiple
        onChange={handleFileUpload}
        style={styles.hiddenInput as React.CSSProperties}
      />
      <Typography sx={styles.uploadText}>Upload Stl</Typography>
    </Box>
  );

  const renderFileCards = () => (
    <Box sx={styles.fileCardContainer}>
      {files.map(file => (
        <UploadStlCardFile
          key={file._id}
          file={file}
          onRemove={handleRemoveFile}
          onSetActiveFile={setActiveFileId}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateDimensions={handleUpdateDimensions}
          files={files}
          activeFileId={activeFileId}
          selectedUnit={selectedUnit}
          convertDimensions={convertDimensions}
        />
      ))}
    </Box>
  );

  return (
    <StepLayout
      stepNumber={1}
      stepText="Upload STL Files"
      stepDescription="Upload your 3D model file ( STL or OBJ format )"
      onClick={handleSave}
      orderId={orderId}
      isLoading={isSaving}
      isPageLoading={isPageLoading}
      isDisabled={files.length === 0}
    >
      <Box sx={styles.unitContainer}>
        {renderUnitButtons()}
        {renderFileCounter()}
      </Box>
      
      <Box>
        {renderFileUpload()}
        {renderFileCards()}
      </Box>
    </StepLayout>
  );
};

export default UploadStlCard;