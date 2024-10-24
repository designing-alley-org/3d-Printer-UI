import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFile,
  // removeFile,
  setActiveFile,
} from '../../../store/stlFile/actions';
import UploadStlCardFile from './UploadStlCardFile';
import * as styles from './styles';
import uploadIcon from '../../../assets/icons/upload2.svg';
import { uploadDimBtnData } from '../../../constants';
import { RootState } from '../../../store/types';

const UploadStlCard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('MM');
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileState.files);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileId = `${file.name}_${Date.now()}`;
      dispatch(addFile(file, fileId));
      dispatch(setActiveFile(fileId)); // Set the newly added file as active
    }
  };
  const handleUnitClick = (unit: string) => {
    setSelectedUnit(unit);
  };

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
              type="file"
              accept=".stl"
              onChange={handleFileUpload}
              style={styles.hiddenInput as React.CSSProperties}
            />
          </Box>
          <Typography sx={styles.uploadText}>Upload STL Files</Typography>
        </Box>

        <Box sx={styles.fileCardContainer}>
          {files?.map((file) => (
            <UploadStlCardFile key={file.id} file={file} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadStlCard;
