import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  FileDetail,
  UpdateValueById,
} from '../../../store/customizeFilesDetails/reducer';
import SingleSelectDropdown, {
  Option,
} from '../../../stories/Dropdown/SingleSelectDropdown';
import MUIButton from '../../../stories/MUIButton/Button';
import { sizeOption } from '../../../constants';
import ColorDropdown from '../../../stories/Dropdown/ColorDropdown';
import PrinterDropdown from '../../../stories/Dropdown/PrinterDropdown';
import {
  Ruler,
  Settings,
  Circle,
  Palette,
  Grid3X3,
  Printer,
  RotateCcw,
} from 'lucide-react';
import StyledNumberInput from '../../../stories/Input/StyledNumberInput';
import CustomButton from '../../../stories/button/CustomButton';
import CustomTextField from '../../../stories/inputs/CustomTextField';

interface AccordionProps {
  printerData: any[];
  fileData: FileDetail;
  oldDimensions: { unit: string | null; dimensions: Dimensions } | null;
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
  const [formData, setFormData] = useState<FileDetail | undefined>(fileData);
  const dataspec = useSelector((state: any) => state.specification);

  console.log('printerMessage', printerMessage);

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
    setFormData((prev) => ({ ...prev, [field]: value }) as FileDetail);
  };

  const mappedPrinters = useMemo(
    () => mapPrinterData(printerData),
    [printerData]
  );

  console.log('mappedPrinters', mappedPrinters);

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
            }) as FileDetail
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
        }) as FileDetail
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
    <Box p={1}>
      {/* Scale Section */}
      <Box
        sx={{
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Ruler size={20} style={{ marginRight: '8px' }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
            color="text.dark"
          >
            Scale
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            border: '1px solid #E4E4E4',
            boxShadow: '8px 8px 8px 0px #00000014',
            borderRadius: '12px',
            padding: '16px',
            margin: 0,
          }}
        >
          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="secondary.main"
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
              color="secondary.main"
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
              color="secondary.main"
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
              color="secondary.main"
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
                }}
              >
                <RotateCcw size={16} />  Revert To Original
              </CustomButton>
              {oldDimensions && (
                <Typography
                  variant="caption"
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Settings size={16} style={{ marginRight: '8px', color: '#666' }} />
            <Typography
              variant="h6"
            color="text.dark"
            >
              Technology
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={
              dataspec?.technologyType.map((tech: string, index: number) => ({
                id: index,
                label: tech,
                value: tech,
              })) || []
            }
            onChange={(option) => handelChangeValue('technology', option.value)}
            defaultValue={dataspec?.technologyType
              .map((tech: string, index: number) => ({
                id: index,
                label: tech,
                value: tech,
              }))
              .find((opt: Option) => opt.value === formData?.technology)}
            titleHelper="Select Technology"
            sx={{ width: '100%' }} // Ensure full width
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Circle size={16} style={{ marginRight: '8px', color: '#666' }} />
            <Typography
              variant="h6"
              color="text.dark"
            >
              Material
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={
              dataspec?.material_with_mass?.map(
                (mat: { material_name: string }, index: number) => ({
                  id: index,
                  label: mat.material_name,
                  value: mat.material_name,
                })
              ) || []
            }
            onChange={(option) => handelChangeValue('material', option.value)}
            defaultValue={dataspec?.material_with_mass
              ?.map((mat: { material_name: string }, index: number) => ({
                id: index,
                label: mat.material_name,
                value: mat.material_name,
              }))
              .find((opt: Option) => opt.value === formData?.material)}
            titleHelper="Select Material"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Palette size={16} style={{ marginRight: '8px', color: '#666' }} />
            <Typography
              variant="h6"
             color="text.dark"
            >
              Colour
            </Typography>
          </Box>
          <ColorDropdown
            options={
              dataspec?.color.map((c: string, index: number) => ({
                id: index,
                label: c,
                value: c,
              })) || []
            }
            onChange={(option) => handelChangeValue('color', option.value)}
            defaultValue={dataspec?.color
              .map((c: string, index: number) => ({
                id: index,
                label: c,
                value: c,
              }))
              .find((opt: any) => opt.value === formData?.color)}
            titleHelper="Select Color"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Grid3X3 size={16} style={{ marginRight: '8px', color: '#666' }} />
            <Typography
              variant="h6"
             color="text.dark"
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Printer size={16} style={{ marginRight: '8px', color: '#666' }} />
            <Typography
              variant="h6"
             color="text.dark"
            >
              Printer
            </Typography>
          </Box>
         { printerMessage === '' ?  <PrinterDropdown
            options={mappedPrinters}
            onChange={(option) => handelChangeValue('printer', option.id)}
            defaultValue={mappedPrinters.find(
              (opt) => opt.id === formData?.printer
            )}
            titleHelper="Please Select First Material and Technology"
            sx={{ width: '100%' }}
            disabled={!formData?.material || !formData?.technology}
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
          mb:1,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Current Weight
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {fileData?.dimensions?.weight || 0} gm
        </Typography>
      </Box>
    </Box>
  );
};

export const AccordionMemo = React.memo(Accordion);
