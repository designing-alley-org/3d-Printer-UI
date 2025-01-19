import { FileDown, ChevronDown } from 'lucide-react';
import './FileActions.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FileActionsProps {
  quantity: number;
  pricing: number;
  isSelected: boolean;
  onViewDetails: () => void;
  file:string;
}

export function FileActions({
  quantity,
  pricing,
  isSelected,
  onViewDetails,
  file
}: FileActionsProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadFromS3 = async (stlFileUrl: string | undefined) => {
    setIsDownloading(true);
    if (!stlFileUrl) {
      toast.error('File not found in S3');
      setIsDownloading(false);
      return;
    }
    const fileName = stlFileUrl.split('/').pop() + '.stl';

    try {
      const response = await fetch(stlFileUrl);
      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = urlObject;
      a.download = fileName;
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(urlObject);
      }, 250);
      toast.success('File downloaded successfully');
    } catch (error) {
      toast.error('Error downloading file from S3');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="file-actions">
      <div className="file-actions__quantity">
        <span className="file-actions__label">Quantity</span>
        <span className={isSelected ? 'file-actions__value_selected' : 'file-actions__value'}>{quantity}</span>
      </div>

      <div className="file-actions__pricing">
        <span className="file-actions__label">Pricing</span>
        <span className={isSelected ? 'file-actions__value_selected' : 'file-actions__value'}>${pricing}</span>
      </div>

      <button className="file-actions__button" onClick={() => downloadFromS3(file)}>
        <FileDown className="file-actions__icon" />
        {isDownloading ? 'Downloading...' : 'Download'}
      </button>

      <button
        onClick={onViewDetails}
        className="file-actions__button file-actions__button--details"
      >
        <span>View Details</span>
        <div
          className={`file-actions__chevron-container ${
            isSelected ? 'file-actions__chevron-container--rotated' : ''
          }`}
        >
          <ChevronDown className="file-actions__icon" />
        </div>
      </button>
    </div>
  );
}
