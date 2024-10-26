// UploadStlTab.tsx
import React, { useState, useCallback, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadStlCardFile from './UploadStlCardFile';
import * as styles from './styles';
import uploadIcon from '../../../assets/icons/upload2.svg';
import { uploadDimBtnData } from '../../../constants';

interface FileData {
  id: string;
  name: string;
  size: string;
  progress: number;
  file: File;
  quantity: number;
}

const UploadStlCard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const [files, setFiles] = useState<FileData[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.type !== 'application/vnd.ms-pki.stl' && !file.name.toLowerCase().endsWith('.stl')) {
        alert('Please upload only STL files');
        return;
      }

      const fileId = `${file.name}_${Date.now()}`;
      const newFile: FileData = {
        id: fileId,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        progress: 73,
        file: file,
        quantity: 1,
      };
      
      setFiles(prevFiles => [...prevFiles, newFile]);
      setActiveFileId(fileId);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleUnitClick = useCallback((unit: string) => {
    setSelectedUnit(unit);
  }, []);

  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(null);
    }
  }, [activeFileId]);

  const handleUpdateQuantity = useCallback((fileId: string, newQuantity: number) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, quantity: newQuantity }
          : file
      )
    );
  }, []);

  return (
    <Box>
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
              src={uploadIcon}
              alt="Upload"
              style={styles.uploadIcon as React.CSSProperties}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".stl"
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
              files={files}
              activeFileId={activeFileId}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCard;