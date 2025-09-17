/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import {
  Customize,
  Files,
  UploadedFile,
  ModelName,
  CustomizeBox,
} from './styles';
import { STLViewerModal } from '../../components/Model';
import { AccordionMemo } from './AccordionMemo';

// Three js
import * as THREE from 'three';

// Icon Custom Icon
import {
  ColorIcon,
  InfillIcon,
  TechnologyIcon,
  MaterialIcon,
  PrinterIcon,
} from '../../../public/Icon/MUI_Coustom_icon/index';

import { filterPrinterAction } from '../../store/actions/filterPrinterAction';
import { FileDataDB, UpdateFileData } from '../../types/uploadFiles';
import StepLayout from '../../components/Layout/StepLayout';
import CustomButton from '../../stories/button/CustomButton';
import { formatText } from '../../utils/function';
import {
  getAllFilesByOrderId,
  stlFileDownloadAndParse,
} from '../../services/filesService';
import {
  getCMT_DataService,
  updateTotalWeightService,
} from '../../services/order';
import { RootState } from '../../store/types';
import {
  setActiveFileId,
  setFiles,
  updateWeight,
} from '../../store/customizeFilesDetails/CustomizationSlice';
import { stlParser } from '../../utils/stlUtils';
import { updateFileInCustomization } from '../../store/actions/File';
import { IPrinter } from '../../types/printer';

const CustomizeTab: React.FC = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [printerData, setPrinterData] = useState<IPrinter[]>([]);
  const [printerMessage, setPrinterMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [stlGeometry, setStlGeometry] = useState<THREE.BufferGeometry | null>(
    null
  );

  // state
  const colors = useSelector((state: RootState) => state.specification.colors);
  const materials = useSelector(
    (state: RootState) => state.specification.materials
  );

  const { activeFileId, files } = useSelector(
    (state: RootState) => state.customization
  );
  const file = files.find((f: FileDataDB) => f._id === activeFileId);

  const navigate = useNavigate();
  const theme = useTheme();
  const { materialId, technologyId, printerId, colorId, infill, weight } =
    file || {};

  useEffect(() => {
    const fetchOrderFiles = async () => {
      if (!orderId) {
        setIsPageLoading(false);
        return;
      }
      try {
        setIsPageLoading(true);
        const response = await getAllFilesByOrderId(orderId);
        if (response.length === 0)
          navigate(`/get-quotes/${orderId}/upload-stl`);
        dispatch(setFiles(response as FileDataDB[]));
      } catch (error) {
        console.error('Error fetching order files:', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchOrderFiles();
  }, [orderId]);

  // Get specifications
  const fetchSpec = useCallback(async () => {
    await getCMT_DataService(dispatch);
  }, [dispatch]);

  // Clear printer data and reset STL state when activeFileId changes
  useEffect(() => {
    if (activeFileId) {
      setPrinterData([]);
      setPrinterMessage('');
      setError(null);
      setDownloadProgress(0);
      setIsDownloading(false);
    }
  }, [activeFileId]);

  // Extract the active file from the files
  const activeFile = useMemo(() => {
    if (!files) return null;
    return files.find((file: FileDataDB) => file._id === activeFileId) || null;
  }, [activeFileId, dispatch, isLoading]);

  // Calculate material density based on selected material
  const materialDensity = useMemo(() => {
    if (materialId && materials.length > 0) {
      const selectedMaterial = materials.find(
        (material: any) => material._id === materialId
      );
      return selectedMaterial ? selectedMaterial.density : null;
    }
    return null;
  }, [materialId, materials]);

  // Determine color hex code based on selected color
  const colorHexcode = useMemo(() => {
    if (colorId && colors.length > 0) {
      const selectedColor = colors.find((color: any) => color._id === colorId);
      return selectedColor ? selectedColor.hexCode : '#ffffff';
    }
    return '#ffffff';
  }, [colorId, colors]);

  const processGeometry = useCallback(async () => {
    if (
      stlGeometry &&
      materialDensity &&
      materialDensity > 0 &&
      infill &&
      infill > 0
    ) {
      try {
        const result = await stlParser.processSTLGeometry(
          materialDensity,
          stlGeometry,
          infill,
          1.5, // Assuming a default wall thickness of 1.5mm
          1.0 // Assuming no scaling
        );
        if (result) {
          // setCurrentWeight(result);
          dispatch(
            updateWeight({
              id: activeFileId as string,
              weight: result.massGrams,
            })
          );
        }
        return result;
      } catch (error) {
        console.error('Error processing STL geometry:', error);
      }
    }
  }, [stlGeometry, infill, materialDensity]);

  // Calculate weight when geometry or material density changes
  useEffect(() => {
    if (stlGeometry && materialDensity) {
      processGeometry();
    }
  }, [processGeometry]);

  const isAllCoustomized = useMemo(() => {
    if (files.length === 0) return false;
    return files.every((file: FileDataDB) => file.isCustomized);
  }, [files]);

  const [error, setError] = useState<string | null>(null);

  // Download and parse STL file with proper error handling
  const downloadAndParseSTL = useCallback(async (url: string) => {
    await stlFileDownloadAndParse({
      url,
      setIsDownloading,
      setDownloadProgress,
      setError,
      setStlGeometry,
    });
  }, []);

  // Download and parse STL when selectedFileUrl changes
  useEffect(() => {
    if (!activeFile) {
      setStlGeometry(null);
      setError(null);
      setDownloadProgress(0);
      return;
    }
    // Reset states before downloading new file
    setError(null);
    setDownloadProgress(0);
    setStlGeometry(null);

    downloadAndParseSTL(activeFile.fileUrl);
  }, [activeFile, downloadAndParseSTL]);

  useEffect(() => {
    fetchSpec();
  }, [fetchSpec]);

  // Check if all required fields are filled for the active file
  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    if (colorId && materialId && technologyId && printerId && infill)
      return false;
    return true;
  }, [file]);

  // Handle opening and closing STL viewer modal
  const handleOpenSTLViewer = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(true);
  }, []);

  const handleCloseSTLViewer = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Fetch printer data when materialId, technologyId, or colorId changess
  const IPrinterData = useCallback(async () => {
    if (materialId && technologyId && colorId) {
      await filterPrinterAction({
        materialId,
        technologyId,
        colorId,
        setPrinterData,
        setPrinterMessage,
      });
    }
  }, [materialId, technologyId, colorId]);

  useEffect(() => {
    IPrinterData();
  }, [IPrinterData]);

  // Cleanup effect to dispose of geometry when component unmounts
  useEffect(() => {
    return () => {
      if (stlGeometry) {
        stlGeometry.dispose();
      }
    };
  }, [stlGeometry]);

  const handleApplySelection = async () => {
    if (!activeFileId || !activeFile) return;
    const updateData: UpdateFileData = {
      colorId,
      materialId,
      technologyId,
      printerId,
      infill,
      weight,
    };
    await updateFileInCustomization(
      activeFileId,
      updateData,
      setIsLoading,
      stlGeometry,
      colorHexcode,
      activeFile,
      dispatch
    );
  };

  const handelNext = async () => {
    await updateTotalWeightService(orderId as string, navigate);
  };

  return (
    <StepLayout
      stepNumber={2}
      stepText="Customize"
      stepDescription="Customize your design files by selecting materials, colors, and printers."
      onClick={handelNext}
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/upload-stl`)}
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={isAllCoustomized ? false : true}
    >
      <Box
        display="flex"
        borderRadius={'24px'}
        boxShadow="2px 2px 4px 0px #2A3F7F29"
      >
        <Files isLoading={isLoading}>
          <span className="header">
            <Typography variant="h6" color="primary.contrastText">
              Files
            </Typography>
          </span>
          <div className="file-list">
            <UploadedFile>
              {files.map((file: any) => (
                <span
                  key={file._id}
                  className="upload-file"
                  onClick={() => dispatch(setActiveFileId(file._id))}
                  style={{
                    background:
                      activeFileId === file._id ? '#FFFFFF' : 'transparent',
                    border:
                      activeFileId === file._id
                        ? '1px solid #1E6FFF'
                        : '1px solid #FFFFFF',
                  }}
                >
                  <Box
                    sx={{
                      ':hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                      overflow: 'hidden',
                      margin: '7px 10px;',
                      cursor: 'pointer',
                      width: '5rem',
                      height: '5rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      borderRadius: '12px',
                      background: theme.palette.background.paper,
                      boxShadow:
                        activeFileId === file._id
                          ? '0px 4px 4px 0px #CDE1FF'
                          : 'none',
                    }}
                    onClick={(e) => {
                      dispatch(setActiveFileId(file._id));
                      handleOpenSTLViewer(e);
                    }}
                  >
                    <img
                      src={file.thumbnailUrl}
                      alt={file.fileName}
                      style={{
                        height: '5rem',
                        width: '6rem',
                        transform: 'scale(2.4)',
                      }}
                    />
                  </Box>
                  <ModelName
                    isActive={activeFileId === file._id}
                    textColor={theme.palette.primary.main}
                  >
                    {formatText(file?.fileName)}
                  </ModelName>
                  <CustomizeBox>
                    {[
                      { key: 'technologyId', Icon: TechnologyIcon },
                      { key: 'materialId', Icon: MaterialIcon },
                      { key: 'colorId', Icon: ColorIcon },
                      { key: 'printerId', Icon: PrinterIcon },
                      { key: 'infill', Icon: InfillIcon },
                    ].map(({ key, Icon }) => {
                      const isSelected = activeFileId === file._id;
                      const isFilled = !!file[key];
                      let iconColor = '#FFFFFF66'; // default: not selected, not filled, 40% opacity
                      if (isSelected && isFilled)
                        iconColor = theme.palette.primary.main;
                      else if (isSelected && !isFilled) iconColor = '#999999';
                      else if (!isSelected && isFilled) iconColor = '#FFFFFF';
                      else if (!isSelected && !isFilled)
                        iconColor = '#FFFFFF66';
                      return (
                        <React.Fragment key={key}>
                          <Icon style={{ color: iconColor, fontSize: 20 }} />
                          {key !== 'infill' && (
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                              sx={{
                                height: '17px',
                                mx: 0.5,
                                borderColor: isFilled ? 'primary.main' : 'none',
                                borderWidth: 1,
                              }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </CustomizeBox>
                </span>
              ))}
            </UploadedFile>
          </div>
        </Files>
        <Customize>
          {isDownloading || downloadProgress < 100 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="400px"
            >
              <Box
                component="img"
                src="/Icon/AnimationLoading.gif"
                alt="Loading STL file"
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
              <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                Loading STL File...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {downloadProgress}% Complete
              </Typography>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  Error: {error}
                </Typography>
              )}
            </Box>
          ) : activeFile && downloadProgress === 100 && !error ? (
            <>
              <div className="customize-container">
                <AccordionMemo
                  key={activeFileId}
                  file={file}
                  downloadProgress={downloadProgress}
                  printerData={printerData}
                  printerMessage={printerMessage}
                />
              </div>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <CustomButton
                  children="Save"
                  disabled={isApplyButtonDisabled || isLoading}
                  onClick={handleApplySelection}
                  loading={isLoading}
                  variant="outlined"
                />
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="400px"
            >
              <Typography variant="h6" color="text.secondary">
                {error ? 'Failed to load STL file' : 'No file selected'}
              </Typography>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </Customize>
      </Box>

      {/* STL Viewer Modal */}
      {activeFile && (
        <STLViewerModal
          open={modalOpen}
          stlGeometry={stlGeometry}
          downloadProgress={downloadProgress}
          isDownloading={isDownloading}
          error={error}
          color={colorHexcode || '#ffffff'}
          onClose={handleCloseSTLViewer}
          fileName={activeFile.fileName}
          dimensions={activeFile.dimensions}
        />
      )}
    </StepLayout>
  );
};

export default CustomizeTab;
