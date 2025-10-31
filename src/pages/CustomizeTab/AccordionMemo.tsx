import React, { useMemo } from 'react';
import { Typography, Grid, Box, useTheme, Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SingleSelectDropdown, {
  Option,
} from '../../stories/Dropdown/SingleSelectDropdown';

import { sizeOption } from '../../constants';

import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import ColorDropdown from '../../stories/Dropdown/ColorDropdown';

// Icon Custom Icon
import {
  ColorIcon,
  InfillIcon,
  TechnologyIcon,
  MaterialIcon,
  PrinterIcon,
} from '../../../public/Icon/MUI_Coustom_icon/index';

import { Ruler, RotateCcw } from 'lucide-react';
import {
  Color,
  FileDataDB,
  Material,
  Technology,
} from '../../types/uploadFiles';
import { RootState } from '../../store/types';
import {
  setRevertDimensions,
  setScalingFactor,
  updateDimensionsValue,
  updateUnit,
  UpdateValueById,
} from '../../store/customizeFilesDetails/CustomizationSlice';
import { PrinterSelector } from '../../components/Model';
import { IPrinter } from '../../types/printer';

interface AccordionProps {
  printerData: IPrinter[];
  printerMessage: string;
  downloadProgress: number;
  file: FileDataDB | undefined;
  technologies?: Technology;
}

const Accordion: React.FC<AccordionProps> = ({
  printerData,
  printerMessage,
  file,
  technologies
}) => {

  const { activeFileId, reverseDimensions } = useSelector(
    (state: RootState) => state.customization
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const dataspec = useSelector((state: RootState) => state.specification);

  const activeReverseDimension = useMemo(() => {
    return reverseDimensions.find((file) => file._id === activeFileId) || null;
  }, [reverseDimensions, activeFileId]);

  const handleChangeValue = (field: string, value: any) => {
    if (
      [
        'colorId',
        'materialId',
        'technologyId',
        'printerId',
        'infill',
        'unit',
      ].includes(field)
    ) {
      dispatch(UpdateValueById({ id: file?._id, data: { [field]: value } }));
    }
  };

  const handleUnitChange = (option: Option) => {
    dispatch(updateUnit({ id: file?._id as string, unit: option.value }));
  };

  const handleChange =
    (field: 'height_mm' | 'width_mm' | 'length_mm') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value.replace(/[^\d.]/g, ''));
      if (value) {
        dispatch(
          updateDimensionsValue({ id: file?._id as string, key: field, value })
        );
      }
    };

  const materialOptions = useMemo(() => {
    if (!dataspec?.materials) return [];
    if (!file?.technologyId) return [];
    const technologyId = file?.technologyId;
    const filteredDataspec = dataspec?.materials.filter((mat: Material) =>
      mat.relatedTechnologie.includes(technologyId || '')
    );
    return filteredDataspec?.map((mat: Material) => ({
      id: mat._id,
      label: mat.code,
      labelView: mat.code + ` ( ${mat.name})`,
      value: mat._id,
    }));
  }, [dataspec?.materials, file?.technologyId]);
  
  const technologyOptions = useMemo(() => {
    if (!dataspec?.technologies) return [];
    return dataspec?.technologies.map((tech: Technology) => ({
      id: tech._id,
      label: tech.code,
      labelView: tech.code + ` (${tech.name})`,
      value: tech._id,
    }));
  }, [dataspec?.technologies]);

  const options = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        value: `${(i + 1) * 5}`,
        label: `${(i + 1) * 5}`,
      })),
    []
  );

  return (
    <Box p={2}>
      {/* Scale Section */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 0.5,
            gap: '8px',
          }}
        >
          <Ruler
            fontSize="small"
            style={{ transform: 'rotate(100deg)' }}
            color={theme.palette.primary.main}
          />
          <Typography
            variant="h6"
            fontSize={'1rem'}
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
              defaultValue={sizeOption.find((opt) => opt.value === file?.unit)}
              titleHelper="Select"
              error={false}
              sx={{ width: '100%' }} // Ensure full width
              fontSize={'.875rem'}
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
              value={file?.dimensions.height_mm}
              onChange={handleChange('height_mm')}
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
              value={file?.dimensions.width_mm}
              onChange={handleChange('width_mm')}
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
              value={file?.dimensions.length_mm}
              onChange={handleChange('length_mm')}
              inputStyle={2}
            />
          </Grid>

          <Grid size={12}>
            <Slider
              size="medium"
              value={file?.scalingFactor || 1}
              aria-label="Small"
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              onChange={(_event, newValue) => {
                if (typeof newValue === 'number' && file) {
                  dispatch(
                    setScalingFactor({ id: file._id, scalingFactor: newValue })
                  );
                }
              }}
            />
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
                  padding: '6px 10px',
                }}
              >
                <RotateCcw size={16} /> Revert To Original
              </CustomButton>
              {activeReverseDimension && (
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: 'text.secondary', textAlign: 'right', mt: 1 }}
                >
                  {activeReverseDimension?.dimensions?.height_mm.toFixed(2)}{' '}
                  {activeReverseDimension?.unit} x{' '}
                  {activeReverseDimension?.dimensions?.width_mm.toFixed(2)}{' '}
                  {activeReverseDimension?.unit} x{' '}
                  {activeReverseDimension?.dimensions?.length_mm.toFixed(2)}{' '}
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
            <TechnologyIcon
              fontSize="small"
              style={{ marginRight: '8px', color: theme.palette.primary.main }}
            />
            <Typography variant="h6" color="primary.main" fontSize={'1rem'}>
              Technology
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={technologyOptions}
            onChange={(option) => handleChangeValue('technologyId', option.id)}
            defaultValue={technologyOptions.find((opt: any) => opt.id === file?.technologyId)}
            titleHelper="Select Technology"
            sx={{ width: '100%' }} // Ensure full width
            fontSize={'.875rem'}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <MaterialIcon
              fontSize="small"
              style={{ marginRight: '8px', color: theme.palette.primary.main }}
            />
            <Typography variant="h6" color="primary.main" fontSize={'1rem'}>
              Material
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={materialOptions}
            onChange={(option) => handleChangeValue('materialId', option.id)}
            defaultValue={materialOptions.find((opt: any) => opt.id === file?.materialId)}
            titleHelper="Select Material"
            sx={{ width: '100%' }}
            fontSize={'.875rem'}
          />
        </Grid>

        <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <ColorIcon
              fontSize="small"
              style={{ marginRight: '8px', color: theme.palette.primary.main }}
            />
            <Typography variant="h6" color="primary.main" fontSize={'1rem'}>
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
            onChange={(option) => handleChangeValue('colorId', option.id)}
            defaultValue={dataspec?.colors
              .map((c: Color) => ({
                id: c._id,
                label: c.name,
                value: c.hexCode,
              }))
              .find((opt: any) => opt.id === file?.colorId)}
            titleHelper="Select Color"
            sx={{ width: '100%' }}
          />
        </Grid>

     { technologies?.code === 'FDM' &&  <Grid size={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <InfillIcon
              fontSize="small"
              style={{ marginRight: '8px', color: theme.palette.primary.main }}
            />
            <Typography variant="h6" color="primary.main" fontSize={'1rem'}>
              Infill
            </Typography>
          </Box>
          <SingleSelectDropdown
            options={options}
            onChange={(option) => handleChangeValue('infill', option.value)}
            defaultValue={options.find(
              (opt) => opt.value === String(file?.infill)
            )}
            titleHelper="Select Infill"
            sx={{ width: '100%' }}
            fontSize={'.875rem'}
          />
        </Grid>}

        <Grid size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PrinterIcon
              fontSize="small"
              style={{ marginRight: '8px', color: theme.palette.primary.main }}
            />
            <Typography variant="h6" color="primary.main" fontSize={'1rem'}>
              Printer
            </Typography>
          </Box>
          {printerMessage === '' ? (
            <PrinterSelector printersData={printerData} file={file} />
          ) : (
            <Typography variant="body2" color="textSecondary">
              {printerMessage ||
                'No printers available for the selected material and technology.'}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Current Weight */}
    </Box>
  );
};

export const AccordionMemo = React.memo(Accordion);
