import { Tooltip, IconButton } from '@mui/material';
import { RotateCcw } from 'lucide-react';

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Tooltip title="If you scale file size, then for actual view please reload it">
      <IconButton onClick={handleReload}>
        <RotateCcw size={20} />
      </IconButton>
    </Tooltip>
  );
};

export default ReloadButton;
