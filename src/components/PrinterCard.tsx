import {
  Box,
  Typography,
  Chip,
} from '@mui/material';


import {
  UnfoldMore as UnfoldMoreIcon,
  AspectRatio as AspectRatioIcon,
  Speed as SpeedIcon,
  Texture as TextureIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
} from "@mui/icons-material"

export interface Printer {
  id: number;
  name: string;
  imageUrl: string;
  technologyType: 'FDM' | 'SLA' | 'SLS';
  buildVolume: {
    x: number;
    y: number;
    z: number;
  };
  nozzleSize: number | null;
  printSpeed: number | null;
  materialCompatibility: string[];
}


// --- Sub-component for displaying a single printer ---

export const PrinterInfo = ({ printer }: { printer: Printer }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
    <img
        src={printer.imageUrl}
        alt={printer.name}
        width={80}
        height={80}
        style={{ borderRadius: '8px', objectFit: 'cover' }}
    />
    <Box>
        <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
            {printer.name}
        </Typography>
        <Chip label={printer.technologyType} size="small" sx={{ mt: 0.5, mb: 1.5 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.secondary' }}>
             <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <AspectRatioIcon fontSize="small" sx={{ mr: 1 }} />
                Build Volume: {`${printer.buildVolume.x} x ${printer.buildVolume.y} x ${printer.buildVolume.z} mm`}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <SpeedIcon fontSize="small" sx={{ mr: 1 }} />
                Max Speed: {printer.printSpeed ? `${printer.printSpeed} mm/s` : 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
                Nozzle: {printer.nozzleSize ? `${printer.nozzleSize} mm` : 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <TextureIcon fontSize="small" sx={{ mr: 1 }} />
                Materials: {printer.materialCompatibility.join(', ')}
            </Typography>
        </Box>
    </Box>
  </Box>
);
