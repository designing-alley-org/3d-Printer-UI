import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import UploadStlCardFile from './UploadStlCardFile';
import * as styles from './styles';
import { plus } from '../../constants';
import { uploadDimBtnData } from '../../constants';
import { saveFile } from '../../utils/indexedDB';
import { useParams } from 'react-router-dom';
import { getFileByOrderIdUploadstlService } from '../../services/order';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  _id: string;
  fileName: string;
  dimensions: ModelDimensions;
  fileUrl: string;
  fileBlob?: Blob;
  file?: File;
  quantity: number;
  unit: string;
}

interface UploadStlTabProps {
  files: FileData[];
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
}

const UploadStlCard: React.FC<UploadStlTabProps> = ({ files, setFiles }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileUnit, setFileUnit] = useState<string>('');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orderId } = useParams();


  useEffect(() => {
    const fetchOrderFiles = async () => {
      try {
        setIsPageLoading(true); 
        const fetchedFiles = await getFileByOrderIdUploadstlService(orderId);
        if (fetchedFiles) {
          setFiles(fetchedFiles);
        }
      } catch (error) {
        console.error("Error in fetchOrderFiles:", error);
      } finally {
        setIsPageLoading(false); 
      }
    };
  
    fetchOrderFiles();
  }, [orderId, setFiles, setIsPageLoading]);

  // Handle file uploads
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) return;

      const newFiles = Array.from(fileList).filter(
        (file) =>
          file.type === 'application/vnd.ms-pki.stl' ||
          file.name.toLowerCase().endsWith('.stl')
      );
      if (newFiles.length === 0) {
        alert('Please upload only STL files');
        return;
      }

      const filesData: FileData[] = newFiles.map((file) => ({
        _id: `${file.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fileName: file.name,
        dimensions: {
          height: 0,
          width: 0,
          length: 0,
        },
        fileUrl: URL.createObjectURL(file),
        file,
        quantity: 1,
        unit: 'mm',
      }));

      setFiles((prevFiles) => [...prevFiles, ...filesData]);
      setActiveFileId(filesData[0]._id);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [files, selectedUnit]
  );

  // Handle unit changes
  const handleUnitClick = useCallback(
    (unit: string) => {
      setSelectedUnit(unit);
      setFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          unit,
        }))
      );
    },
    [setFiles]
  );

  // Handle file removal
  const handleRemoveFile = useCallback(
    (fileId: string) => {
      setFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((file) => file._id === fileId);
        if (fileToRemove?.fileUrl) {
          URL.revokeObjectURL(fileToRemove.fileUrl);
        }
        return prevFiles.filter((file) => file._id !== fileId);
      });

      setActiveFileId((prevActiveFileId) =>
        prevActiveFileId === fileId ? null : prevActiveFileId
      );
    },
    [setFiles]
  );

  // Handle quantity updates
  const handleUpdateQuantity = useCallback(
    (fileId: string, newQuantity: number) => {
      if (newQuantity < 1) return;

      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === fileId ? { ...file, quantity: newQuantity } : file
        )
      );
    },
    [setFiles]
  );

  // Handle dimension updates
  const handleUpdateDimensions = useCallback(
    (fileId: string, dimensions: ModelDimensions) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === fileId ? { ...file, dimensions } : file
        )
      );
    },
    [setFiles]
  );

  // Store files in IndexedDB for backend fetched files only
  useEffect(() => {
    const storeFileInIndexedDB = async (file: FileData) => {
      try {
        if (!file.fileUrl || file.file) return;
        const response = await fetch(file.fileUrl);
        const blob = await response.blob();
        await saveFile(file.fileUrl, blob);
        console.log(`File ${file.fileName} saved to IndexedDB`);
      } catch (error) {
        console.error(
          `Error saving file ${file.fileName} to IndexedDB:`,
          error
        );
      }
    };

    const storeAllFiles = async () => {
      const backendFiles = files.filter((file) => !file.file);
      await Promise.all(backendFiles.map(storeFileInIndexedDB));
    };

    if (files.some((file) => !file.file)) {
      storeAllFiles();
    }
  }, [files]);

  // Convert dimensions between units
  const convertDimensions = useCallback(
    (dimensions: ModelDimensions, unit: string): ModelDimensions => {
      const mmToInch = 0.0393701;
      if (unit === 'IN') {
        return {
          height: +(dimensions.height * mmToInch).toFixed(2),
          width: +(dimensions.width * mmToInch).toFixed(2),
          length: +(dimensions.length * mmToInch).toFixed(2),
        };
      }
      return dimensions;
    },
    []
  );

  if (isPageLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography sx={styles.mainHeader}>Upload Your Files</Typography>
      <Typography sx={styles.infoText}>
        Set the required quantities for each file and if their sizes appear too
        small, change the unit of measurement to inches. <br />
        Click on 3D Viewer for a 360° preview of your files.
      </Typography>
      <Box sx={styles.unitContainer}>
        <Box sx={styles.unitSection}>
          <Typography sx={styles.unitText}>Unit of Measurement</Typography>
          {uploadDimBtnData.map((item) => (
            <Button
              onClick={() => handleUnitClick(item.name)}
              key={item.id}
              sx={
                {
                  ...styles.unitButton,
                  ...(selectedUnit === item.name && styles.activeButton),
                } as SxProps<Theme>
              }
            >
              {item.name}
            </Button>
          ))}
        </Box>
        <Box sx={styles.fileCountSection}>
          <Typography sx={styles.fileText}>Files</Typography>
          <Box sx={styles.filesBox}>
            <Typography sx={styles.fileBoxText}>{files.length}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={styles.fileUploadContainer}>
          <Box sx={styles.uploadBox}>
            <img
              src={plus}
              alt="Upload"
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
          </Box>
          <Typography sx={styles.uploadText}>Upload STL Files</Typography>
        </Box>
        <Box sx={styles.fileCardContainer}>
          {files.map((file) => (
            <UploadStlCardFile
              key={file._id}
              file={file}
              onRemove={handleRemoveFile}
              onSetActiveFile={setActiveFileId}
              onUpdateQuantity={handleUpdateQuantity}
              onUpdateDimensions={handleUpdateDimensions}
              files={files}
              // setFileUnit={file.unit}
              activeFileId={activeFileId}
              selectedUnit={selectedUnit}
              convertDimensions={convertDimensions}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCard;
