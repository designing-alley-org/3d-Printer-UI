import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SingleSelectDropdown, {
  Option,
} from '../../stories/Dropdown/SingleSelectDropdown';

import { sizeOption } from '../../constants';


import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import ColorDropdown from '../../stories/Dropdown/ColorDropdown';
import PrinterDropdown from '../../stories/Dropdown/PrinterDropdown';

// Icon Custom Icon 
import {ColorIcon, InfillIcon, TechnologyIcon, MaterialIcon,PrinterIcon} from '../../../public/Icon/MUI_Coustom_icon/index';

import {
  Ruler,
  RotateCcw,
} from 'lucide-react';
import { Color, FileDataDB, Material, Technology } from '../../types/uploadFiles';
import { RootState } from '../../store/types';
import { setRevertDimensions, UpdateValueById } from '../../store/customizeFilesDetails/CustomizationSlice';

interface AccordionProps {
  printerData: any[];
  fileData: FileDataDB;
  printerMessage: string;
  downloadProgress: number;

}

const MM_TO_INCH = 1 / 25.4;
const INCH_TO_MM = 25.4;

const mapPrinterData = (printers: any[]) => {
  return printers.map((p: any) => ({
    id: p._id,
    name: p.name,
    details: {
      buildVolume: p.buildVolume
        ? `${p.buildVolume.x} x ${p.buildVolume.y} x ${p.buildVolume.z} mm`
        : 'N/A',
      layerResolution: p.layerResolution
        ? `${p.layerResolution.min} - ${p.layerResolution.max} mm`
        : 'N/A',
      nozzleSize: p.nozzleSize ? `${p.nozzleSize} mm` : 'N/A',
      printSpeed: p.printSpeed ? `${p.printSpeed} mm/s` : 'N/A',
      materialCompatibility:
        p.materialCompatibility && Array.isArray(p.materialCompatibility)
          ? p.materialCompatibility
              .map((mat: any) => mat.material_name)
              .join(', ')
          : 'N/A',
      technologyType:
        p.technologyType && Array.isArray(p.technologyType)
          ? p.technologyType.join(', ')
          : 'N/A',
    },
  }));
};

const Accordion: React.FC<AccordionProps> = ({
  printerData,
  fileData,
  printerMessage,
  downloadProgress,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FileDataDB | undefined>(fileData);
  const dataspec = useSelector((state: RootState) => state.specification);
  const { activeFileId, reverseDimensions, files } = useSelector(
    (state: RootState) => state.customization
  );

  const activeReverseDimension = useMemo(() => {
    return reverseDimensions.find(file => file._id === activeFileId) || null;
  }, [reverseDimensions, activeFileId]);

  // Get the current file data from Redux to ensure we have the latest state
  const currentFileFromRedux = useMemo(() => {
    return files.find(file => file._id === fileData._id) || fileData;
  }, [files, fileData]);


  const theme = useTheme();

  // Update formData when fileData changes OR when Redux state changes (for revert functionality)
  useEffect(() => {
    setFormData(currentFileFromRedux);
  }, [currentFileFromRedux]);

  const convertDimensions = (
    value: number,
    fromUnit: string,
    toUnit: string
  ) => {
    if (fromUnit === toUnit) return value;
    return fromUnit === 'mm'
      ? Math.abs(value * MM_TO_INCH)
      : Math.abs(value * INCH_TO_MM);
  };

  const handelChangeValue = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value } as FileDataDB;
    setFormData(updatedData);
    
    // Immediately dispatch to Redux for certain fields that need immediate updates
    if (['colorId', 'materialId', 'technologyId', 'printerId', 'infill'].includes(field)) {
      console.log(`AccordionMemo: Updating ${field} to ${value}`);
      dispatch(UpdateValueById({ id: fileData._id, data: { [field]: value } }));
    }
  };

  const mappedPrinters = useMemo(
    () => mapPrinterData(printerData),
    [printerData]
  );


  const handleUnitChange = (option: Option) => {
    const newUnit = option.value as 'mm' | 'inch';
    if (newUnit === formData?.unit) return;

    const unit = formData?.unit || 'mm';

    const convertedHeight = convertDimensions(
      formData?.dimensions?.height || 0,
      unit,
      newUnit
    );
    const convertedWidth = convertDimensions(
      formData?.dimensions?.width || 0,
      unit,
      newUnit
    );
    const convertedLength = convertDimensions(
      formData?.dimensions?.length || 0,
      unit,
      newUnit
    );

    handelChangeValue('unit', newUnit);
    handelChangeValue('dimensions', {
      height: convertedHeight,
      width: convertedWidth,
      length: convertedLength,
    });
  };

  const handleChange =
    (field: 'height' | 'width' | 'length') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value.replace(/[^\d.]/g, ''));
      if (value) {
        setFormData(
          (prev) =>
            ({
              ...prev,
              dimensions: {
                ...prev?.dimensions,
                [field]: value,
              },
            }) as FileDataDB
        );
      }
    };

  // Only dispatch dimension changes when formData dimensions change
  useEffect(() => {
    if (formData && formData.dimensions) {
      dispatch(UpdateValueById({ 
        id: fileData._id, 
        data: { 
          dimensions: formData.dimensions,
          unit: formData.unit 
        } 
      }));
    }
  }, [formData?.dimensions, formData?.unit, dispatch, fileData._id]);


  const options = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        value: `${(i + 1) * 5}`,
        label: `${(i + 1) * 5}`,
      })),
    []
  );


  if(downloadProgress < 100){
    return (
      <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
        <Typography variant="h6" color="primary.main" gutterBottom>
          Processing File...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please wait while we process your file. This may take a few moments.
        </Typography>
        <Box mt={2} width="100%">
          <Box
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#E0E0E0',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${downloadProgress}%`,
                backgroundColor: theme.palette.primary.main,
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </Box>
          <Typography variant="caption" color="textSecondary" align="right">
            {downloadProgress}%
          </Typography>
        </Box>
      </Box>
    );
  }




  return (
    <Box p={2}>
      {/* Scale Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 0.5, gap: '8px' }}>
          <Ruler size={25} style={{ transform: 'rotate(100deg)' }} color={theme.palette.primary.main} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
            color="primary.main"
          >
            Scale
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            border: '1px solid #E4E4E4',
            borderRadius: '12px',
            padding: '16px',
            margin: 0,
          }}
        >
          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
               color="primary.main"
            >
              Scale In
            </Typography>
            <SingleSelectDropdown
              options={sizeOption}
              onChange={handleUnitChange}
              defaultValue={sizeOption.find(
                (opt) => opt.value === formData?.unit
              )}
              titleHelper="Select"
              error={false}
              sx={{ width: '100%' }} // Ensure full width
            />
          </Grid>

          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="primary.main"
            >
              Height
            </Typography>
            <CustomTextField
              value={formData?.dimensions.height}
              onChange={handleChange('height')}
              inputStyle={2}              
            />
          </Grid>

          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
               color="primary.main"
            >
              Width
            </Typography>
            <CustomTextField
              value={formData?.dimensions.width}
              onChange={handleChange('width')}
              inputStyle={2}              
            />
          </Grid>

          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
               color="primary.main"
            >
              Length
            </Typography>
            <CustomTextField
              value={formData?.dimensions.length}
              onChange={handleChange('length')}
              inputStyle={2}              
            />
          </Grid>

          <Grid size={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <CustomButton
                onClick={() => {
                  if (activeFileId) {
                    console.log('Reverting dimensions for file:', { 
                      activeFileId, 
                      currentDimensions: formData?.dimensions,
                      originalDimensions: activeReverseDimension?.dimensions 
                    });
                    dispatch(setRevertDimensions({ _id: activeFileId }));
                  }
                }}
                size="small"
                variant="contained"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '6px 10px'
                }}
              >
                <RotateCcw size={16} />  Revert To Original
              </CustomButton>
              {activeReverseDimension && (
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: 'text.secondary', textAlign: 'right', mt: 1 }}
                >
                  {activeReverseDimension?.dimensions?.height.toFixed(2)}{' '}
                  {activeReverseDimension?.unit} x{' '}
                  {activeReverseDimension?.dimensions?.width.toFixed(2)}{' '}
                  {activeReverseDimension?.unit} x{' '}
                  {activeReverseDimension?.dimensions?.length.toFixed(2)}{' '}
                  {activeReverseDimension?.unit}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Weight Information */}
   
      {/* Configuration Options */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <TechnologyIcon  style={{ marginRight: '8px', color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              color="primary.main"
            >
              Technology
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={
              dataspec?.technologies.map((tech: Technology) => ({
                id: tech._id,
                label: tech.code,
                labelView: tech.code + ` ( ${tech.name})`,
                value: tech._id,
              })) || []
            }
            onChange={(option) => handelChangeValue('technologyId', option.id)}
            defaultValue={dataspec?.technologies
              .map((tech: Technology) => ({
                id: tech._id,
                label: tech.code,
                labelView: tech.code + ` ( ${tech.name})`,
                value: tech._id,
              }))
              .find((opt: any) => opt.id === formData?.technologyId)}
            titleHelper="Select Technology"
            sx={{ width: '100%' }} // Ensure full width
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <MaterialIcon  style={{ marginRight: '8px', color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              color="primary.main"
            >
              Material
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={
              dataspec?.materials?.map(
                (mat: Material) => ({
                  id: mat._id,
                  label: mat.code ,
                  labelView: mat.code + ` ( ${mat.name})`,
                  value: mat._id,
                })
              ) || []
            }
            onChange={(option) => handelChangeValue('materialId', option.id)}
            defaultValue={dataspec?.materials
              ?.map((mat: Material) => ({
                id: mat._id,
                label: mat.code,
                labelView: mat.code + ` ( ${mat.name})`,
                value: mat._id,
              }))
              .find((opt: any) => opt.id === formData?.materialId)}
            titleHelper="Select Material"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <ColorIcon size={16} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              color='primary.main'
            >
              Colour
            </Typography>
          </Box>
          <ColorDropdown
            options={
              dataspec?.colors.map((c: Color) => ({
                id: c._id,
                label: c.name,
                value: c.hexCode,
              })) || []
            }
            onChange={(option) => handelChangeValue('colorId', option.id)}
            defaultValue={dataspec?.colors
              .map((c: Color) => ({
                id: c._id,
                label: c.name,
                value: c.hexCode,
              }))
              .find((opt: any) => opt.id === formData?.colorId)}
            titleHelper="Select Color"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <InfillIcon style={{ marginRight: '8px', color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              color='primary.main'
            >
              Infill
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={options}
            onChange={(option) => handelChangeValue('infill', option.value)}
            defaultValue={options.find(
              (opt) => opt.value === String(formData?.infill)
            )}
            titleHelper="Select Infill"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PrinterIcon style={{ marginRight: '8px', color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              color="primary.main"
            >
              Printer
            </Typography>
          </Box>
         { printerMessage === '' ?  
         <PrinterDropdown
            options={mappedPrinters}
            onChange={(option) => handelChangeValue('printerId', option.id)}
            defaultValue={mappedPrinters.find(
              (opt) => opt.id === formData?.printerId 
            )}
            titleHelper="Please Select First Color, Material and Technology"
            sx={{ width: '100%' }}
            disabled={!formData?.materialId || !formData?.technologyId || !formData?.colorId}
          /> : 
          <Typography variant="body2" color="textSecondary">
           {printerMessage || 'No printers available for the selected material and technology.'}
          </Typography>}
        </Grid>
      </Grid>

      {/* Current Weight */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 2,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Current Weight
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {formData?.weight?.value?.toFixed(3) || 0} {formData?.weight?.unit || 'g'}
        </Typography>
      </Box>
    </Box>
  );
};

export const AccordionMemo = React.memo(Accordion);
