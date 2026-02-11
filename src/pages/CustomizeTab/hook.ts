import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as THREE from 'three';
import { useMediaQuery, useTheme } from '@mui/material';

import {
  getAllFilesByOrderId,
  stlFileDownloadAndParse,
  updateFile,
} from '../../services/filesService';
import {
  getCMT_DataService,
  updateIncompleteOrdersService,
  updateTotalWeightService,
} from '../../services/order';
import { filterPrinterAction } from '../../store/actions/filterPrinterAction';

import { RootState } from '../../store/types';
import { FileDataDB, Pricing, UpdateFileData } from '../../types/uploadFiles';
import { IPrinter } from '../../types/printer';
import { createPrintEstimator } from '../../utils/PrintEstimator';
import {
  getSelectedMaterial,
  getSelectedTechnology,
  getSelectedPrinter,
  getSelectedColorHex,
} from './option';
import { deleteFromS3, getSignedUrl, uploadFromS3 } from '../../services/s3';
import { stlParser, STLUtils } from '../../utils/stlUtils';
import { returnS3Key } from '../../utils/function';
import toast from 'react-hot-toast';

export const useCustomizeTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { orderId, orderNumber } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Local State
  const [files, setFiles] = useState<FileDataDB[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
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
  const [error, setError] = useState<string | null>(null);

  // Redux State (Specification only)
  const {
    colors,
    pricing,
    materials,
    technologies: technologie,
  } = useSelector((state: RootState) => state.specification);

  // Derived State
  const activeFile = useMemo(() => {
    return files.find((f: FileDataDB) => f._id === activeFileId) || null;
  }, [files, activeFileId]);

  const {
    materialId,
    technologyId,
    printerId,
    colorId,
    infill,
    weight,
    costs,
    print_totalTime_s,
    scalingFactor,
  } = activeFile || {};

  const material = getSelectedMaterial(materials, materialId);
  const colorHexcode = getSelectedColorHex(colors, colorId);
  const technologies = getSelectedTechnology(technologie, technologyId);
  const printer = getSelectedPrinter(printerData, printerId);

  const isAllCoustomized = useMemo(() => {
    if (files.length === 0) return false;
    return files.every((file: FileDataDB) => file.isCustomized);
  }, [files]);

  const isApplyButtonDisabled = useMemo(() => {
    if (!activeFile) return true;
    if (technologies?.code === 'FDM' && infill) return false;
    if (colorId && materialId && technologyId && printerId) return false;
    return true;
  }, [
    activeFile,
    technologies,
    infill,
    colorId,
    materialId,
    technologyId,
    printerId,
  ]);

  // Helper to update a file in state
  const updateFileInState = useCallback(
    (id: string, updates: Partial<FileDataDB>) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === id ? { ...file, ...updates } : file
        )
      );
    },
    []
  );

  // Handlers for AccordionMemo
  const handleUpdateValueById = useCallback(
    (id: string, data: Partial<FileDataDB>) => {
      updateFileInState(id, data);
    },
    [updateFileInState]
  );

  const handleUpdateDimensions = useCallback(
    (id: string, key: string, value: number) => {
      setFiles((prevFiles) => {
        const fileIndex = prevFiles.findIndex((f) => f._id === id);
        if (fileIndex === -1) return prevFiles;
        const file = prevFiles[fileIndex];
        const updatedDimensions = { ...file.dimensions, [key]: value };
        const newFiles = [...prevFiles];
        newFiles[fileIndex] = { ...file, dimensions: updatedDimensions };
        return newFiles;
      });
    },
    []
  );

  const handleUpdateUnit = useCallback((id: string, unit: string) => {
    setFiles((prevFiles) => {
      const fileIndex = prevFiles.findIndex((f) => f._id === id);
      if (fileIndex === -1) return prevFiles;
      const file = prevFiles[fileIndex];
      if (file.unit === unit) return prevFiles;

      let convertedDimensions = { ...file.dimensions };

      if (file.unit === 'mm' && unit === 'inch') {
        const conversionFactor = 0.0393701;
        convertedDimensions = {
          height_mm: parseFloat(
            (convertedDimensions.height_mm * conversionFactor).toFixed(3)
          ),
          width_mm: parseFloat(
            (convertedDimensions.width_mm * conversionFactor).toFixed(3)
          ),
          length_mm: parseFloat(
            (convertedDimensions.length_mm * conversionFactor).toFixed(3)
          ),
        };
      } else if (file.unit === 'inch' && unit === 'mm') {
        const conversionFactor = 25.4;
        convertedDimensions = {
          height_mm: parseFloat(
            (convertedDimensions.height_mm * conversionFactor).toFixed(3)
          ),
          width_mm: parseFloat(
            (convertedDimensions.width_mm * conversionFactor).toFixed(3)
          ),
          length_mm: parseFloat(
            (convertedDimensions.length_mm * conversionFactor).toFixed(3)
          ),
        };
      }

      const newFiles = [...prevFiles];
      newFiles[fileIndex] = { ...file, unit, dimensions: convertedDimensions };
      return newFiles;
    });
  }, []);

  const handleSetScalingFactor = useCallback(
    (id: string, newScalingFactor: number) => {
      setFiles((prevFiles) => {
        const fileIndex = prevFiles.findIndex((f) => f._id === id);
        if (fileIndex === -1) return prevFiles;
        const file = prevFiles[fileIndex];
        const previousScalingFactor = file.scalingFactor ?? 1;

        if (newScalingFactor <= 0) return prevFiles;

        const relativeScale = newScalingFactor / previousScalingFactor;
        const dimensions = file.dimensions;

        const updatedDimensions = {
          height_mm: dimensions.height_mm * relativeScale,
          width_mm: dimensions.width_mm * relativeScale,
          length_mm: dimensions.length_mm * relativeScale,
        };

        const newFiles = [...prevFiles];
        newFiles[fileIndex] = {
          ...file,
          scalingFactor: newScalingFactor,
          dimensions: updatedDimensions,
        };
        return newFiles;
      });
    },
    []
  );

  const handleRevertDimensions = useCallback((id: string) => {
    setFiles((prevFiles) => {
      const fileIndex = prevFiles.findIndex((f) => f._id === id);
      if (fileIndex === -1) return prevFiles;
      const file = prevFiles[fileIndex];

      if (!file.originalDimensions) return prevFiles;
      const original = file.originalDimensions;
      let dimensions = { ...original };
      if (file.unit === 'inch') {
        const conversionFactor = 0.0393701;
        dimensions = {
          height_mm: parseFloat(
            (original.height_mm * conversionFactor).toFixed(3)
          ),
          width_mm: parseFloat(
            (original.width_mm * conversionFactor).toFixed(3)
          ),
          length_mm: parseFloat(
            (original.length_mm * conversionFactor).toFixed(3)
          ),
        };
      }

      const newFiles = [...prevFiles];
      newFiles[fileIndex] = {
        ...file,
        unit: 'mm',
        dimensions: dimensions,
        scalingFactor: 1,
      };
      return newFiles;
    });
  }, []);

  // Effects

  // 1. Fetch Order Files
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
          navigate(`/get-quotes/${orderId}/${orderNumber}/upload-stl`);

        const filesData = response as FileDataDB[];
        setFiles(filesData);
        if (filesData.length > 0) {
          setActiveFileId(filesData[0]._id);
        }
      } catch (error) {
        console.error('Error fetching order files:', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchOrderFiles();
  }, [orderId, navigate, orderNumber]);

  // 2. Fetch Specifications
  useEffect(() => {
    getCMT_DataService(dispatch);
  }, [dispatch]);

  // 3. Reset State on Active File Change
  useEffect(() => {
    if (activeFileId) {
      setPrinterData([]);
      setPrinterMessage('');
      setError(null);
      setDownloadProgress(0);
      setIsDownloading(false);
      setStlGeometry(null);
    }
  }, [activeFileId]);

  // 4. Download and Parse STL
  const downloadAndParseSTL = useCallback(async (url: string) => {
    await stlFileDownloadAndParse({
      url,
      setIsDownloading,
      setDownloadProgress,
      setError,
      setStlGeometry,
    });
  }, []);

  useEffect(() => {
    if (!activeFile?.fileUrl) return;
    downloadAndParseSTL(activeFile.fileUrl);
  }, [activeFile?.fileUrl, downloadAndParseSTL]);

  // 5. Fetch Printer Data
  const fetchPrinterData = useCallback(async () => {
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
    fetchPrinterData();
  }, [fetchPrinterData]);

  // 6. Process Geometry (Estimation)
  const processGeometry = useCallback(async () => {
    if (
      stlGeometry &&
      material?.density &&
      material?.density > 0 &&
      printer &&
      technologies &&
      activeFile?.dimensions &&
      activeFile?.originalDimensions
    ) {
      try {
        const estimator = createPrintEstimator(
          technologies.code,
          printer,
          material,
          pricing as Pricing
        );

        const isFDM = technologies.code === 'FDM';

        // Calculate effective scale based on dimensions relative to original
        let currentVolume = 0;
        const { height_mm, width_mm, length_mm } = activeFile.dimensions;

        if (activeFile.unit === 'inch') {
          const conversionFactor = 25.4;
          currentVolume =
            height_mm *
            conversionFactor *
            (width_mm * conversionFactor) *
            (length_mm * conversionFactor);
        } else {
          currentVolume = height_mm * width_mm * length_mm;
        }

        const originalVolume =
          activeFile.originalDimensions.height_mm *
          activeFile.originalDimensions.width_mm *
          activeFile.originalDimensions.length_mm;

        // derived scale = (currentVolume / originalVolume)^(1/3)
        // If original volume is 0 (shouldn't happen for valid STL), fallback to 1
        const effectiveScale =
          originalVolume > 0
            ? Math.pow(currentVolume / originalVolume, 1 / 3)
            : 1;

        const result = await estimator.getEstimates({
          modelGeometry: stlGeometry as any,
          printer,
          material,
          infillPercent: isFDM ? infill : 100,
          scale: effectiveScale,
        });

        if (result) {
          updateFileInState(activeFileId as string, {
            weight: {
              value: result.weight_g,
              unit: 'gm',
            },
            print_totalTime_s: result.totalTime_s,
            costs: result.costs,
          });
        }
        return result;
      } catch (error) {
        console.error('Error processing STL geometry:', error);
      }
    }
  }, [
    stlGeometry,
    material,
    printer,
    technologies,
    // scalingFactor, // No longer depend on scalingFactor for calculation
    activeFile?.dimensions,
    activeFile?.originalDimensions,
    activeFile?.unit,
    infill,
    pricing,
    activeFileId,
    updateFileInState,
  ]);

  useEffect(() => {
    if (stlGeometry && material?.density && printer && technologies) {
      processGeometry();
    }
  }, [stlGeometry, material, printer, technologies, processGeometry]);

  // Handlers
  const handleOpenSTLViewer = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(true);
  }, []);

  const handleCloseSTLViewer = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleApplySelection = async () => {
    if (!activeFileId || !activeFile) return;
    setIsLoading(true);
    const updateData: UpdateFileData = {
      colorId,
      materialId,
      technologyId,
      printerId,
      infill,
      weight,
      costs,
      print_totalTime_s,
      dimensions: activeFile.dimensions,
      scalingFactor: activeFile.scalingFactor,
      unit: activeFile.unit,
    };

    // Logic from updateFileInCustomization moved here
    let imageFileKey = '';
    try {
      // 1. Generate Thumbnail
      const thumbnailDataUrl = await stlParser.generateThumbnail(
        stlGeometry as THREE.BufferGeometry,
        {
          size: 400,
          color: colorHexcode || '#ffffff',
          backgroundColor: 'transparent',
        }
      );

      // 2. Convert dataUrl to file
      const thumbnailFile = STLUtils.dataUrlToFile(
        thumbnailDataUrl,
        `${activeFile.fileName}_thumbnail.png`
      );

      // 3. Get User for signed url
      // Note: original code used getSignedUrl which likely uses some auth state or just works.
      // Assuming imports are correct.
      const imageSignedUrl = await getSignedUrl(
        thumbnailFile.name,
        'stlImage',
        thumbnailFile.type
      );

      imageFileKey = imageSignedUrl.key;
      const imageUploadUrl = imageSignedUrl.url;

      // 4. Upload to S3
      await uploadFromS3(thumbnailFile, imageUploadUrl, (progress) => {
        console.log(`Thumbnail Upload Progress: ${progress}%`);
      });

      // 5. Update file with thumbnail url and data
      await updateFile(activeFileId, {
        ...updateData,
        thumbnailUrl: imageSignedUrl.storeUrl,
      });

      // 6. Delete old thumbnail
      if (activeFile.thumbnailUrl) {
        await deleteFromS3(returnS3Key(activeFile.thumbnailUrl));
      }

      // 7. Update local state
      updateFileInState(activeFileId, {
        ...updateData,
        thumbnailUrl: imageSignedUrl.storeUrl,
        isCustomized: true,
      });

      toast.success(activeFile.fileName + ' save successfully');
    } catch (e: any) {
      console.error(e);
      if (imageFileKey) {
        await deleteFromS3(imageFileKey);
      }
      toast.error(e.response?.data?.message || 'Error saving file');
    } finally {
      setIsLoading(false);
    }
  };

  const handelNext = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        updateIncompleteOrdersService(orderId as string),
        updateTotalWeightService(
          orderId as string,
          orderNumber as string,
          navigate
        ),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isLoading,
    isPageLoading,
    printerData,
    printerMessage,
    modalOpen,
    isDownloading,
    downloadProgress,
    stlGeometry,
    error,
    isMobile,
    orderNumber,
    orderId,

    // Data
    files,
    activeFileId,
    activeFile,
    material,
    colorHexcode,
    technologies,
    printer,
    isAllCoustomized,
    isApplyButtonDisabled,

    // Handlers
    handleOpenSTLViewer,
    handleCloseSTLViewer,
    handleApplySelection,
    handelNext,
    navigate,
    dispatch,
    setActiveFileId,

    // Customization Handlers
    handleUpdateValueById,
    handleUpdateDimensions,
    handleUpdateUnit,
    handleSetScalingFactor,
    handleRevertDimensions,
  };
};
