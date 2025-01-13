import { Plane } from 'lucide-react';
import './FileInfo.css';

interface FileInfoProps {
  fileName: string;
}

export function FileInfo({ fileName }: FileInfoProps) {
  return (
    <div className="file-info-container">
      <div className="icon-container">
        <Plane className="icon" />
      </div>
      <span className="file-name">{fileName}</span>
    </div>
  );
}