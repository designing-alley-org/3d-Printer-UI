// AttachmentPreview.tsx
import "./footer.css";
import { cross } from '../../../../constants';
import ButtonIcon from '../../../../stories/BottonIcon/ButtonIcon';

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
  return (
    <div className="file-container">
      {attachments.map((attachment, index) => (
        <div key={index} className="file-selected">
          <p>{`${title}: ${attachment.name}`}</p>
          <ButtonIcon
            svgPath={cross}
            height="2.3rem"
            width="2.3rem"
            onClick={() => onRemove(index)}
          />
        </div>
      ))}
    </div>
  );
}
