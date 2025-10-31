import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { nanoid } from 'nanoid';

import StepLayout from '../../components/Layout/StepLayout';
import * as styles from './styles';
import { uploadDimBtnData } from '../../constants';
import { FileData, ModelDimensions } from '../../types/uploadFiles';
import { stlParser, STLUtils, STLParser } from '../../utils/stlUtils';
import { uploadFilesService } from '../../services/order';
import UploadInput from './UploadInput';
import CustomButton from '../../stories/button/CustomButton';
import STlFileList from './STlFileList';
import {
  deleteFile,
  getAllFilesByOrderId,
  updateFilesQuantity,
} from '../../services/filesService';
import toast from 'react-hot-toast';
import { Upload } from 'lucide-react';

const INITIAL_DIMENSIONS: ModelDimensions = { height_mm: 0, width_mm: 0, length_mm: 0 };

const UploadStl = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orderId, orderNumber } = useParams();

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
  });

  const updateFileStatus = useCallback(
    (fileId: string, updates: Partial<FileData>) => {
      setFiles((prev) =>
        prev.map((f) => (f._id === fileId ? { ...f, ...updates } : f))
      );
    },
    []
  );

  // Extract STL dimensions and convert to ModelDimensions interface
  const extractSTLDimensions = async (file: File): Promise<ModelDimensions> => {
    try {
      const stlInfo = await stlParser.parseSTL(file);
      return {
        length_mm: stlInfo.dimensions.length_mm?.toFixed(3) as unknown as number,
        width_mm: stlInfo.dimensions.width_mm?.toFixed(3) as unknown as number,
        height_mm: stlInfo.dimensions.height_mm?.toFixed(3) as unknown as number,
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
    setFiles((prev) => [...prev, baseFileData]);

    try {
      const dimensions = await extractSTLDimensions(file);
      updateFileStatus(baseFileData._id, { dimensions });
      await uploadFileSequentially({ ...baseFileData, dimensions });
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList?.length) return;

      const validFiles = Array.from(fileList).filter(validateAndShowError);
      if (!validFiles.length) return;

      // STEP 1: Add all files to UI immediately
      const initialFilesData = validFiles.map(createFileData);
      setFiles((prev) => [...prev, ...initialFilesData]);

      // STEP 2: Sequentially process and upload them
      for (const fileData of initialFilesData) {
        try {
          const dimensions = await extractSTLDimensions(fileData.file as File);
          updateFileStatus(fileData._id, { dimensions });

          await uploadFileSequentially({
            ...fileData,
            dimensions,
          });
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [selectedUnit]
  );

  const handleUnitClick = useCallback((unit: string) => {
    setSelectedUnit(unit);
    setFiles((prev) =>
      prev.map((file) => ({ ...file, unit: unit.toLowerCase() }))
    );
  }, []);

  const handleRemoveFile = useCallback(
    async (fileId: string) => {
      try {
        setIsDeleteLoading(true);
        await deleteFile(fileId, orderId);

        setFiles((prev) => {
          const fileToRemove = prev.find((file) => file._id === fileId);
          if (fileToRemove?.fileUrl) {
            URL.revokeObjectURL(fileToRemove.fileUrl);
          }
          return prev.filter((file) => file._id !== fileId);
        });

        toast.success('File removed successfully');
      } catch (error: any) {
        toast.error(error.response?.data?.message);
        console.error('Error removing file:', error);
      } finally {
        setIsDeleteLoading(false);
      }
    },
    [orderId]
  );

  const handleUpdateQuantity = useCallback(
    (fileId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      updateFileStatus(fileId, { quantity: newQuantity });
    },
    [updateFileStatus]
  );

  /// Convert dimensions to the specified unit
  const convertDimensions = useCallback(
    (dimensions: ModelDimensions, unit: string): ModelDimensions => {
      // Use the STLParser's built-in conversion method
      const stlDimensions = { ...dimensions, unit: 'mm' as const };
      const targetUnit = unit === 'IN' ? ('inches' as const) : ('mm' as const);
      const converted = STLParser.convertDimensions(stlDimensions, targetUnit);

      return {
        height_mm: converted.height_mm,
        width_mm: converted.width_mm,
        length_mm: converted.length_mm,
      };
    },
    []
  );

  /// Upload a single file sequentially
  const uploadFileSequentially = async (fileData: FileData) => {
    if (!fileData.file) {
      console.error('Missing file for upload');
      return null;
    }

    try {
      setIsProcessingFiles(true);
      updateFileStatus(fileData._id, { uploadProgress: 0 });

      // Generate thumbnail using utility
      const stlInfo = await stlParser.parseSTL(fileData.file);

      const thumbnailDataUrl = await stlParser.generateThumbnail(
        stlInfo.geometry,
        {
          size: 400,
          color: '#c0c0c0',
          backgroundColor: 'transparent',
        }
      );

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
        (progress: number) =>
          updateFileStatus(fileData._id, { uploadProgress: progress }),
        fileData.unit,
        setFiles,
        fileData._id
      );

      updateFileStatus(fileData._id, {
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
      updateFileStatus(fileData._id, { uploadProgress: 0 });
      throw error;
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleSave = async () => {
    if (!orderId) return;
    setIsSaving(true);

    try {
      if (files.length > 0) {
        // Prepare files for upload quantity
        const filesToUpload = files
          .filter((f) => f.quantity > 1)
          .map((f) => ({ id: f._id, quantity: f.quantity }));

        if (filesToUpload.length > 0) await updateFilesQuantity(filesToUpload);

        navigate(`/get-quotes/${orderId}/${orderNumber}/customize`);
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
    <Box display="flex" alignItems="center" gap={1}>
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

  const renderFileUpload = () =>
    isProcessingFiles ? null : (
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
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".stl"
            multiple
            onChange={handleFileUpload}
            style={styles.hiddenInput as React.CSSProperties}
          />
          <Upload strokeWidth={3} color="#c5c2c2ff" />
          <Typography variant="body1" fontWeight={600}>
            Upload Another File
          </Typography>
          <Typography variant="body2">
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
        isDeleteLoading={isDeleteLoading}
        onRemove={handleRemoveFile}
        onUpdateQuantity={handleUpdateQuantity}
        selectedUnit={selectedUnit}
        convertDimensions={convertDimensions}
        isProcessingFiles={isProcessingFiles}
      />
    ));

  const isLoading = isSaving;

  return (
    <StepLayout
      stepNumber={1}
      stepText="Upload STL Files"
      stepDescription="Upload your 3D model file ( STL or OBJ format )"
      onClick={handleSave}
      isButtonsHide={files.length === 0}
      orderNo={orderNumber}
      isLoading={isLoading}
      isPageLoading={isPageLoading}
      isDisabled={isProcessingFiles}
    >
      {files.length === 0 ? (
        <UploadInput onFileChange={processSingleFile} />
      ) : (
        <Card
          sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <Box sx={styles.unitContainer}>{renderUnitButtons()}</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {renderFileCards()}
            {renderFileUpload()}
          </Box>
        </Card>
      )}
    </StepLayout>
  );
};

export default UploadStl;
