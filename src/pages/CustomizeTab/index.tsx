/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
  Model,
  ModelName,
  CustomizeBox,
  LoadingWrapper,
} from './styles';
import { customize, vector_black } from '../../constants';
import { AccordionMemo } from './Accordion';
import materialIcon from '../../assets/icons/materialIcon.svg';
import colorIcon from '../../assets/icons/colorIcon.svg';
import printerIcon from '../../assets/icons/printerIcon.svg';
import infil from '../../assets/icons/infillIcon.svg';
import {
  FileDetail,
  setActiveFile,
} from '../../store/customizeFilesDetails/reducer';
import ViewerStlModel from '../UploadStlTab/ViewerStlModel';
import { saveFile } from '../../utils/indexedDB';
import ViewModelStl from '../../components/ViewStlFile';
import Loader from '../../components/Loader/Loader';
import { getFilesByOrderId } from '../../store/actions/getFilesByOrderId';
import { getWeightByFileId } from '../../store/actions/getWeightByFileId';
import { getSpecificationData } from '../../store/actions/getSpecificationData';
import { scaleTheFileByNewDimensions } from '../../store/actions/scaleTheFileByNewDimensions';
import { updateFileDataByFileId } from '../../store/actions/updateFileDataByFileId';
import { getPrintersByTechnologyAndMaterial } from '../../store/actions/getPrintersByTechnologyAndMaterial';
import ReloadButton from '../../components/Loader/ReloadButton';
// Define FileData type
interface FileData {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  infill: number;
  unit: string;
  dimensions: {
    height: number;
    length: number;
    width: number;
  };
}

const CustomizeTab: React.FC = () => {
  const [files, setFetchFiles] = useState<FileData[]>([]);
  const [isViewerOpen, setViewerOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [printerData, setPrinterData] = useState([]);
  const [printerMessage, setPrinterMessage] = useState('');


  const { updateFiles: fileDetails, activeFileId, files: orderFiles } = useSelector((state: any) => state.fileDetails);


  // Extract the active file from the files
  const activeFile = useMemo(() => {
    if (!fileDetails) return null;
    return fileDetails.find((file: FileDetail) => file._id === activeFileId) || null;
  }, [fileDetails, activeFileId]);




  // For Contain old dimensions of the active file
  const activeFileIndexDimensions = useMemo(() => {
    if (!orderFiles || !activeFileId) return null;
    const activeFileObj = orderFiles.find((file: FileDetail) => file._id === activeFileId);
    return activeFileObj ? { unit: activeFileObj.unit || '', dimensions: activeFileObj.dimensions } : null;
  }, [activeFileId, orderFiles]);


  const { color, material, technology, printer, infill, dimensions, unit } = activeFile || {};


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

  if (isPageLoading) {
    return (
      <LoadingWrapper>
        <Loader />
        <p>Loading details...</p>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      {/* <Heading>
        <h3>Customize your Files</h3>
        <h4>Edit your files as much as you want</h4>
      </Heading> */}

      <Filescomponent>
        <Files isLoading={isLoading}>
          <span className="header">
            <span className="file">Files</span>
            <span className="count">{files.length}</span>
          </span>
          <div className="file-list">
            <UploadedFile >
              {fileDetails.map((file: any) => (
                <span
                  key={file._id}
                  className="upload-file"
                  onClick={() => handleSetActiveFile(file._id)}
                  style={{
                    boxShadow:
                      activeFileId === file._id
                        ? '0px 0px 4.8px 0px #66A3FF'
                        : 'none',
                    border:
                      activeFileId === file._id ? '1px solid #66A3FF' : 'none',
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
                  <ModelName>
                    {file?.fileName.split('_')[1] || file?.fileName.split('/').pop()}
                  </ModelName>
                  <CustomizeBox>
                    {[
                      { icon: materialIcon, key: 'material' },
                      { icon: colorIcon, key: 'color' },
                      { icon: printerIcon, key: 'printer' },
                      { icon: infil, key: 'infill', additionalStyle: { width: '1rem' } },
                    ].map(({ icon, key, additionalStyle }) => (
                      <img
                        src={icon}
                        alt={key}
                        style={{
                          filter:
                            fileDetails.some((f: any) => f._id === file._id && f[key])
                              ? 'sepia(100%) saturate(370%) hue-rotate(181deg) brightness(114%) contrast(200%)'
                              : 'none',
                          ...additionalStyle,
                        }}
                        key={key}
                      />
                    ))}
                  </CustomizeBox>
                </span>
              ))}
            </UploadedFile>
          </div>
        </Files>
        <Customize>
          <div className="customize-container">
            {
              activeFileId === null ?
                <div className='no-file'>
                  <h3 className='no-file-title'>Please select a file to customize</h3>
                </div> : null
            }
            {activeFileId && customize.map((item) => (
              <AccordionMemo
                key={item.id}
                icon={item.icon}
                id={item.id}
                title={item.name}
                printerData={printerData}
                printerMessage={printerMessage}
                fileData={activeFile}
                oldDimensions={activeFileIndexDimensions}

              />
            ))}
          </div>
          <div className="weight-section">
            {dimensions?.weight !== null && dimensions?.weight > 0 && (
              <>
                <p>Current Weight:</p>
                <p>{`${dimensions?.weight.toFixed(2)}gm`}</p>
              </>
            )}
          </div>
          <Button
            className="apply-button"
            disabled={isApplyButtonDisabled || isLoading}
            onClick={handleApplySelection}
            style={{
              background:
                isApplyButtonDisabled || isLoading ? '#D8D8D8' : undefined,
            }}
          >
            Apply Selection
            {isLoading && <Loader />}
          </Button>
         {!isApplyButtonDisabled && <Box 
           >
          <ReloadButton/>
          </Box>}
        </Customize>
      </Filescomponent>
      <ViewerStlModel
        fileUrl={activeFile?.fileUrl}
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        activeFileId={activeFileId}
        files={files as any}
        onSetActiveFile={handleSetActiveFile}
        color={activeFile?.color}
      />
    </Wrapper>
  );
};

export default CustomizeTab;
