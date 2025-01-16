/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
  Model,
  ModelName,
  CustomizeBox,
  Heading,
  LoadingWrapper,
} from './styles';
import { customize, vector_black } from '../../constants';
import Accordion from './Accordion';
import materialIcon from '../../assets/icons/materialIcon.svg';
import colorIcon from '../../assets/icons/colorIcon.svg';
import printerIcon from '../../assets/icons/printerIcon.svg';
import {
  updateUnit,
  updateInfill,
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
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [updateWidth, setUpdateWidth] = useState<number>(0);
  const [updateHeight, setUpdateHeight] = useState<number>(0);
  const [updateLength, setUpdateLength] = useState<number>(0);
  const [selectedMate, setSelectedMate] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const [selectUnit, setSelectUnit] = useState<string>('');
  const [actualUnit, setActualUnit] = useState<string>('');
  const [selectInfill, setSelectInfill] = useState<number>(0);
  const [isViewerOpen, setViewerOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const fileDetails = useSelector((state: any) => state.fileDetails.files);
  const activeFile = useMemo(() => {
    return fileDetails.find((file: any) => file._id === activeFileId) || null;
  }, [fileDetails, activeFileId]);

  

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

  // select actual unit from the file
  useEffect(() => {
    if (activeFileId && activeFile) {
      const orginalUnit = files.find(
        (file: any) => file._id === activeFileId
      )?.unit;
      setActualUnit(orginalUnit || '');
    }
  }, [activeFileId]);

  useEffect(() => {
    if (activeFile) {
      dispatch(updateUnit({ id: activeFileId, unit: selectUnit }));
    }
  }, [selectUnit]);

  // send infill corresponding to selectedId to store
  useEffect(() => {
    if (selectInfill && activeFileId) {
      dispatch(updateInfill({ id: activeFileId, infill: selectInfill }));
    }
  }, [selectInfill]);

  useEffect(() => {
    setWeight(null);
  }, [activeFileId]);

  // Store files in IndexedDB
  useEffect(() => {
    const storeFileInIndexedDB = async (file: FileData) => {
      try {
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

  const selectedMat = useSelector(
    (state: any) =>
      state.fileDetails.files.find(
        (file: FileData) => file._id === activeFileId
      )?.material
  );
  const selectedMatMass = useSelector(
    (state: any) => state.specification.material_with_mass
  );
  const materialMass = selectedMatMass?.find(
    (mat: any) => mat.material_name === selectedMat
  )?.material_mass;

  // Check if all required fields are filled for the active file
  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    const { color, material, technology, printer, infill } = activeFile;
    if (color && material && technology && printer && infill) return false;
    return true;
  }, [activeFile]);

  // For Viewer
  const handleSetActiveFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  const handleOpenViewer = useCallback(
    (fileId: string) => {
      setViewerOpen(true);
      handleSetActiveFile(fileId);
    },
    [handleSetActiveFile]
  );

  const handleViewerClose = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const getFileColor = useCallback(
    (file: FileData) => {
      return activeFileId === file._id ? selectedColor : '';
    },
    [activeFileId, selectedColor]
  );
  const handleApplySelection = async () => {
    if (!activeFile) {
      console.warn('No active file selected.');
      return;
    }

    try {
      setIsLoading(true);

      // Check if scaling is required
      if (
        updateWidth !== activeFile?.width ||
        updateHeight !== activeFile?.height ||
        updateLength !== activeFile?.length
      ) {
        console.log('Scaling the file...',activeFileId);
        await scaleTheFileByNewDimensions({
          orderId: orderId as string,
          activeFileId: activeFileId as string,
          updateLength,
          updateWidth,
          updateHeight,
          selectUnit,
        });
      }

      // Get weight of the file

      await getWeightByFileId({
        orderId: orderId as string,
        setWeight,
        activeFileId,
        selectedMat,
        materialMass,
        dispatch,
      });

      // Update file data

      await updateFileDataByFileId({
        orderId: orderId as string,
        activeFile,
        activeFileId,
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
      <Heading>
        <h3>Customize your Files</h3>
        <h4>Edit your files as much as you want</h4>
      </Heading>

      <Filescomponent>
        <Files>
          <span className="header">
            <span className="file">Files</span>
            <span className="count">{files.length}</span>
          </span>
          <UploadedFile>
            {fileDetails.map((file : any ) => (
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
                      modelColor={file.color ? file.color : getFileColor(file)}
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
                <ModelName>{file.fileName}</ModelName>
                <CustomizeBox>
                  <img
                    src={materialIcon}
                    alt={'material'}
                    style={{
                      filter:
                        fileDetails.some(f => f._id === file._id && f.material)
                          ? 'sepia(100%) saturate(370%) hue-rotate(181deg) brightness(114%) contrast(200%)'
                          : 'none',
                    }}
                  />
                  <img
                    src={colorIcon}
                    alt={'color'}
                    style={{
                      filter:
                        fileDetails.some(f => f._id === file._id && f.color)
                          ? 'sepia(100%) saturate(370%) hue-rotate(181deg) brightness(114%) contrast(200%)'
                          : 'none',
                    }}
                  />
                  <img
                    src={printerIcon}
                    alt={'printer'}
                    style={{
                      filter:
                        fileDetails.some(f => f._id === file._id && f.printer)
                          ? 'sepia(100%) saturate(370%) hue-rotate(181deg) brightness(114%) contrast(200%)'
                          : 'none',
                    }}
                  />
                </CustomizeBox>
              </span>
            ))}
          </UploadedFile>
        </Files>
        <Customize>
          <div className="customize-container">
            {
              activeFileId===null ? 
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <h2>Please select a file to customize</h2>
              </div> : null 
            }
            {activeFileId && customize.map((item) => (
              <Accordion
                selectedMat={selectedMate}
                selectedColor={selectedColor}
                selectedPrinter={selectedPrinter}
                setSelectedMat={setSelectedMate}
                setSelectedColor={setSelectedColor}
                setSelectedPrinter={setSelectedPrinter}
                setUpdateHeight={setUpdateHeight}
                setUpdateWidth={setUpdateWidth}
                setUpdateLength={setUpdateLength}
                setSelectUnit={setSelectUnit}
                selectedInfill={selectInfill}
                setSelectInfill={setSelectInfill}
                actualUnit={actualUnit}
                selectedId={activeFileId as string | null}
                key={item.id}
                icon={item.icon}
                id={item.id}
                title={item.name}
              />
            ))}
          </div>
          <div className="weight-section">
            {weight !== null && weight > 0 && (
              <>
                <p>Current Weight:</p>
                <p>{`${weight.toFixed(2)}gm`}</p>
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
        </Customize>
      </Filescomponent>
      <ViewerStlModel
        fileUrl={activeFile?.fileUrl}
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        activeFileId={activeFileId}
        files={files as ViewerStlModelProps['files']}
        onSetActiveFile={handleSetActiveFile}
        color={selectedColor}
      />
    </Wrapper>
  );
};

export default CustomizeTab;
