import React from 'react';
import { Typography, Grid, Box, useTheme, Slider } from '@mui/material';
import { useSelector } from 'react-redux';
import SingleSelectDropdown, {
  Option,
} from '../../stories/Dropdown/SingleSelectDropdown';

import { sizeOption } from '../../constants';

import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import ColorDropdown from '../../stories/Dropdown/ColorDropdown';
import {
  getMaterialOptions,
  getTechnologyOptions,
  getInfillOptions,
  getColorOptions,
} from './option';

// Icon Custom Icon
import {
  ColorIcon,
  InfillIcon,
  TechnologyIcon,
  MaterialIcon,
  PrinterIcon,
} from '../../../public/Icon/MUI_Coustom_icon/index';

import { Ruler, RotateCcw } from 'lucide-react';
import { FileDataDB, Technology } from '../../types/uploadFiles';
import { RootState } from '../../store/types';
import { PrinterSelector } from '../../components/Model';
import { IPrinter } from '../../types/printer';

interface AccordionProps {
  printerData: IPrinter[];
  printerMessage: string;
  downloadProgress: number;
  file: FileDataDB | undefined;
  technologies?: Technology;
  activeFileId: string | null;
  handleUpdateValueById: (id: string, data: Partial<FileDataDB>) => void;
  handleUpdateDimensions: (id: string, key: string, value: number) => void;
  handleUpdateUnit: (id: string, unit: string) => void;
  handleSetScalingFactor: (id: string, scale: number) => void;
  handleRevertDimensions: (id: string) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  printerData,
  printerMessage,
  file,
  technologies,
  activeFileId,
  handleUpdateValueById,
  handleUpdateDimensions,
  handleUpdateUnit,
  handleSetScalingFactor,
  handleRevertDimensions,
}) => {
  const theme = useTheme();
  const dataspec = useSelector((state: RootState) => state.specification);

  const originalDimensions = file?.originalDimensions;

  const handleChangeValue = (field: string, value: any) => {
    if (file?._id) {
      handleUpdateValueById(file._id, { [field]: value });
    }
  };

  const handleUnitChangeWrapper = (option: Option) => {
    if (file?._id) {
      handleUpdateUnit(file._id, option.value);
    }
  };

  const handleChangeDimensions =
    (field: 'height_mm' | 'width_mm' | 'length_mm') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value.replace(/[^\d.]/g, ''));
      if (value && file?._id) {
        handleUpdateDimensions(file._id, field, value);
      }
    };

  const materialOptions = getMaterialOptions(
    dataspec?.materials,
    file?.technologyId
  );

  const technologyOptions = getTechnologyOptions(dataspec?.technologies);

  const options = getInfillOptions();

  const colorOptions = getColorOptions(dataspec?.colors);

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
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="primary.main"
            >
              Scale In
            </Typography>
            <SingleSelectDropdown
              options={sizeOption}
              onChange={handleUnitChangeWrapper}
              defaultValue={sizeOption.find((opt) => opt.value === file?.unit)}
              titleHelper="Select"
              error={false}
              sx={{ width: '100%' }} // Ensure full width
              fontSize={'.875rem'}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="primary.main"
            >
              Height
            </Typography>
            <CustomTextField
              value={file?.dimensions.height_mm}
              onChange={handleChangeDimensions('height_mm')}
              inputStyle={2}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="primary.main"
            >
              Width
            </Typography>
            <CustomTextField
              value={file?.dimensions.width_mm}
              onChange={handleChangeDimensions('width_mm')}
              inputStyle={2}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500 }}
              color="primary.main"
            >
              Length
            </Typography>
            <CustomTextField
              value={file?.dimensions.length_mm}
              onChange={handleChangeDimensions('length_mm')}
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
                if (typeof newValue === 'number' && file?._id) {
                  handleSetScalingFactor(file._id, newValue);
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
                    handleRevertDimensions(activeFileId);
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
              {originalDimensions && (
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: 'text.secondary', textAlign: 'right', mt: 1 }}
                >
                  {originalDimensions?.height_mm.toFixed(2)} mm x{' '}
                  {originalDimensions?.width_mm.toFixed(2)} mm x{' '}
                  {originalDimensions?.length_mm.toFixed(2)} mm
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Weight Information */}

      {/* Configuration Options */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
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
            defaultValue={technologyOptions.find(
              (opt: any) => opt.id === file?.technologyId
            )}
            titleHelper="Select Technology"
            sx={{ width: '100%' }} // Ensure full width
            fontSize={'.875rem'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
            defaultValue={materialOptions.find(
              (opt: any) => opt.id === file?.materialId
            )}
            titleHelper="Select Material"
            sx={{ width: '100%' }}
            fontSize={'.875rem'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
            options={colorOptions}
            onChange={(option) => handleChangeValue('colorId', option.id)}
            defaultValue={colorOptions.find(
              (opt: any) => opt.id === file?.colorId
            )}
            titleHelper="Select Color"
            sx={{ width: '100%' }}
          />
        </Grid>

        {technologies?.code === 'FDM' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <InfillIcon
                fontSize="small"
                style={{
                  marginRight: '8px',
                  color: theme.palette.primary.main,
                }}
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
          </Grid>
        )}

        <Grid size={{ xs: 12, md: technologies?.code === 'FDM' ? 12 : 6 }}>
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
            <PrinterSelector
              printersData={printerData}
              file={file}
              onPrinterSelect={(printer) =>
                handleChangeValue('printerId', printer._id)
              }
            />
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
