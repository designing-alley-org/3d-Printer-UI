import { Box, Typography, Chip } from '@mui/material';

import {
  AspectRatio as AspectRatioIcon,
  Speed as SpeedIcon,
  Texture as TextureIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { IPrinter } from '../types/printer';

// --- Sub-component for displaying a single printer ---

export const PrinterInfo = ({ printer }: { printer: IPrinter }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 5 }}>
    <img
      src={printer.imageURL?.url || '/placeholder-printer.png'}
      alt={printer.name}
      width={150}
      height={150}
      style={{ borderRadius: '8px', objectFit: 'cover' }}
    />
    <Box>
      <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
        {printer.name}
      </Typography>
      {printer.technologies.length > 0 &&
        printer.technologies.map((tech) => (
          <Chip
            key={tech._id}
            label={tech.code}
            size="small"
            sx={{ mr: 0.5, my: 1 }}
          />
        ))}
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
          {`${printer.buildVolume.x} x ${printer.buildVolume.y} x ${printer.buildVolume.z} mm`}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <SpeedIcon fontSize="small" sx={{ mr: 1 }} />
          Max Speed: {printer.printSpeed ? `${printer.printSpeed} mm/s` : 'N/A'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
          Nozzle: {printer.nozzleSize ? `${printer.nozzleSize} mm` : 'N/A'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <TextureIcon fontSize="small" sx={{ mr: 1 }} />
          Materials: {printer.materials.length > 0
            ? printer.materials.map((mat) => mat.code).join(', ')
            : 'N/A'}
        </Typography>
      </Box>
    </Box>
  </Box>
);
