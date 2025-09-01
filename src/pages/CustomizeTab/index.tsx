/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import {
  Customize,
  Files,
  UploadedFile,
  Model,
  ModelName,
  CustomizeBox,
} from './styles';
import { vector_black } from '../../constants';
import { AccordionMemo } from './Accordion';

// Icon Custom Icon 
import {ColorIcon, InfillIcon, TechnologyIcon, MaterialIcon,PrinterIcon} from '../../../public/Icon/MUI_Coustom_icon/index'; 

import {
  FileDetail,
  setActiveFile,
} from '../../store/customizeFilesDetails/reducer';
import ViewerStlModel from '../UploadStlTab/ViewerStlModel';
import { saveFile } from '../../utils/indexedDB';
import ViewModelStl from '../../components/ViewStlFile';
import { getFilesByOrderId } from '../../store/actions/getFilesByOrderId';
import { getWeightByFileId } from '../../store/actions/getWeightByFileId';
import { getSpecificationData } from '../../store/actions/getSpecificationData';
import { scaleTheFileByNewDimensions } from '../../store/actions/scaleTheFileByNewDimensions';
import { updateFileDataByFileId } from '../../store/actions/updateFileDataByFileId';
import { getPrintersByTechnologyAndMaterial } from '../../store/actions/getPrintersByTechnologyAndMaterial';
import { RotateCcw } from 'lucide-react';
import { FileData } from '../../types/uploadFiles';
import StepLayout from '../../components/Layout/StepLayout';
import CustomButton from '../../stories/button/CustomButton';

const CustomizeTab: React.FC = () => {
  const [files, setFetchFiles] = useState<FileData[]>([]);
  const [isViewerOpen, setViewerOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [printerData, setPrinterData] = useState([]);
  const [printerMessage, setPrinterMessage] = useState('');
  const [allFilesCustomized, setAllFilesCustomized] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

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
      fileDetails.find((file: FileDetail) => file._id === activeFileId) || null
    );
  }, [fileDetails, activeFileId]);

  // Check if all files have been customized
  useEffect(() => {
    const allFilesCustom = fileDetails.every(
      (file: any) => file?.dimensions?.weight
    );
    setAllFilesCustomized(allFilesCustom);
  }, [fileDetails]);

  // For Contain old dimensions of the active file
  const activeFileIndexDimensions = useMemo(() => {
    if (!orderFiles || !activeFileId) return null;
    const activeFileObj = orderFiles.find(
      (file: FileDetail) => file._id === activeFileId
    );
    return activeFileObj
      ? { unit: activeFileObj.unit || '', dimensions: activeFileObj.dimensions }
      : null;
  }, [activeFileId, orderFiles]);

  const { color, material, technology, printer, infill, dimensions, unit } =
    activeFile || {};

  const materialCompatibility = useSelector(
    (state: any) => state.specification.material_with_mass
  );
  const materialMass = materialCompatibility?.find(
    (mat: any) => mat.material_name === material
  )?.material_mass;

  // Fetch files from the server
  useEffect(() => {
    const fetchOrder = async () => {
      getFilesByOrderId({
        orderId: orderId as string,
        setFetchFiles,
        dispatch,
        setIsPageLoading,
      });
    };
    if (orderId) fetchOrder();
  }, [orderId, dispatch]);

  // Store files in IndexedDB
  useEffect(() => {
    const storeFileInIndexedDB = async (file: FileData) => {
      try {
        const response = await fetch(file.fileUrl);
        const blob = await response.blob();
        await saveFile(file.fileUrl, blob);
      } catch (error) {
        console.error(
          `Error saving file ${file.fileName} to IndexedDB:`,
          error
        );
      }
    };

    const storeAllFiles = async () => {
      await Promise.all(
        files.map((file) => (file.fileUrl ? storeFileInIndexedDB(file) : null))
      );
      setIsPageLoading(false);
    };

    if (files.length > 0) {
      storeAllFiles();
    }
  }, [files]);

  // Get specifications
  const fetchSpec = useCallback(async () => {
    getSpecificationData({ dispatch });
  }, [dispatch]);

  useEffect(() => {
    fetchSpec();
  }, [fetchSpec]);

  // Check if all required fields are filled for the active file
  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    const { color, material, technology, printer, infill } = activeFile;
    if (color && material && technology && printer && infill) return false;
    return true;
  }, [activeFile]);

  // For Viewer
  const handleSetActiveFile = useCallback((fileId: string) => {
    dispatch(setActiveFile(fileId));
  }, []);

  const handleOpenViewer = useCallback(
    (fileId: string) => {
      setViewerOpen(true);
    },
    [handleSetActiveFile]
  );

  const handleViewerClose = useCallback(() => {
    setViewerOpen(false);
  }, []);

  // Clear printer data when selectedId changes
  useEffect(() => {
    if (activeFileId) {
      setPrinterData([]);
    }
  }, [activeFileId]);

  const fetchPrinterData = useCallback(async () => {
    if (material && technology) {
      await getPrintersByTechnologyAndMaterial({
        material,
        technology,
        setPrinterData,
        setPrinterMessage,
      });
    }
  }, [material, technology]);

  useEffect(() => {
    fetchPrinterData();
  }, [fetchPrinterData]);

  const handleApplySelection = async () => {
    if (!activeFile) {
      console.warn('No active file selected.');
      return;
    }

    try {
      setIsLoading(true);

      // Check if scaling is required
      if (
        activeFileIndexDimensions?.dimensions?.width !== dimensions?.width ||
        activeFileIndexDimensions?.dimensions?.height !== dimensions?.height ||
        activeFileIndexDimensions?.dimensions?.length !== dimensions?.length ||
        activeFileIndexDimensions?.unit !== unit
      ) {
        await scaleTheFileByNewDimensions({
          orderId: orderId as string,
          activeFileId: activeFileId as string,
          updateLength: dimensions?.length,
          updateWidth: dimensions?.width,
          updateHeight: dimensions?.height,
          selectUnit: unit,
        });
      }

      // Get weight of the file
      await getWeightByFileId({
        orderId: orderId as string,
        activeFileId: activeFileId as string,
        selectedMat: material as string,
        materialMass: materialMass as number,
        dispatch,
      });

      //   // Update file data
      await updateFileDataByFileId({
        orderId: orderId as string,
        activeFile,
        activeFileId: activeFileId as string,
        dispatch,
      });
    } catch (error) {
      console.error('Error applying selection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StepLayout
      stepNumber={2}
      stepText="Customize"
      stepDescription="Customize your design files by selecting materials, colors, and printers."
      onClick={() => navigate(`/get-quotes/${orderId}/quote`)}
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/upload-stl`)}
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={!allFilesCustomized}
    >
      <Box
        display="flex"
        borderRadius={'24px'}
        boxShadow="2px 2px 4px 0px #0000003D"
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
                    <span className="model-preview">
                      <ViewModelStl
                        fileUrl={file.fileUrl}
                        modelColor={file.color}
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
                  <ModelName isActive={activeFileId === file._id}>
                    {file?.fileName.split('_')[1] ||
                      file?.fileName.split('/').pop()}
                  </ModelName>
                  <CustomizeBox>
                    {[
                      { key: 'technology', Icon: TechnologyIcon },
                      { key: 'material', Icon: MaterialIcon },
                      { key: 'color', Icon: ColorIcon },
                      { key: 'printer', Icon: PrinterIcon },
                      { key: 'infill', Icon: InfillIcon },
                    ].map(({ key, Icon }) => {
                      const isSelected = activeFileId === file._id;
                      const isFilled = !!file[key];
                      let iconColor = '#FFFFFF66'; // default: not selected, not filled, 40% opacity
                      if (isSelected && isFilled) iconColor = '#05123B';
                      else if (isSelected && !isFilled) iconColor = '#999999';
                      else if (!isSelected && isFilled) iconColor = '#FFFFFF';
                      else if (!isSelected && !isFilled) iconColor = '#FFFFFF66';
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
          <div className="customize-container">
            {activeFileId === null ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" color="text.secondary">
                  Please select a file to customize
                </Typography>
              </Box>
            ) : null}
            {activeFileId && activeFile && (
              <AccordionMemo
                key={activeFileId} // Fixed: Using activeFileId as key instead of undefined item.id
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
              variant="contained"
            />
            {!isApplyButtonDisabled && (
              <Box>
                <CustomButton
                  variant="outlined"
                  children={<RotateCcw size={isSmallScreen ? 16 : 20} />}
                  onClick={() => window.location.reload()}
                  disabled={isLoading}
                />
              </Box>
            )}
          </Box>
        </Customize>
      </Box>
      <ViewerStlModel
        fileUrl={activeFile?.fileUrl}
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        activeFileId={activeFileId}
        files={files as any}
        onSetActiveFile={handleSetActiveFile}
        color={activeFile?.color}
      />
    </StepLayout>
  );
};

export default CustomizeTab;
