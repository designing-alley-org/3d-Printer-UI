import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { nanoid } from 'nanoid';

import StepLayout from '../../components/Layout/StepLayout';
import * as styles from './styles';
import { uploadDimBtnData } from '../../constants';
import { FileData, ModelDimensions } from '../../types/uploadFiles';
import { stlParser, STLUtils, STLParser } from '../../utils/stlUtils';
import { uploadFilesService } from '../../services/order';
import UploadInput from './UploadInput';
import AnimatedUploadIcon from '../../components/AnimatedUploadIcon';
import CustomButton from '../../stories/button/CustomButton';
import STlFileList from './STlFileList';
import { deleteFile, getAllFilesByOrderId, updateFilesQuantity } from '../../services/filesService';
import toast from 'react-hot-toast';

const INITIAL_DIMENSIONS: ModelDimensions = { height: 0, width: 0, length: 0 };

const UploadStl = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
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
        const response = await getAllFilesByOrderId(orderId);
        setFiles(response || []);
      } catch (error) {
        console.error('Error fetching order files:', error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchOrderFiles();
  }, [orderId]);

  // Utility functions
  const validateAndShowError = (file: File): boolean => {
    const validation = STLUtils.validateSTLFile(file);
    if (!validation.isValid) {
      alert(`Invalid file: ${validation.error}`);
      return false;
    }
    return true;
  };



  const createFileData = (file: File): FileData => ({
    _id: `${file.name}_${nanoid(10)}`,
    fileName: file.name,
    dimensions: { ...INITIAL_DIMENSIONS },
    fileUrl: URL.createObjectURL(file),
    file,
    quantity: 1,
    unit: selectedUnit.toLowerCase(),
    uploadProgress: 0,
    isUploading: false,
    isUploaded: false,
  });

  const updateFileStatus = useCallback((fileId: string, updates: Partial<FileData>) => {
    setFiles(prev => prev.map(f => 
      f._id === fileId ? { ...f, ...updates } : f
    ));
  }, []);

  
  // Extract STL dimensions and convert to ModelDimensions interface
  const extractSTLDimensions = async (file: File): Promise<ModelDimensions> => {
    try {
      const stlInfo = await stlParser.parseSTL(file);
      return {
        length: stlInfo.dimensions.length,
        width: stlInfo.dimensions.width,
        height: stlInfo.dimensions.height
      };
    } catch (error) {
      console.error('Error extracting STL dimensions:', error);
      return { ...INITIAL_DIMENSIONS };
    }
  };

  // Process single file with immediate upload
  const processSingleFile = async (file: File) => {
    if (!validateAndShowError(file)) return;

    const baseFileData = createFileData(file);
    setFiles(prev => [...prev, baseFileData]);

    try {
      const dimensions = await extractSTLDimensions(file);
      updateFileStatus(baseFileData._id, { dimensions });
      await uploadFileSequentially({ ...baseFileData, dimensions });
    } catch (error) {
      console.error('Error processing file:', error);
      updateFileStatus(baseFileData._id, { isUploading: false });
    }
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;

    const validFiles = Array.from(fileList).filter(validateAndShowError);
    if (!validFiles.length) return;

    setIsProcessingFiles(true);

    for (const file of validFiles) {
      await processSingleFile(file);
    }

    setIsProcessingFiles(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [selectedUnit]);

  const handleUnitClick = useCallback((unit: string) => {
    setSelectedUnit(unit);
    setFiles(prev => prev.map(file => ({ ...file, unit: unit.toLowerCase() })));
  }, []);

  const handleRemoveFile = useCallback(async (fileId: string) => {
    try {
      
      await deleteFile(fileId,orderId);

      setFiles(prev => {
        const fileToRemove = prev.find(file => file._id === fileId);
        if (fileToRemove?.fileUrl) {
          URL.revokeObjectURL(fileToRemove.fileUrl);
        }
        return prev.filter(file => file._id !== fileId);
      });

      toast.success('File removed successfully');
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }, [orderId]);

  const handleUpdateQuantity = useCallback((fileId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateFileStatus(fileId, { quantity: newQuantity });
  }, [updateFileStatus]);


  /// Convert dimensions to the specified unit
  const convertDimensions = useCallback((dimensions: ModelDimensions, unit: string): ModelDimensions => {
    // Use the STLParser's built-in conversion method
    const stlDimensions = { ...dimensions, unit: 'mm' as const };
    const targetUnit = unit === 'IN' ? 'inches' as const : 'mm' as const;
    const converted = STLParser.convertDimensions(stlDimensions, targetUnit);
    
    return {
      height: converted.height,
      width: converted.width,
      length: converted.length,
    };
  }, []);

  /// Upload a single file sequentially
  const uploadFileSequentially = async (fileData: FileData) => {
    if (!fileData.file) {
      console.error('Missing file for upload');
      return null;
    }

    try {
      updateFileStatus(fileData._id, { isUploading: true, uploadProgress: 0 });

      // Generate thumbnail using utility
      const stlInfo = await stlParser.parseSTL(fileData.file);
      const thumbnailDataUrl = await stlParser.generateThumbnail(stlInfo.geometry, {
        size: 400,
        color: '#ff6b35',
        backgroundColor: 'transparent'
      });

      const thumbnailFile = STLUtils.dataUrlToFile(
        thumbnailDataUrl,
        `${fileData.fileName}_thumbnail.png`
      );

      const response = await uploadFilesService(
        orderId as string,
        fileData.file,
        thumbnailFile,
        fileData.dimensions,
        fileData.quantity,
        (progress: number) => updateFileStatus(fileData._id, { uploadProgress: progress }),
        fileData.unit,
        setFiles,
        fileData._id,
      );

      updateFileStatus(fileData._id, {
        isUploading: false,
        isUploaded: true,
        uploadProgress: 100,
        file: undefined,
        fileUrl: response?.data?.fileUrl || fileData.fileUrl,
        thumbnailUrl: response?.data?.imageUrl || thumbnailDataUrl,
      });

      if (fileData.fileUrl) {
        URL.revokeObjectURL(fileData.fileUrl);
      }

      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      updateFileStatus(fileData._id, { isUploading: false, uploadProgress: 0 });
      throw error;
    }
  };

  const handleSave = async () => {
    if (!orderId) return;
    setIsSaving(true);

    try {

      if (files.length > 0) {
        // Prepare files for upload quantity
        const filesToUpload = files.filter(f => f.quantity > 1).map(f => ({ id: f._id, quantity: f.quantity }));

        if (filesToUpload.length > 0) await updateFilesQuantity(filesToUpload, orderId);

        navigate(`/get-quotes/${orderId}/customize`);
      } else if (files.length === 0) {
        console.warn('No files to upload');
      } else {
        console.warn('Some files are still uploading or failed');
      }
    } catch (error) {
      console.error('Error during save process:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Render functions
  const renderUnitButtons = () => (
    <Box display='flex' alignItems='center' gap={1}>
      <Typography>Unit of Measurement</Typography>
      {uploadDimBtnData.map((item) => (
        <CustomButton
          key={item.id}
          onClick={() => handleUnitClick(item.name)}
          variant={selectedUnit === item.name ? 'contained' : 'outlined'}
          children={item.name}
          sx={{ padding: 0, borderRadius: '4px' }}
          data-testid={`unit-button-${item.name}`}
        />
      ))}
    </Box>
  );

  const renderFileUpload = () => (
    <Card
      onClick={() => fileInputRef.current?.click()}
      sx={{
        width: isMobile ? '100%' : '268px',
        height: isMobile ? '150px' : '235px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'primary.main',
          transition: 'background-color 0.6s',
          '& *': { color: 'white', stroke: 'white' },
        },
      }}
    >
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".stl"
          multiple
          onChange={handleFileUpload}
          style={styles.hiddenInput as React.CSSProperties}
        />
        <AnimatedUploadIcon />
        <Typography variant="body1" fontWeight={600}>
          Upload Another File
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Supports STL files up to 100 MB.
        </Typography>
      </CardContent>
    </Card>
  );

  const renderFileCards = () => 
    files.map((file) => (
      <STlFileList
        file={file}
        key={file._id}
        onRemove={handleRemoveFile}
        onUpdateQuantity={handleUpdateQuantity}
        selectedUnit={selectedUnit}
        convertDimensions={convertDimensions}
      />
    ));

  const isLoading = isSaving || isProcessingFiles || files?.some(f => f.isUploading);
  const isDisabled = files.length === 0 || files.some(f => f.isUploading);

  return (
    <StepLayout
      stepNumber={1}
      stepText="Upload STL Files"
      stepDescription="Upload your 3D model file ( STL or OBJ format )"
      onClick={handleSave}
      isButtonsHide={files.length === 0}
      orderId={orderId}
      isLoading={isLoading}
      isPageLoading={isPageLoading}
      isDisabled={isDisabled}
    >
      {files.length === 0 ? (
        <UploadInput onFileChange={processSingleFile} />
      ) : (
        <>
          <Box sx={styles.unitContainer}>
            {renderUnitButtons()}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {renderFileCards()}
            {renderFileUpload()}
          </Box>
        </>
      )}
    </StepLayout>
  );
};

export default UploadStl;