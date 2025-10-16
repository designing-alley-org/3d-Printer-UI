import { Box, Typography, Chip } from '@mui/material';

import {
  AspectRatio as AspectRatioIcon,
  Speed as SpeedIcon,
  Texture as TextureIcon,
  Category as CategoryIcon,
  ColorLens as ColorLensIcon,
} from '@mui/icons-material';
import { IPrinter } from '../types/printer';

// --- Sub-component for displaying a single printer ---

export const PrinterInfo = ({ printer }: { printer: IPrinter }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 5,
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <img
      src={printer.imageURL || '/img/placeholder-printer.png'}
      alt={printer.name}
      width={150}
      height={150}
      style={{ borderRadius: '8px', objectFit: 'cover' }}
    />
    <Box>
      <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
        {printer.name}
      </Typography>
      {printer.technologies && (
        <Chip
          key={printer.technologies._id}
          label={printer.technologies.code}
          size="small"
          sx={{ mr: 0.5, my: 1 }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          color: 'text.secondary',
        }}
      >
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AspectRatioIcon fontSize="small" sx={{ mr: 1 }} />
          Build Volume:{' '}
          {`${printer.buildVolume_mm.x} x ${printer.buildVolume_mm.y} x ${printer.buildVolume_mm.z} mm`}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <SpeedIcon fontSize="small" sx={{ mr: 1 }} />
          Max Speed:{' '}
          {printer.maxPrintSpeed_mm_s
            ? `${printer.maxPrintSpeed_mm_s} mm/s`
            : 'N/A'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
          Nozzle:{' '}
          {printer.nozzleDiameter_mm
            ? `${printer.nozzleDiameter_mm} mm`
            : 'N/A'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <TextureIcon fontSize="small" sx={{ mr: 1 }} />
          Materials:{' '}
          {printer.materials && printer.materials.length > 0
            ? printer.materials.map((mat) => mat.code).join(', ')
            : 'N/A'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <ColorLensIcon fontSize="small" sx={{ mr: 1 }} />
          Colors:{' '}
          {printer.colors && printer.colors.length > 0 ? (
            <Box sx={{ display: 'flex', gap: 1, ml: 1, flexWrap: 'wrap' }}>
              {printer.colors.map((col) => (
                <Box
                  key={col.name}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: col.hexCode || '#ccc',
                      borderRadius: '50%',
                      mr: 0.5,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            'N/A'
          )}
        </Typography>
      </Box>
    </Box>
  </Box>
);
