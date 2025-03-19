// AttachmentPreview.tsx
import { cross } from "../../../../../../constants";
import ButtonIcon from "../../../../../../stories/BottonIcon/ButtonIcon";
import "./footer.css";
import { useMediaQuery } from "@mui/material";

interface AttachmentPreviewProps {
  attachments: {
    name: string;
    file: File;
    preview: string;
  }[];
  onRemove: (index: number) => void;
  title: string;
}

export default function AttachmentPreview({
  attachments,
  onRemove,
  title,
}: AttachmentPreviewProps) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div className="file-container">
      {attachments.map((attachment, index) => (
        <div key={index} className="file-selected">
          <p>{`${title}: ${attachment.name}`}</p>
          <ButtonIcon
            svgPath={cross}
            height= {isSmallScreen ? '1rem' : '2rem'}
            width= {isSmallScreen ? '1rem' : '2rem'}
            onClick={() => onRemove(index)}
          />
        </div>
      ))}
    </div>
  );
}
