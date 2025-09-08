import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  UpdateValueById,
} from '../../../store/customizeFilesDetails/reducer';
import SingleSelectDropdown, {
  Option,
} from '../../../stories/Dropdown/SingleSelectDropdown';

import { sizeOption } from '../../../constants';


import CustomButton from '../../../stories/button/CustomButton';
import CustomTextField from '../../../stories/inputs/CustomTextField';
import ColorDropdown from '../../../stories/Dropdown/ColorDropdown';
import PrinterDropdown from '../../../stories/Dropdown/PrinterDropdown';

// Icon Custom Icon 
import {ColorIcon, InfillIcon, TechnologyIcon, MaterialIcon,PrinterIcon} from '../../../../public/Icon/MUI_Coustom_icon/index';

import {
  Ruler,
  RotateCcw,
} from 'lucide-react';
import { Color, FileDataDB, Material, ModelDimensions, Technology } from '../../../types/uploadFiles';
import { RootState } from '../../../store/types';

interface AccordionProps {
  printerData: any[];
  fileData: FileDataDB;
  oldDimensions: { unit: string | null; dimensions: ModelDimensions} | null;
  printerMessage: string;
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
  oldDimensions,
  printerMessage,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FileDataDB | undefined>(fileData);
  console.log("fileData in accordion", fileData);
  const dataspec = useSelector((state: RootState) => state.specification);

  const theme = useTheme();


  useEffect(() => {
    setFormData(fileData);
  }, [fileData]);

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
    setFormData((prev) => ({ ...prev, [field]: value }) as FileDataDB);
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

  useEffect(() => {
    if (formData) {
      dispatch(UpdateValueById({ id: fileData._id, data: formData }));
    }
  }, [formData, dispatch, fileData._id]);

  const handleRevert = () => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          unit: oldDimensions?.unit || 'mm',
          dimensions: {
            ...prev?.dimensions,
            height: oldDimensions?.dimensions?.height || 0,
            width: oldDimensions?.dimensions?.width || 0,
            length: oldDimensions?.dimensions?.length || 0,
          },
        }) as FileDataDB
    );
  };

  const options = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        value: `${(i + 1) * 5}`,
        label: `${(i + 1) * 5}`,
      })),
    []
  );



  if (!fileData) {
    return (
      <Box sx={{ m: 2 }}>
        <Typography>Please select a file then proceed</Typography>
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
                onClick={handleRevert}
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
              {oldDimensions && (
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: 'text.secondary', textAlign: 'right', mt: 1 }}
                >
                  {oldDimensions?.dimensions?.height.toFixed(2)}{' '}
                  {oldDimensions?.unit} x{' '}
                  {oldDimensions?.dimensions?.width.toFixed(2)}{' '}
                  {oldDimensions?.unit} x{' '}
                  {oldDimensions?.dimensions?.length.toFixed(2)}{' '}
                  {oldDimensions?.unit}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

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
            onChange={(option) => handelChangeValue('printer', option.id)}
            defaultValue={mappedPrinters.find(
              (opt) => opt.id === formData?.printer
            )}
            titleHelper="Please Select First Material and Technology"
            sx={{ width: '100%' }}
            disabled={!formData?.materialId || !formData?.technologyId}
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
          {fileData?.weight?.value?.toFixed(3) || 0} {fileData?.weight?.unit || 'g'}
        </Typography>
      </Box>
    </Box>
  );
};

export const AccordionMemo = React.memo(Accordion);
