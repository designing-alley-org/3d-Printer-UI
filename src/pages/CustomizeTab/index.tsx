/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import {
  Customize,
  Files,
  UploadedFile,
  Model,
  ModelName,
  CustomizeBox,
} from './styles';
import { STLViewerModal } from '../../components/Model';
import { AccordionMemo } from './Accordion';

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

import {
  addAllFiles,
  setActiveFile,
} from '../../store/customizeFilesDetails/reducer';
import { getPrintersByTechnologyAndMaterial } from '../../store/actions/getPrintersByTechnologyAndMaterial';
import { FileDataDB, UpdateFileData } from '../../types/uploadFiles';
import StepLayout from '../../components/Layout/StepLayout';
import CustomButton from '../../stories/button/CustomButton';
import { formatText } from '../../utils/function';
import {
  getAllFilesByOrderId,
  getFileWeight,
  scaleFile,
  stlFileDownloadAndParse,
  updateFile,
} from '../../services/filesService';
import {
  getCMT_DataService,
  updateTotalWeightService,
} from '../../services/order';
import { RootState } from '../../store/types';

const CustomizeTab: React.FC = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const [printerData, setPrinterData] = useState([]);
  const [printerMessage, setPrinterMessage] = useState('');
  const [allFilesCustomized, setAllFilesCustomized] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFileForViewer, setSelectedFileForViewer] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const colors = useSelector((state: RootState) => state.specification.colors);
  const [colorHexcode, setColorHexcode] = useState<string>('');
  const navigate = useNavigate();
  const theme = useTheme();

  // Stl File
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [stlGeometry, setStlGeometry] = useState<THREE.BufferGeometry | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const downloadAndParseSTL = useCallback(async(url: string) => {
    await stlFileDownloadAndParse({
      url,
      setIsDownloading,
      setDownloadProgress,
      setError,
      setStlGeometry,
    });
  }, []);

  const {
    updateFiles: fileDetails,
    activeFileId,
    files: orderFiles,
  } = useSelector((state: any) => state.fileDetails);

  // Set default active file to index 0 if not set
  useEffect(() => {
    if (fileDetails && fileDetails.length > 0 && !activeFileId) {
      dispatch(setActiveFile(fileDetails[0]._id));
    }
  }, [fileDetails, activeFileId, dispatch]);

  // Extract the active file from the files
  const activeFile = useMemo(() => {
    if (!fileDetails) return null;
    return (
      fileDetails.find((file: FileDataDB) => file._id === activeFileId) || null
    );
  }, [fileDetails, activeFileId]);

  //

  useEffect(() => {
    if (!selectedFileUrl) return;
    downloadAndParseSTL(selectedFileUrl);
  }, [selectedFileUrl]);

  // Check if all files have been customized
  useEffect(() => {
    const allFilesCustom = fileDetails.every((file: any) => file?.weight.value);
    setAllFilesCustomized(allFilesCustom);
  }, [fileDetails]);

  // For Contain old dimensions of the active file
  const activeFileIndexDimensions = useMemo(() => {
    if (!orderFiles || !activeFileId) return null;
    const activeFileObj = orderFiles.find(
      (file: FileDataDB) => file._id === activeFileId
    );

    return activeFileObj
      ? { unit: activeFileObj.unit || '', dimensions: activeFileObj.dimensions }
      : null;
  }, [activeFileId, orderFiles]);

  const { materialId, technologyId, dimensions, unit, printerId, colorId } =
    activeFile || {};

  // Set color hex code when active file or colors change
  useEffect(() => {
    if (activeFile && colors.length > 0) {
      const selectedColor = colors.find(
        (color: any) => color._id === activeFile.colorId
      );
      setColorHexcode(selectedColor ? selectedColor.hexCode : '#ffffff');
    }
  }, [activeFile, colors]);

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
        dispatch(addAllFiles(response as FileDataDB[]));
      } catch (error) {
        console.error('Error fetching order files:', error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchOrderFiles();
  }, [orderId, dispatch]);

  // Get specifications
  const fetchSpec = useCallback(async () => {
    await getCMT_DataService(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchSpec();
  }, [fetchSpec]);

  // Check if all required fields are filled for the active file
  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    const { colorId, materialId, technologyId, printerId, infill } = activeFile;
    if (colorId && materialId && technologyId && printerId && infill)
      return false;
    return true;
  }, [activeFile]);

  // For Viewer
  const handleSetActiveFile = useCallback((fileId: string) => {
    dispatch(setActiveFile(fileId));
    const fileUrl = fileDetails.find((file: FileDataDB) => file._id === fileId)
      ?.fileUrl;
    if (fileUrl) {
      setSelectedFileUrl(fileUrl);
    }
  }, []);

  // Handle opening STL viewer modal
  const handleOpenSTLViewer = useCallback(
    (fileUrl: string, fileName: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setSelectedFileForViewer({ url: fileUrl, name: fileName });
      setModalOpen(true);
    },
    []
  );

  // Handle closing STL viewer modal
  const handleCloseSTLViewer = useCallback(() => {
    setModalOpen(false);
    setSelectedFileForViewer(null);
  }, []);

  // Clear printer data when selectedId changes
  useEffect(() => {
    if (activeFileId) {
      setPrinterData([]);
    }
  }, [activeFileId]);

  const fetchPrinterData = useCallback(async () => {
    if (materialId && technologyId && colorId) {
      await getPrintersByTechnologyAndMaterial({
        materialId,
        technologyId,
        colorId,
        setPrinterData,
        setPrinterMessage,
      });
    }
  }, [materialId, technologyId, colorId]);

  useEffect(() => {
    fetchPrinterData();
  }, [fetchPrinterData]);

  const handleApplySelection = async () => {
    try {
      setIsLoading(true);
      // Check if scaling is required
      if (
        activeFileIndexDimensions?.dimensions?.width !== dimensions?.width ||
        activeFileIndexDimensions?.dimensions?.height !== dimensions?.height ||
        activeFileIndexDimensions?.dimensions?.length !== dimensions?.length ||
        activeFileIndexDimensions?.unit !== unit
      ) {
        await scaleFile(activeFileId as string, {
          new_length: dimensions?.length,
          new_width: dimensions?.width,
          new_height: dimensions?.height,
          unit: unit,
        });
      }

      await updateFile(
        activeFileId as string,
        {
          colorId: activeFile?.colorId,
          materialId,
          technologyId,
          printerId,
          infill: activeFile?.infill,
        } as UpdateFileData
      );

      await getFileWeight(activeFileId as string, dispatch);
    } catch (error) {
      console.error('Error applying selection:', error);
    } finally {
      setIsLoading(false);
    }
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
      isDisabled={!allFilesCustomized}
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
            {/* <span className="count">{files.length}</span> */}
          </span>
          <div className="file-list">
            <UploadedFile>
              {fileDetails.map((file: any) => (
                <span
                  key={file._id}
                  className="upload-file"
                  onClick={() => handleSetActiveFile(file._id)}
                  style={{
                    background:
                      activeFileId === file._id ? '#FFFFFF' : 'transparent',
                    border:
                      activeFileId === file._id
                        ? '1px solid #1E6FFF'
                        : '1px solid #FFFFFF',
                  }}
                >
                  <Model>
                    <Box
                      sx={{
                        ':hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                        cursor: 'pointer',
                      }}
                      onClick={(e) =>
                        handleOpenSTLViewer(file.fileUrl, file.fileName, e)
                      }
                    >
                      <img
                        src={file.thumbnailUrl}
                        alt={file.fileName}
                        style={{
                          height: '15rem',
                          objectFit: 'contain',
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>
                  </Model>
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
          {isDownloading ? (
            <Box>
              <Box
                component="img"
                src="AnimationLoading.gif"
                alt="example"
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Box>
          ) : (
            <>
              <div className="customize-container">
                {activeFileId === null ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="text.secondary">
                      Please select a file to customize
                    </Typography>
                  </Box>
                ) : null}
                {activeFileId && activeFile && (
                  <AccordionMemo
                    key={activeFileId}
                    printerData={printerData}
                    fileData={activeFile}
                    oldDimensions={activeFileIndexDimensions}
                    printerMessage={printerMessage}
                  />
                )}
              </div>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <CustomButton
                  children="Apply Selection"
                  disabled={isApplyButtonDisabled || isLoading}
                  onClick={handleApplySelection}
                  loading={isLoading}
                  variant="outlined"
                />
              </Box>
            </>
          )}
        </Customize>
      </Box>

      {/* STL Viewer Modal */}
      {selectedFileForViewer && (
        <STLViewerModal
          open={modalOpen}
          stlGeometry={stlGeometry}
          downloadProgress={downloadProgress}
          isDownloading={isDownloading}
          error={error}
          color={colorHexcode || '#ffffff'}
          onClose={handleCloseSTLViewer}
          fileUrl={selectedFileForViewer.url}
          fileName={selectedFileForViewer.name}
        />
      )}
    </StepLayout>
  );
};

export default CustomizeTab;
