import React, { useState, useCallback, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadStlCardFile from './UploadStlCardFile';
import * as styles from './styles';
import { plus } from '../../../constants';
import { uploadDimBtnData } from '../../../constants';

interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

interface FileData {
  id: string;
  name: string;
  dimensions: ModelDimensions;
  file: File;
  quantity: number;
}

const UploadStlCard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [files, setFiles] = useState<FileData[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (fileList && fileList.length > 0) {
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
          id: `${file.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          dimensions: {
            height: 0,
            width: 0,
            length: 0,
          },
          file: file,
          quantity: 1,
        }));

        setFiles((prevFiles) => [...prevFiles, ...filesData]);
        setActiveFileId(filesData[0].id);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    []
  );

  const handleUnitClick = useCallback((unit: string) => {
    setSelectedUnit(unit);
  }, []);

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      if (activeFileId === fileId) {
        setActiveFileId(null);
      }
    },
    [activeFileId]
  );

  const handleUpdateQuantity = useCallback(
    (fileId: string, newQuantity: number) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, quantity: newQuantity } : file
        )
      );
    },
    []
  );

  const handleUpdateDimensions = useCallback(
    (fileId: string, dimensions: ModelDimensions) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, dimensions } : file
        )
      );
    },
    []
  );

  const convertDimensions = (dimensions: ModelDimensions, unit: string) => {
    const mmToInch = 0.0393701;
    if (unit === 'IN') {
      return {
        height: +(dimensions.height * mmToInch).toFixed(2),
        width: +(dimensions.width * mmToInch).toFixed(2),
        length: +(dimensions.length * mmToInch).toFixed(2),
      };
    }
    return dimensions;
  };

  return (
    <Box>
      <Typography sx={styles.mainHeader}> Upload Your Files</Typography>
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
              sx={{
                ...styles.unitButton,
                ...(selectedUnit === item.name && styles.activeButton),
              }}
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
              key={file.id}
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
      </Box>
    </Box>
  );
};

export default UploadStlCard;
